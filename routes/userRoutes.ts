import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import { authenthicateUser,  authorizePermission } from '../middleware/authentication';

//all routes will be authenticated
//authenticate user then get role
//then get access to route is approreite
router.route('/').get(authenthicateUser, authorizePermission('admin', 'employee'), userController.getAllUsers);
//show me before getting id
router.route('/showMe').get(authenthicateUser, userController.showCurrentUser);
router.route('/updateUser').patch(authenthicateUser, userController.updateUser);
router.route('/updateUserPassword').patch(authenthicateUser, userController.updateUserPassword);

router.route('/:id').get(authenthicateUser, userController.getSingleUser);


export default router