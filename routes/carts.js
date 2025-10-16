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

// 장바구니 담기
router.post('/', [validate], async (req, res) => {
  try {
    res.status(201).json();
  } catch (error) {
    console.error(error);
  }
});

// 장바구니 조회
router.get('/', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 장바구니 도서 삭제
router.delete('/{bookId}', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 장바구니에서 선택한 주문 "예상" 상품 목록 조회
router.delete('/', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});
export default router;
