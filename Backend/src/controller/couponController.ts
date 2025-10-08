import { Request, Response } from "express";
import { Coupon } from "../models/Coupon";


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
        const id = req.body;
        const coupon = await Coupon.findOne({ id });
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


// export const applyCoupon = async(req:Request,res:Response):Promise<void>=>{
//     try {
        
//     } catch (error) {
        
//     }
// }