import { Request, Response } from "express";

import { Booking } from "../models/booking";
import { StatusCodes } from "http-status-codes";
import errorHandlerMiddleware from "../middleware/error-handler";
import { error } from "console";

//create
const createBooking = async (req: Request, res: Response) => {
  const { service, date, time, firstName, lastName, email, phone } = req.body;
  try {
    const booking = await Booking.create({
      service,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Booking made successfully",
      booking,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error,
    });

    console.error(error.message);
  }
};

//get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({});
    res.status(StatusCodes.OK).json({ bookings, count: bookings.length });
  } catch (error: any) {
    console.error(error.message);
  }
};
//single booking
const getSingleBooking = async (req: Request, res: Response) => {
  const { id: bookingId } = req.params;
  try {
    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      throw error(`no booking with the id ${bookingId}`);
    }
    res.status(StatusCodes.OK).json({ booking });
  } catch (error: any) {
    console.error(error.message);
  }
};
//update booking
const updateBooking = async (req: Request, res: Response) => {
  const { id: bookingId } = req.params;
  try {
    const booking = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      throw error(`no booking with the id ${bookingId}`);
    }
    res.status(StatusCodes.OK).json({ booking });
  } catch (error: any) {
    console.error(error.message);
  }
};
//delete booking
const deleteBooking = async (req: Request, res: Response) => {
  const { id: bookingId } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete({ _id: bookingId });
    if (!booking) {
      throw error(`no booking with the id ${bookingId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "booking cancelled successfully" });
  } catch (error: any) {
    console.error(error.message);
  }
};
export default {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
