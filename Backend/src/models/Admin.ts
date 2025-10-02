import { Document, Model, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt" 



interface IAdmin extends Document {
    _id : Types.ObjectId;
    username : string,
    email : string,
    password : string,
    role : string,
    comparePassword (password : string) : Promise<boolean>
}

const adminSchema = new Schema <IAdmin>({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "admin",
        required : true,
    },
},{
    timestamps : true
})

// Pre-save middleware to hash password
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Instance method to compare passwords
adminSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const Admin : Model  <IAdmin> =  model<IAdmin>('Admin',adminSchema);
export default Admin;