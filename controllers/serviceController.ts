import { Request, Response } from "express";

import { Service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { error, log } from "console";

//   uploadImage,
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

//create
const createService = async (req: Request, res: Response) => {
  const { title, price, duration, description, image, category } = req.body;
  const user = req.user;

  const service = await Service.create({
    title,
    price,
    duration,
    description,
    image,
    category,
    createdBy: user?.payload.user.userId,
  });
  res.status(StatusCodes.CREATED).json({
    service,
  });
};

//get all
const getAllServices = async (req: Request, res: Response) => {
  const services = await Service.find({});

  res.status(StatusCodes.OK).json({ services, count: services.length });
};

//get single service
const getSingleService = async (req: Request, res: Response) => {
  const { id: serviceId } = req.params;

  try {
    const service = await Service.findOne({ _id: serviceId });

    if (!service) {
      throw error(`no service with the id ${serviceId}`);
    }

    res.status(StatusCodes.OK).json({ service });
  } catch (error: any) {
    console.error(error.msg);
  }
};

//update
const updateService = async (req: Request, res: Response) => {
  const { id: serviceId } = req.params;

  try {
    const service = await Service.findByIdAndUpdate(
      { _id: serviceId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!service) {
      throw error(`no service with the id ${serviceId}`);
    }
    res.status(StatusCodes.OK).json({ service });
  } catch (error: any) {
    console.error(error.msg);
  }
};

const deleteService = async (req: Request, res: Response) => {
  const { id: serviceId } = req.params;
  try {
    const service = await Service.findByIdAndDelete({ _id: serviceId });
    if (!service) {
      throw error(`no service with the id ${serviceId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "service deleted successsfully" });
  } catch (error: any) {
    console.error(error.msg);
  }
};

export default {
  getAllServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
};
