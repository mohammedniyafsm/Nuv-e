import mongoose, { Schema, Model } from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    status: string;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        isVerified: { type: Boolean, default: false },
        status: { type: String, enum: ["active", "inactive", "banned"], default: "active" },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
