import { NextFunction } from "express";
import { Model, model, Schema, Types } from "mongoose";

interface IOrder {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    items: IOrderItem[],
    shippingAddressId: Types.ObjectId,
    paymentMethod: string,
    paymentStatus: string,
    orderStatus: string,
    trackingId?: string,
    totalAmount: number,
    placedAt: Date,
}

interface IOrderItem {
    productId: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    }
})

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [OrderItemSchema],
    shippingAddressId: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "CARD", "COD"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Failed", "Refunded"],
        default : "Pending",
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned"],
        default: "Pending",
        required: true,
    },
    trackingId: {
        type: String,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    placedAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, { timestamps: true })


OrderSchema.pre('save', function (next){
    const orders = this;
    let total = 0;
    orders.items.forEach((item)=>{
        item.subtotal = item.quantity * item.price;
        total += item.subtotal;
    });
    orders.totalAmount = total;
    next();
})

export const Order: Model<IOrder> = model<IOrder>('Order', OrderSchema);
