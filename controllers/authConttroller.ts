import { error } from "console";
import {Request, Response} from "express";
import { StatusCodes } from 'http-status-codes';
import { User } from "../models/user";
import { attachCookieToResponse } from "../utils/jwt";
// import customError from '../errors';//need error files 

const register = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password}  = req.body;
    const emailExist = await User.findOne({email});
    // if(emailExist) {
    //     throw new customError.BadRequestError('email aleady exist');
        
    // }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    //do not include roles so its in req.body
    const user = await User.create({firstName, lastName, email, password});
    const tokenUser = {userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }
    attachCookieToResponse(res, {user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new Error('Please provide email and password');
    }
    //check if email exist
    const user = await  User.findOne({email});
    
    if(!user) {
        //throw new unauthenthicatedErrro 404
        throw new Error('Invalid Creditionals');
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new Error('Invalid Creditionals');
    }
    
    const tokenUser = {userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }
    attachCookieToResponse(res, {user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const logout = async (req: Request, res: Response) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000), 
    }) 
    //no need to send anything
    
}


export default {
    register,
    login,
    logout
}
