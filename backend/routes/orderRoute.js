import express from 'express';
import {placeOrder, getOrderByUserId} from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.post('/placeOrder', placeOrder);
orderRouter.post('/getOrders', getOrderByUserId);

export default orderRouter;