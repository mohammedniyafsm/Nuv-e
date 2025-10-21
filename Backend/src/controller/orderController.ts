import { createHmac } from 'crypto';
import { Request, Response } from "express";
import { Order } from "../models/order";
import { razorpay } from "../utils/razorpay";
import Address from '../models/Address';
import { Types } from 'mongoose';

// GET USER ORDERS(USER)
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).populate("items.productId").sort({ placedAt: -1 });
        if (!orders) {
            res.status(404).json({ message: "Order Not Found" });
            return;
        }
        res.status(200).json({ orders });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

//PLACE A NEW ORDER (USER)
export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { items, shippingAddressId, paymentMethod, paymentStatus,discountAmount } = req.body;
        const newOrder = new Order({ userId, items, shippingAddressId, paymentMethod, paymentStatus ,discountAmount })
        await newOrder.save();
        res.status(200).json({ message: "Order Placed" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log(error)
    }
}

// CREATING A RAZORPAY PAYMENT ORDER(USER)
export const createPayementOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const amountInRupees = req.body.amount;
        if (!amountInRupees || amountInRupees <= 0) {
            res.status(400).json({ message: "Invalid amount" });
            return;
        }

        const options = {
            amount: amountInRupees * 100, // convert to paise
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// VERIFY RAZORPAY PAYMENT SIGNATURE (USER)
export const verifyPaymentOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = createHmac('sha256', process.env.RAZORPAY_SECRET as string)
            .update(sign.toString())
            .digest('hex');
        if (razorpay_signature === expectedSign) {
            // Payment is verified
            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (error) {
        res.status(500).json({ error });

    }
}

// GET ORDER DETAIL BY ID (USER)
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            res.status(404).json({ message: "Order Not found" });
            return;
        }
        res.status(200).json({ order });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

// CANCEL ORDER
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            res.status(404).json({ message: "Order Not Found" });
            return;
        }
        order.orderStatus = "Cancelled";
        await order.save();
        res.status(200).json({ message: "Order Cancelled" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

// BULK UPDATE ORDER STATUS (ADMIN)
export const bulkUpdateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderIds, status } = req.body;
        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            res.status(400).json({ message: "orderIds array is required" });
            return;
        }
        if (!status) {
            res.status(400).json({ message: "status is required" });
            return;
        }
        const response = await Order.updateMany(
            { _id: { $in: orderIds } },
            { $set: { orderStatus: status } }
        );
        res.status(200).json({ message: "Order Update Successfully", modifiedCount: response.modifiedCount })
    } catch (error) {
        console.error("Bulk update failed:", error);
        res.status(500).json({ message: "Failed to bulk update orders" });
    }
}

// GET ALL ORDERS (ADMIN)
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().populate('userId');
        res.status(200).json({ orders });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

//UPDATE STATUS OF SINGLE ORDER(ADMIN)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId });
        const { orderStatus } = req.body;
        if (!order) {
            res.status(404).json({ message: "Order Not Found" });
            return;
        }
        order.orderStatus = orderStatus;
        console.log(order)
        await order.save();
        res.status(200).json({ message: "Updated Order Status" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error)
        return;
    }
}

//DELETE AN ORDER (ADMIN)
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const update = await Order.findByIdAndDelete({ _id: orderId });
        res.status(200).json({ message: "Order deleted" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

//RETURN AN ORDER ---(ONLY IF DELIVERED) (USER)
export const returnOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId });
        if (order?.orderStatus == "Delivered") {
            order.orderStatus = "Returned"
        }
        else {
            res.status(400).json({ message: "only Delievered Product can return" })
            return;
        }
        await order.save();
        res.status(200).json({ message: "Order Returned" });
        return;
    } catch (error) {
        res.status(500).json({ message: "server Error", error });
        return;
    }
}

// GET ORDER DETAILS WITH USER INFORMATION(ADMIN)
export const getOrderByIdAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;

    // Validate orderId format
    if (!Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: "Invalid order ID format" });
      return;
    }

    // Fetch order with user and product details
    const orderDetail = await Order.findById(orderId)
      .populate({ path: "userId", model: "User", select: "username email" })
      .populate({ path: "items.productId", model: "Product" });

    if (!orderDetail) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Extract shipping address ID
    const shippingAddressId = orderDetail.shippingAddressId;

    if (!shippingAddressId || !Types.ObjectId.isValid(shippingAddressId)) {
      res.status(400).json({ message: "Invalid or missing shipping address ID" });
      return;
    }

    // Find embedded address by ID
    const addressDoc = await Address.findOne(
      { "address._id": shippingAddressId },
      { "address.$": 1 } // Project only the matched address
    );

    const shippingAddress = addressDoc?.address?.[0] ?? null;

    // Respond with full order details
    res.status(200).json({
      orderDetail,
      shippingAddress,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Admin dashboard
// export const getAdminDashboard = async (req: Request, res: Response) => {
//     try {
//         // Total Orders
//         const totalOrders = await Order.countDocuments();

//         // Total Sales (only completed/paid orders)
//         const totalSalesAgg = await Order.aggregate([
//             { $match: { status: "completed" } },
//             { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//         ]);
//         const totalSales = totalSalesAgg[0]?.total || 0;

//         // Revenue Stats by Month
//         const monthlyRevenue = await Order.aggregate([
//             { $match: { status: "completed" } },
//             {
//                 $group: {
//                     _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
//                     revenue: { $sum: "$totalPrice" }
//                 }
//             },
//             { $sort: { "_id.year": -1, "_id.month": -1 } }
//         ]);

//         // Top Products (by number of orders)
//         const topProducts = await Order.aggregate([
//             { $unwind: "$items" },
//             {
//                 $group: {
//                     _id: "$items.productId",
//                     totalSold: { $sum: "$items.quantity" }
//                 }
//             },
//             { $sort: { totalSold: -1 } },
//             { $limit: 5 },
//             {
//                 $lookup: {
//                     from: "products",
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "product"
//                 }
//             },
//             { $unwind: "$product" },
//             {
//                 $project: {
//                     _id: 0,
//                     productId: "$product._id",
//                     name: "$product.name",
//                     totalSold: 1
//                 }
//             }
//         ]);

//         res.json({
//             totalOrders,
//             totalSales,
//             monthlyRevenue,
//             topProducts
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Dashboard data fetch failed" });
//     }
// };

