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

// 도서 전체 조회
router.get('/', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 도서 개별 조회
router.get('/:category', [validate], async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 카테고리별 도서 조회
router.get(
  '/?categoryId={categryId}&new={boolean}',
  [validate],
  async (req, res) => {
    try {
      res.status(200).json();
    } catch (error) {
      console.error(error);
    }
  }
);

export default router;
