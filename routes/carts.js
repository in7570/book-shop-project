import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  addToCart,
  getCartItems,
  removeCartItem,
} from '../controller/CartController.js';

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

// 장바구니 담기
router.post('/', [validate], addToCart);

// 장바구니 조회  // 선택된 장바구니 아이템 조회
router.get('/', [validate], getCartItems);

// 장바구니 도서 삭제
router.delete('/:id', [validate], removeCartItem);


export default router;
