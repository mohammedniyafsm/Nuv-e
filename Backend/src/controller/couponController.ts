import { Request, Response } from "express";
import { Coupon } from "../models/Coupon";
import XOAuth2 from "nodemailer/lib/xoauth2";
import User from "../models/User";
import { Cart } from "../models/Cart";
import { Types } from "mongoose";


export const createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code, discountAmount, discountPercentage, minCartAmount, maxUsagePerUser, expiryDate } = req.body;

        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            res.status(400).json({ message: "Coupon Already Exist" });
            return;
        }
        const coupon = new Coupon({
            code,
            discountAmount,
            discountPercentage,
            minCartAmount,
            maxUsagePerUser,
            expiryDate
        })
        await coupon.save();
        res.status(200).json({ message: "Coupon Added Successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const getCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
        const coupon = await Coupon.find();
        if (!coupon) {
            res.status(500).json({ message: "Coupon Not Found" });
            return;
        }
        res.status(200).json({ message: "Coupons", coupon });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.couponId;
        const coupon = await Coupon.findOne({ _id: id });
        if (!coupon) {
            res.status(500).json({ message: "Coupon Not Found " });
            return;
        }
        const response = await Coupon.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Coupon Deleted Successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const applyCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { code } = req.body;

        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            res.status(404).json({ message: "Coupon Not Found" });
            return;
        }
        if (coupon.expiryDate && coupon.expiryDate < new Date()) {
            res.status(400).json({ message: "Coupon Expired " });
            return;
        }

        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length == 0) {
            res.status(400).json({ message: "Cart Not Found " });
            return;
        }

        let cartTotal = cart.items.reduce((total, item) => total += item.quantity * item.price, 0)
        if (coupon.minCartAmount && coupon.minCartAmount > cartTotal) {
            res.status(400).json({ message: `Cart must be atleast ${coupon.minCartAmount} to use this Coupon ` })
        }

        let usageRecord = coupon.userUsed.find((user) => user.userId.toString() === userId);
        if (usageRecord && Number(usageRecord) > coupon.maxUsagePerUser) {
            res.status(400).json({ message: "Coupon usage limit reached for this user" });
            return;
        }
        let discount = coupon.discountAmount;
        if (coupon.discountPercentage) {
            discount = (cartTotal * coupon.discountPercentage) / 100;
        }

        cart.totalAfterDiscount = cartTotal - discount;

        cart.coupon = {
            code: coupon.code,
            discountAmount: discount
        }
        await cart.save();

        if (usageRecord) {
            usageRecord.timesUsed += 1;
        } else {
            coupon.userUsed.push({ userId: new Types.ObjectId(userId), timesUsed: 1 })
        }
        await coupon.save();

        res.status(200).json({ message: "Coupon Appiled Succesfully" });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
}


export const removeCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(400).json({ message: "Cart not found" });
            return;
        }

        cart.coupon = undefined;
        cart.totalAfterDiscount = undefined;
        await cart.save();

        res.status(200).json({ message: "Coupon removed", cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
