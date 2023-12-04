import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";
import { attachCookiesToResponse } from "../utils/jwt";
import { createTokenUser } from "../utils/createTokenUser";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import crypto from "crypto";
//import sendEmail from "../utils/sendEmail";
// import customError from '../errors';//need error files

//register
const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new Error("email already exist");
    // throw new customError.BadRequestError('email aleady exist');
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  //do not include roles so its in req.body
  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
    role,
    verificationToken,
  });

  //will need to be change for proction
  const origin = "http://localhost:3000";
  await sendVerificationEmail({
    name: user.firstName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  //send back status only on testing
  res.status(StatusCodes.CREATED).json({
    msg: "Success! pease check email to verify account",
  });
};

//verify email
const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Varification failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new Error("Varification failed");
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

///login
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  //check if email exist
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    //throw new unauthenthicatedErrro 404
    throw new Error("User not found");
  }

  //if user
  //use a userschema method that comapares passwords
  const isPasswordCorrect = await user.comparePassword(password);

  //if does not match
  if (!isPasswordCorrect) {
    throw new Error("Invalid Creditionals");
  }

  if (!user.isVerified) {
    throw new Error("Please verify email");
  }

  //create token user
  const tokenUser = createTokenUser(user);

  //refresh token
  //let refreshToken = "";

  //check  for existing token
  //const existingToken = await Token.findOne({ user: user._id });

  attachCookiesToResponse(res, { user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
  return;
};

const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(),
  });
  //no need to send anything
  res.status(200).json("user looged out");
};

export default {
  register,
  login,
  logout,
  verifyEmail,
};
