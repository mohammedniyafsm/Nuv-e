import { Request, Response } from "express";
import { WishList } from "../models/WishList";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Types } from "mongoose";

//GET USER WISHLIST
export const getWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const wishlist = await WishList.findOne({ userId }).populate("products");
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

//ADD TO WISHLIST
export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        if (!productId) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }
        const wishlist = await WishList.findOneAndUpdate(
            { userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        ).populate('products');
        res.status(200).json({ message: "Added to Wishlist", wishlist });
    } catch (error) {
        console.error("Wishlist error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

//REMOVE FROM WISHLIST
export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.productId;
        const userId = req.user.id;
        const update = await WishList.findOneAndUpdate(
            { userId },
            { $pull: { "products": id } },
            { new: true, upsert: true }
        ).populate('products')
        res.status(200).json({ message: "Product removed from Wishlist", update });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error })
    }
}

//MOVE WISHLIST TO CART
export const moveWishlistToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product Not Found" });
            return;
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // No cart yet → create one with this product
            cart = await Cart.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        userId,
                        items: [{ productId: product._id, quantity: 1, price: product.price }]
                    }
                },
                { new: true, upsert: true }
            );
        } else {
            // Check if product already exists in cart
            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );
            console.log(existingItem)

            if (existingItem) {
                existingItem.quantity += 1;
                await cart.save();
            } else {
                cart = await Cart.findOneAndUpdate(
                    { userId },
                    { $push: { items: { productId: product._id, quantity: 1, price: product.price } } },
                    { new: true }
                );
            }
        }

        // Always remove product from wishlist
        await WishList.findOneAndUpdate(
            { userId },
            { $pull: { products: productId } },
            { new: true }
        );

        res.status(200).json({ message: "Product moved from wishlist to cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

