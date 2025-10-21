import { Request, Response } from "express";
import { Coupon } from "../models/Coupon";
import { Cart } from "../models/Cart";
import { Types } from "mongoose";

// CREATE COUPON (ADMIN)
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

//GET COUPONS (ADMIN)
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

// DELETE COUPON (ADMIN)
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

// UPDATE COUPON (ADMIN)
export const updateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { couponId } = req.params;
        const updateData = req.body;

        if (updateData.code) {
            const existing = await Coupon.findOne({ code: updateData.code, _id: { $ne: couponId } });
            if (existing) {
                res.status(400).json({ message: "Coupon code already in use" });
                return;
            }
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedCoupon) {
            res.status(404).json({ message: "Coupon not found" });
            return;
        }

        res.status(200).json({ message: "Coupon updated successfully", coupon: updatedCoupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// APPLY COUPON TO CART (USERS)
export const applyCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code })
    if (!coupon) {
      res.status(404).json({ message: "Coupon not found" });
      return;
    }

    if (coupon.expiryDate && coupon.expiryDate < new Date()) {
      res.status(400).json({ message: "Coupon expired" });
      return;
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");;
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: "Cart not found or empty" });
      return;
    }

    const subtotal = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    if (coupon.minCartAmount && subtotal < coupon.minCartAmount) {
      res.status(400).json({
        message: `Cart must be at least ₹${coupon.minCartAmount} to use this coupon`,
      });
      return;
    }

    const usageRecord = coupon.userUsed.find(
      (u) => u.userId.toString() === userId
    );
    if (usageRecord && usageRecord.timesUsed >= coupon.maxUsagePerUser) {
      res.status(400).json({ message: "Coupon usage limit reached" });
      return;
    }

    let discount = coupon.discountAmount;
    if (coupon.discountPercentage) {
      discount = (subtotal * coupon.discountPercentage) / 100;
    }

    if (discount > subtotal) discount = subtotal;

    cart.subtotal = subtotal;
    cart.discountAmount = discount;
    cart.totalAmount = subtotal - discount;
    cart.coupon = {
      code: coupon.code,
      discountAmount: discount,
      discountPercentage: coupon.discountPercentage,
      minCartAmount: coupon.minCartAmount,
    };

    await cart.save();

    await coupon.save();

    res.status(200).json({
      message: "Coupon applied successfully",
      cart,
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// REMOVE COUPON FROM CART (USERS)
export const removeCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            res.status(400).json({ message: "Cart not found" });
            return;
        }

        cart.coupon = undefined;
        cart.discountAmount = 0;
        await cart.save();

        res.status(200).json({ message: "Coupon removed", cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
