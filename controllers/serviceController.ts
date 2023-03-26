import {Request, Response} from "express";

import { Service } from "../models/service";

const getAllService = async (req: Request, res: Response) => {
   const { title, price, duration, description} = req.query;

   res.send('these are the services')

}




export default {
    getAllService
}


