import {User, IUser, IUserDocument} from '../models/user'
import { sign, verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';

export interface MyContext {
    req: Req;
    res: Response;
}
export interface Req extends Request {
    user?:  IUserDocument
    userId?: string
}

interface TokenData {
    userId?: string | null
    authCount?: number | null
  }

export const CreateAccessToken = (user: IUser) => {
    const acessToken = process.env.ACCESS_TOKEN_SECRET
    return sign({ userId: user._id, isAdmin: user.isAdmin }, acessToken!, { expiresIn: '15m' })
}

export const CreateRefreshToken = (user: IUser) => {
    const refreshToken = process.env.REFRESH_TOKEN_SECRET
    return sign({ userId: user._id, isAdmin: user.isAdmin }, refreshToken!, {
      expiresIn: '7d'
    })
}


export const verifyRefreshToken = (refreshToken?: string): TokenData => {
    let data: TokenData = {
      userId: null,
      authCount: null
    };
    try {
      if (!refreshToken) return data;
      data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET! ) as TokenData;
    } catch { }
    return data;
  };

export const authMiddleWare = async (req: Req, res: Response, next: NextFunction) => {
  //get cookie from user request
    const refreshToken = req.cookies ? req.cookies["refresh-token"] : null;
    const accessToken = req.cookies ? req.cookies["access-token"] : null;
  
  if (!refreshToken && !accessToken) return next();
  
  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as TokenData;
    if (data.userId) req.userId = data.userId;
    

    const user =  await User.findById(data.userId)


    if(!user) {
        return new Error('log in not found')
    }
    req.user = user
    return next();
  } catch { }
  
  if (!refreshToken) return next(); // expired access token
  
  const data = verifyRefreshToken(refreshToken);
    
  if(!data.userId) {
    return next()
  }
  const user =  await User.findById(data.userId)


  if(!user) {
      return new Error('log in not found')
  }
  req.user = user
  return next();
}