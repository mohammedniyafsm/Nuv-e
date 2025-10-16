import { Request, Response } from "express";
import { Cart } from "../models/Cart";


export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const product = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({ userId, items: product });
            await newCart.save();
            res.status(200).json({ message: "Product added to Cart", newCart });
            return;
        }
        const existingItem = cart.items.find((item) => (
            item.productId.toString() === product.productId
        ))
        if (!existingItem) {
            cart.items.push(product);
            await cart.save();
            res.status(200).json({ message: "Product added to Cart", cart });
            return;
        }
        cart.items.forEach((item) => {
            if (item.productId.toString() == product.productId) {
                item.quantity += product.quantity;
            }
        })
        cart.coupon = undefined;
        cart.discountAmount = 0;
        await cart.save();
        res.status(200).json({ message: "Product added to Cart", cart });
        return;

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
}

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const id = req.params.itemId; ///Cart item id 
        const { quantity } = req.body;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            res.status(404).json({ message: "Item not found" });
            return;
        }


        cart?.items.forEach((item) => {
            if (item._id.toString() == id) {
                item.quantity = quantity;
                return
            }
        })
        await cart?.save();
        res.status(200).json({ message: "Cart Updated", cart })
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        return;
    }
}

export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.itemId;
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(400).json({ message: "Cart Not Found" });
            return;
        }
        cart.items = cart?.items.filter((s) => s._id.toString() !== id);

        await cart?.save();
        res.status(200).json({ message: "Removed Product from Cart", cart });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const deleteCart = await Cart.findOneAndDelete({ userId });
        res.status(200).json({ message: "Cart Cleared" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }

}

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            res.status(400).json({ message: "Cart Not Found" });
            return;
        }
        res.status(200).json({ cart });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}