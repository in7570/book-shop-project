import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getOrderDetail,
  getOrders,
  order,
} from '../controller/OrderController.js';

const router = express.Router();

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);
  try {
    next();
  } catch (err) {
    res.status(404).json(err.array());
  }
};

// 결제하기
router.post('/', [validate], order);

// 주문 내역 조회
router.get('/', [validate], getOrders);

// 주문 상세 조회
router.get('/:orderId', [validate], getOrderDetail);

export default router;
