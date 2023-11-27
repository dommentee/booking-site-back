import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//sign payload with secrete
export const createJwt = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
    algorithm: "HS256",
  });
  return token;
};

//verify
export const isTokenValid = (token: any) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

//attach cookie to response
export const attachCookiesToResponse = (res: Response, user: any) => {
  const token = createJwt({ payload: user });
  const oneday = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneday),

    //to set cookies over https
    secure: process.env.NODE_ENV === "production",

    //set cookies over localhost
    // secure: true,
    signed: true,
    // sameSite: "none",
  });
};
