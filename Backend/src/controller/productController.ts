import { Request, Response } from "express";
import { Product } from "../models/Product";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, category, size, price, discount, stock, description, images } = req.body;
        const newProduct = await Product.create({ name, category, size, price, discount, stock, description, images });

        res.status(200).json({ message: "Product Added Successfully", newProduct });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const getAdminProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const update = await Product.findByIdAndUpdate(id, updates, {
            new: true, // return the updated document
            runValidators: true, // enforce schema validation
        })
        res.status(200).json({ message: "Product Updated Successfully", update });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const productDeleted = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Deleted Successfully", productDeleted });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const getProductByIdAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product) {
            res.status(400).json({ message: "Product Not Found" });
            return;
        }
        res.status(200).json({ product });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error)
        return;
    }
}

//Public get all product
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product) {
            res.status(400).json({ message: "Product Not Found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}