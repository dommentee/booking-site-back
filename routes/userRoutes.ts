import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import { authenthicateUser,  authorizePermission } from '../middleware/authentication';

//all routes will be authenticated
//authenticate user then get role
router.route('/').get(authenthicateUser,  authorizePermission,  userController.getAllUsers);
//show me before getting id
router.route('/showMe').get(userController.showCurrentUser);
router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.updateUserPassword);

router.route('/:id').get(authenthicateUser, userController.getSingleUser);


export default router