import express from "express";
const router = express.Router();
import boookingController from "../controllers/boookingController";
import {
  authenthicateUser,
  authorizePermission,
} from "../middleware/authentication";

router
  .route("/")
  .post(
    // [authenthicateUser, authorizePermission("admin")],
    boookingController.createBooking
  )
  .get(boookingController.getAllBookings);
router
  .route("/:id")
  .get(boookingController.getSingleBooking)
  .patch(
    [authenthicateUser, authorizePermission("admin")],
    boookingController.updateBooking
  )
  .delete(
    [authenthicateUser, authorizePermission("admin")],
    boookingController.deleteBooking
  );
export default router;
