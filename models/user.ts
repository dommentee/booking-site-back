import mongoose from "mongoose";
const { Schema, Document } = mongoose

export interface IUser {//to merge the fields to the inside mongodb with the schema
    _id: mongoose.ObjectId
    firstName: string,
    lastName: string,
    email: string
    password: string,
    isAdmin: boolean
    authCount: number
}

// methods are part of document
export interface IUserDocument extends IUser, Document {
    
}
  
  // statics are part of model
export interface IUserModel extends mongoose.Model<IUserDocument> {
    
}


const userSchema: mongoose.Schema<IUserDocument> = new Schema(

    {   
        firstName: {type: String, required: [true, 'first name is required']},
        lastName: {type: String, required: [true, 'last name is required']},
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required']
        },
        password:{
            type: String,
            required: [true, 'password is requred'],
            minlength: [5, 'password must be 5 characters or more']
        }, 
        isAdmin: {
            type: Boolean,
            default: false
        },
        authCount: Number
    }
)
export const User = mongoose.model<IUserDocument,IUserModel>("User", userSchema);
