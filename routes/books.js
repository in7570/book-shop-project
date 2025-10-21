import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  allBooks,
  bookDetail,
  booksByCategory,
} from '../controller/BookController.js';

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

// 도서 전체 조회
router.get('/', [validate], allBooks);

// 도서 개별 조회
router.get('/:category', [validate], bookDetail);

// 카테고리별 도서 조회
router.get(
  '/?categoryId=:categoryId&new=:boolean',
  [validate],
  booksByCategory
);

export default router;
