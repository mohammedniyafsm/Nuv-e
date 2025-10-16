import { Request, Response } from "express";
import { Product } from "../models/Product";


export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, category, size, price, discount, stock, description, images } = req.body;
        const newProduct = await Product.create({ name, category, size, price, discount, stock, description, images });
        console.log(newProduct);
        res.status(200).json({ message: "Product Added Successfully", newProduct });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error);
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
        const products = await Product.find();
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

//user/products/search?query=keyword
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.query.search as string;
        if (!searchQuery) {
            res.status(400).json({ message: 'Search query is required.' });
            return;
        }
        const response = await Product.find({
            name: { $regex: searchQuery, $options: 'i', }
        })
        res.status(200).json({ response });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

///user/products/filter?category=perfume&priceMin=1000&priceMax=5000
export const filterProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, priceMin, priceMax } = req.query;
        const filter: any = {};
        if (category) {
            filter.category = category;
        }
        if (priceMin || priceMax) {
            filter.price = {}
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }
        const response = await Product.find(filter);
        res.status(200).json({ response });
        return;
    } catch (error) {
        res.status(500).json({ message: "server error", error });
        console.log(error)
        return;
    }
}

///user/products?page=1&limit=10&sort=price
export const getPaginatedProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, sort } = req.query;
        const li = Number(limit);
        const pa = Number(page)
        const skip = (pa - 1 )* li;
        let sortOption: any = {};
        if (sort) sortOption[sort as string] = 1

        const product = await Product.find().limit(li).skip(skip).sort(sortOption);
        res.status(200).json({ page: page, product: product });
        return;
    } catch (error) {
        res.status(500).json({ message: "server error", error });
        return;
    }
}



