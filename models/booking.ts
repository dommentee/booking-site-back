import mongoose, { mongo } from "mongoose";
import validator from "validator";

const { Schema, Document } = mongoose;

//create booking interface
export interface IBooking {
  _id: mongoose.ObjectId;
  service: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceProvider: string;
  //   prepay: boolean;
}

export interface IBookingDucument extends IBooking, Document {}

export interface IBookingModel extends mongoose.Model<IBookingDucument> {}

const bookingSchema: mongoose.Schema<IBookingDucument> = new mongoose.Schema(
  {
    service: {
      type: String,
      required: [true, "Please provide a service"],
    },
    date: {
      type: String,
      require: [true, "Please provide a date"],
      validate: {
        validator: (str: string) => validator.isDate(str),
        message: "Please provide valid date",
      },
    },
    time: {
      type: String,
      required: [true, "Please provide a time"],
    },
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
      required: [true, "Please provide email"],
      validate: {
        validator: (str: string) => validator.isEmail(str),
        message: "Please provide valid email",
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (str: string) => validator.isMobilePhone(str),
        message: "Please provide valid phone number",
      },
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBookingDucument, IBookingModel>(
  "Booking",
  bookingSchema
);
