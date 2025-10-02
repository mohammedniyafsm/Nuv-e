import { Request, Response } from "express";
import { WishList } from "../models/WishList";


export const getWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const wishlist = await WishList.findOne({ userId });
        if (!wishlist) {
            res.status(404).json({ message: "Wishlist Not Found" });
            return;
        }
        res.status(200).json({ wishlist });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error ", error })
    }
}

export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const update = await WishList.findOneAndUpdate(
            { userId },
            { $push: { "products": productId } },
            { new: true, upsert: true }
        )
        res.status(200).json({ message: "Added to Wishlist", update });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error ", error })
    }
}

export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.productId;
        const userId = req.user.id;
        const update = await WishList.findOneAndUpdate(
            { userId },
            { $pull: { "products": id } },
            { new: true, upsert: true }
        )
        res.status(200).json({ message: "Product removed from Wishlist" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}