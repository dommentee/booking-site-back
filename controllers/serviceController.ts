import { Request, Response } from "express";

import { Service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { log } from "console";

//   createProduct,
//   getAllProducts,
//   getSingleProduct,
//   updateProduct,
//   deleteProduct,
//   uploadImage,
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
const getAllServices = async (req: Request, res: Response) => {
  const services = await Service.find({});

  res.status(StatusCodes.OK).json({ services, count: services.length });
};

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
// const updateService = async (req: Request, res: Response) => {
//   const { id: serviceId } = req.params;

//   const product = await Service.findOneAndUpdate({ _id: serviceId }, req.body, {
//     new: true
//     runValidators: true,
//   });

//   if (!product) {
//     throw new CustomError.NotFoundError(`No product with id : ${productId}`);
//   }

//   res.status(StatusCodes.OK).json({ product });
// };

export default {
  getAllServices,
  createService,
};
