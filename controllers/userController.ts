import {Request, Response} from "express";
import { User } from "../models/user";
import { StatusCodes } from "http-status-codes";

//admin
const getAllUsers = async (req: any, res: Response) => {    
    const users = await User.find({role: 'user'}).select('-password');
    res.status(StatusCodes.OK).json({users})
}
//user by id
const getSingleUser = async (req: Request, res: Response) => {
   const user = await User.findOne({_id:req.params.id}).select('-password');
   if(!user) {
        throw new Error(`No user with id: ${req.params.id}`);
   }
   res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req: Request, res: Response) => {
    res.send(req.body);
}

const updateUser = async (req: Request, res: Response) => {
    res.send(req.body);
}

const updateUserPassword = async (req: Request, res: Response) => {
    res.send(req.body);
}

export default {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}