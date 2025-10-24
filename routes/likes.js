import express from 'express';
import { body, validationResult } from 'express-validator';
import { addLike, removeLike } from '../controller/LikeController.js';

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

// 좋아요 추가
router.post('/:bookId', [validate], addLike);

// 좋아요 취소
router.delete('/:bookId', [validate], removeLike);

export default router;
