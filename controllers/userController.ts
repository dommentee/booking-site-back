import {Request, Response} from "express";
import { User } from "../models/user";
import { StatusCodes } from "http-status-codes";
import { createTokenUser } from "../utils/createTokenUser";
import { attachCookiesToResponse } from "../utils/jwt";
import { checkPermissions } from "../utils/checkPermission";

//admin will have the abality to get all users
const getAllUsers: any = async (req: any, res: Response) => {    
    const users = await User.find({role: 'user'}).select('-password');
    res.status(StatusCodes.OK).json({users})
}
// view user by id,if user is not admin they can only view their profile
const getSingleUser = async (req: any, res: Response) => {
   const user = await User.findOne({_id:req.params.id}).select('-password');
   if(!user) {
        throw new Error(`No user with id: ${req.params.id}`);
   }
   checkPermissions(req.user, user.id)
   res.status(StatusCodes.OK).json(user)
}

const showCurrentUser = async (req: any, res: Response) => {
    res.status(StatusCodes.OK).json(req.user)
}

//update user information
const updateUser = async (req: any, res: Response) => {
    const {email, firstName, lastName} = req.body;

    if(!email || !firstName || !lastName) {
        throw new Error('Please provide all values');
    }
        
    const user = await User.findOne(
        {_id: req.user.payload.user.userId},
    );
    //need to create user  token because the values have changed    
    if(!user) {
        throw new Error('No user found');
    }

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName

    await user.save();

    // token needs to created for new user values
    const tokenUser = createTokenUser(user)
    //attectch the cookie
    attachCookiesToResponse(res, tokenUser);
    res.status(StatusCodes.OK).json({user: tokenUser})
}

//update user password
const updateUserPassword = async (req: any, res: Response) => {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
        throw new Error('Please provide both values');
    }

    const user = await User.findOne({_id: req.user.payload.user.userId});    
    
    if(!user) {
        throw new Error('No user found');
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if(!isPasswordCorrect) {
        throw new Error('Invalid credentials');
    }

    user.password = newPassword;
    
    await user.save();
    res.status(StatusCodes.OK).json({msg: 'success, password updated'})
}

export default {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}