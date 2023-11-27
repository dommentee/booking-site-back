import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema, Document } = mongoose;

export interface IUser extends mongoose.Document {
  //to merge the fields to the inside mongodb with the schema
  _id: mongoose.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  isVerified: Boolean;
  verified: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// methods are part of document
export interface IUserDocument extends IUser, Document {}

// statics are part of model
export interface IUserModel extends mongoose.Model<IUserDocument> {}

const userSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Please provide last name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: (str: string) => validator.isEmail(str),
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "password is requred"],
    minlength: [8, "password must be 8 characters or more"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
});

//hash password
userSchema.pre("save", async function () {
  //save is called to modify other user info
  //this will call this function and rehash the password resulting in wrong password
  //bypass this
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.trim(), salt);
});

//login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};
export const User = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);
