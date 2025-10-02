import { model, Model, Schema, Types } from "mongoose";

interface IAddressDetail {
    addressLine1 : string,
    addressLine2 : string,
    city : string,
    state : string,
    postalCode : string,
    country : string,
    type : string,
    createdAt : Date;
}



interface IAddress {
    userId : Types.ObjectId,
    address : IAddressDetail[],
}

export const AddressDetail = new Schema <IAddressDetail>({
    addressLine1 :{
        type : String,
        required : true,
    },
    addressLine2 :{
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    state :{
        type : String,
        required : true,
    },
    postalCode :{
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    }
})

const AddressSchema = new Schema <IAddress>({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    address : [AddressDetail]
})


const Address : Model <IAddress> =  model <IAddress>('Address',AddressSchema);