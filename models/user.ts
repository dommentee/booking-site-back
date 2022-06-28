import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

    {   
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            required: true,
            minlength: 8
        }, 
        isAdmin: {
            type: Boolean,
            default: false
        },
        authCount: Number
    }
)
export const User = mongoose.model("User", userSchema);
