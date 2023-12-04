import express from "express";
const router = express.Router();
import serviceController from "../controllers/serviceController";
import {
  authenthicateUser,
  authorizePermission,
} from "../middleware/authentication";

router
  .route("/")
  .post(
    [authenthicateUser, authorizePermission("admin")],
    serviceController.createService
  )
  .get(serviceController.getAllServices);

export default router;
