import { Schema, Types, Model, model, Document } from "mongoose";

interface ICouponApplied {
    code: string;
    discountAmount?: number;
    discountPercentage?: number;
    minCartAmount?: number;
}

interface ICartItems {
    _id: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface ICart extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    items: ICartItems[];
    subtotal: number;
    discountAmount: number;
    totalAmount: number;
    coupon?: ICouponApplied;
    updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItems>({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, default: 0, required: true },
});

const CartSchema = new Schema<ICart>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [cartItemSchema],
        subtotal: { type: Number, required: true, default: 0 },
        discountAmount: { type: Number, required: true, default: 0 },
        totalAmount: { type: Number, required: true, default: 0 },
        coupon: {
            code: String,
            discountAmount: Number,
            discountPercentage: Number,
            minCartAmount: Number,
        },
    },
    { timestamps: true }
);

CartSchema.pre("save", function (this: ICart, next) {
    let subtotal = 0;
    this.items.forEach((item) => {
        item.subtotal = item.price * item.quantity;
        subtotal += item.subtotal;
    });

    this.subtotal = subtotal;

    if (this.coupon) {
        if (this.coupon.minCartAmount && subtotal < this.coupon.minCartAmount) {
            this.coupon = undefined;
            this.discountAmount = 0;
        } else if (this.coupon.discountPercentage ) {
            this.discountAmount = (subtotal * this.coupon.discountPercentage) / 100;
        } else {
            this.discountAmount = this.coupon.discountAmount || 0;
        }
    } else {
        this.discountAmount = 0;
    }

    this.totalAmount = subtotal - this.discountAmount;
    next();
});

export const Cart: Model<ICart> = model<ICart>("Cart", CartSchema);
