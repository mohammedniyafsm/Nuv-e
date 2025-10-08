import { model, Schema, Types } from "mongoose";


interface ICoupon extends Document {
    code : String,
    discountAmount : number,
    discountPercentage? : number,
    minCartAmount? : number,
    maxUsagePerUser : number,
    expiryDate : Date,
    userUsed : {
        userId : Types.ObjectId,
        timesUsed : number,
    }[];
}

const couponSchema = new Schema <ICoupon>({
    code : {
        type : String,
        required : true,
    },
    discountAmount : {
        type : Number,
        required : true,
    },
    discountPercentage : {
        type : Number,
    },
    minCartAmount : {
        type : Number,
    },
    maxUsagePerUser : {
        type : Number,
    },
    expiryDate : {
        type : Date
    },
    userUsed : [
        {
            userId : {
                type : Schema.Types.ObjectId,
                ref : 'User'
            },
            timeUsed : {
                type : Number,
                default : 0
            }
        }
    ]
})

export const Coupon = model <ICoupon>('Coupon',couponSchema);