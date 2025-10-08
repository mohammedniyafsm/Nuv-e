import HookNextFunction from "mongoose";
import { Schema, Types, Model, model } from "mongoose";


interface ICouponApplied {
    code: string;
    discountAmount: number;
}

interface ICartItems {
    _id: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    subtotal: number;
}

interface ICart extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    items: ICartItems[];
    totalAmount: number;
    totalAfterDiscount?: number;
    coupon?: ICouponApplied;
    updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItems>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
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
        default: 0,
        required: true,
    },
});

const CartSchema = new Schema<ICart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [cartItemSchema],
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        totalAfterDiscount: {
            type: Number,
        },
        coupon: {
            code: String,
            discountAmount: Number,
        },
    },
    { timestamps: true }
);

CartSchema.pre("save", function (this: ICart, next) {
    let total = 0;

    this.items.forEach((product) => {
        product.subtotal = product.price * product.quantity;
        total += product.subtotal;
    });

    this.totalAmount = total;
    next();
});

export const Cart: Model<ICart> = model<ICart>('Cart', CartSchema);