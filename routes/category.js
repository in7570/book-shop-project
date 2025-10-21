import express from 'express';
import { validationResult } from 'express-validator';
import { allCategory } from '../controller/CategoryController.js';

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

router.get('/', [validate], allCategory);

export default router;
