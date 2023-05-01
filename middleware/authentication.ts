// import CustomError from '../errors';
import {Request, Response, NextFunction} from 'express';

import {isTokenValid} from '../utils/jwt';
//import { IGetUserAuthInfoRequest } from '../utils/IGetUserAuthInfoRequest';
//import customError
//check if the cookie is present
export const authenthicateUser = async (req: any, res:Response, next: NextFunction) => {
    const token = req.signedCookies.token
    if(!token) {
       return res.status(403).json('Authentication invalid');
    }

    try {
        const payload = isTokenValid(token);
        req.user = payload;
        next();
    }catch(err) {
        throw new Error('Authentication invalid');

    }
}

//autherize permissions
//need to come back and add status codes 
export const authorizePermission = async ( req: any, res: Response, next: NextFunction) => {
   if(req.user.payload.user.role !== 'admin') {
       return res.status(403).json('Unautherize to access to this route');
   }
    next();
    
    
}
