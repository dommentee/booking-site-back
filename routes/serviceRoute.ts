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

router
  .route("/:id")
  .get(serviceController.getSingleService)
  .patch(
    [authenthicateUser, authorizePermission("admin")],
    serviceController.updateService
  )
  .delete(
    [authenthicateUser, authorizePermission("admin")],
    serviceController.deleteService
  );
export default router;
