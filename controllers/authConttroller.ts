import { error } from "console";
import {Request, Response} from "express";
import { StatusCodes } from 'http-status-codes';
import { User } from "../models/user";
import {createJwt} from '../utils/jwt'
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
    const token = createJwt({payload: tokenUser})

    const oneday = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneday)

    })
    res.status(StatusCodes.CREATED).json({user: tokenUser,})
}

const login = async (req: Request, res: Response) => {
    res.send('login user');
}

const logout = async (req: Request, res: Response) => {
    res.send('log out user');
}


export default {
    register,
    login,
    logout
}
