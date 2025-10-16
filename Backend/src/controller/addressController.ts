import { Request, Response } from "express";
import Address from "../models/Address";



export const getAddresses = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const address = await Address.findOne({ userId });
        if (!address) {
            res.status(400).json({ message: "Address Doesn't Exist" });
            return;
        }
        res.status(200).json({ address });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const addAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const addressDetail = req.body;

        const updatedAddress = await Address.findOneAndUpdate(
            { userId },
            { $push: { address: addressDetail } },
            { new: true, upsert: true } // upsert creates document if it doesn't exist
        );

        res.status(200).json({
            message: "Address Added Successfully",
            updatedAddress
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error);
    }
};


export const updateAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;  // address _id
        const userId = req.user.id;

        const { addressLine1, addressLine2, city, state, postalCode, country, type } = req.body;

        const updated = await Address.findOneAndUpdate(
            { userId, "address._id": id }, // find the user + address inside array
            {
                $set: {
                    "address.$.addressLine1": addressLine1,
                    "address.$.addressLine2": addressLine2,
                    "address.$.city": city,
                    "address.$.state": state,
                    "address.$.postalCode": postalCode,
                    "address.$.country": country,
                    "address.$.type": type
                }
            },
            { new: true } // return updated doc
        );

        if (!updated) {
            res.status(404).json({ message: "Address not found" });
            return;
        }

        res.status(200).json({ message: "Address updated successfully", updated });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id; //address Id
        const userId = req.user.id;
        const updated = await Address.findOneAndUpdate(
            { userId },
            { $pull: { address: { _id: id } } }, // remove the matching subdocument
            { new: true }
        ); res.status(200).json({ message: "Address Deleted Successfully", updated });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

