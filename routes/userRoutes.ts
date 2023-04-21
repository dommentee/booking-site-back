import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';

//all routes will be authenthicated
router.route('/').get(userController.getAllUsers);
//show me before getting id
router.route('/showMe').get(userController.showCurrentUser);
router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.updateUserPassword);

router.route('/:id').get(userController.getSingleUser);

export default router