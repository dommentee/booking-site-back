import { Request, Response } from "express";//imprt express
import { sign, verify  } from "jsonwebtoken";//jwt atributes

import { findUserById, User } from "../controllers/userController";//import function and interface from user controller

export interface Req extends Request {
  userId?: number
}

export interface MyContext {
  req: Req
  res: Response
}

//data the token should have
interface TokenData {
  userId?: number | null
  authCount?: number | null
}

//should be in env file  
const REFRESH_TOKEN_SECRET = "CHANGE_ME!";
const ACCESS_TOKEN_SECRET = "CHNAGE_ME_TOO!";

//creates token on login
export const createTokens = (user: User) => {
  const refreshToken = sign(
    { userId: user._id, authCount: user.authCount},
    REFRESH_TOKEN_SECRET, { expiresIn: "7d" },
    //@ts-ignore
    // process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" },
  );
  const accessToken = sign(
    { userId: user._id },
    ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
    //@ts-ignore
    // process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
  );

  return { refreshToken, accessToken };
};
//to verfy jwt authenthic
export const verifyRefreshToken = (refreshToken?: string): TokenData => {
  let data: TokenData = {
    userId: null,
    authCount: null
  };
  try {
    if (!refreshToken) return data;
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as TokenData;
  } catch { }
  return data;
};

  //connects logic to express 
  //middle ware for users
export const authMiddleware = async (req: Req, res: Response, next: () => void) => {
  const refreshToken = req.cookies ? req.cookies["refresh-token"] : null;
  const accessToken = req.cookies ? req.cookies["access-token"] : null;
  
  if (!refreshToken && !accessToken) return next();
  
  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as TokenData;
    if (data.userId) req.userId = data.userId;
    return next();
  } catch { }
  
  if (!refreshToken) return next(); // expired access token
  
  const data = verifyRefreshToken(refreshToken);
    
  if(!data.userId) {
    return next()
  }
    
  const user = await findUserById(data.userId); //FIX THIS FIX FIX
  if (!user || user.authCount !== data.authCount) return next(); // token has been invalidated
  
  const tokens = createTokens(user);
  
  res.cookie("refresh-token", tokens.refreshToken, {httpOnly: true ,sameSite: "none", secure: true});
  res.cookie("access-token", tokens.accessToken, {httpOnly: true, sameSite: "none", secure: true});
  if (data.userId) req.userId = data.userId;
  
  next();
}

export const clearLoginCookies = async (req: Req, res: Response, next: () => void) => {
  
  res.cookie("refresh-token", "");
  res.cookie("access-token", "");
  
  next();
}