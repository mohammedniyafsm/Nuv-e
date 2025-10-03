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
