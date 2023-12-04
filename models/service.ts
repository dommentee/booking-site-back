import { timeStamp } from "console";
import mongoose from "mongoose";

const { Schema, Document } = mongoose;

//create service interface
export interface IService {
  _id: mongoose.ObjectId;
  title: string;
  price: number;
  duration: number;
  description: string;
  image: string;
  category: string;
  createdBy: {};
}
// methods are part of document
export interface IServiceDocument extends IService, Document {}

// statics are part of model
export interface IServiceModel extends mongoose.Model<IServiceDocument> {}

//service schema
const serviceSchema = new mongoose.Schema<IServiceDocument>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxlength: [30, "title can not exceed 30 characters"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price must be greater than 0"],
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
      min: [30, "time must be greater than 0"],
      default: 30,
    },
    description: {
      type: String,
      maxlength: [300, "descriptions can not exceed 300 characters"],
      trim: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["hair", "makeup"],
      default: "hair",
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IServiceDocument, IServiceModel>(
  "Service",
  serviceSchema
);
