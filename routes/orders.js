import express from 'express';
import { body, validationResult } from 'express-validator';

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
router.post('/', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 주문 내역 조회
router.get('/', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 주문 상세 조회
router.get('/{orderId}', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

export default router;
