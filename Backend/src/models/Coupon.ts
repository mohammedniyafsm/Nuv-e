import { model, Schema, Types, Document } from "mongoose";

interface IUserUsed {
  userId: Types.ObjectId;
  timesUsed: number;
}

export interface ICoupon extends Document {
  code: string;
  discountAmount: number;
  discountPercentage?: number;
  minCartAmount?: number;
  maxUsagePerUser: number;
  expiryDate?: Date;
  userUsed: IUserUsed[];
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  discountPercentage: { type: Number },
  minCartAmount: { type: Number },
  maxUsagePerUser: { type: Number, required: true },
  expiryDate: { type: Date },
  userUsed: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      timesUsed: { type: Number, default: 0 },
    },
  ],
});

export const Coupon = model<ICoupon>("Coupon", couponSchema);
