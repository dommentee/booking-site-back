import express from 'express';
const router = express.Router();
import service from '../controllers/serviceController';

const {
    getAllService
} = service;

router.route('/').get(getAllService);

export default router