import { Request, Response } from "express";
import { Order } from "../models/order";

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { items, shippingAddressId, paymentMethod, paymentStatus } = req.body;
        const newOrder = new Order({ userId, items, shippingAddressId, paymentMethod, paymentStatus })
        await newOrder.save();
        res.status(200).json({ message: "Order Placed" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId });
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


export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}
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

export const getOrderByIdAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const orderDetail = await Order.find({ _id: orderId }).populate({ path: "userId", model: "User", select: "username , email" });
        if (orderDetail) {
            res.status(500).json({ message: "Order Not found" });
            return;
        }
        res.status(200).json({ orderDetail });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error)
        return;
    }
}

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
            { $set: { orderStatus : status } }
        );
        res.status(200).json({ message: "Order Update Successfully", modifiedCount: response.modifiedCount })
    } catch (error) {
        console.error("Bulk update failed:", error);
        res.status(500).json({ message: "Failed to bulk update orders" });
    }
}