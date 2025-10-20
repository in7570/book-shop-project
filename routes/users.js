import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  join,
  login,
  requestPasswordReset,
  passwordReset,
} from '../UserController';

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
// 1. constant validation 생성하기

// 회원가입API
router.post(
  '/join',
  [
    body('email')
      .notEmpty()
      .isString()
      .isEmail()
      .withMessage('이메일 형식으로 입력하세요'),
    body('name').notEmpty().isString().withMessage('이릉 정확히 입력하세요'),
    body('password')
      .notEmpty()
      .isString()
      .withMessage('비밀번호를 정확히 입력하세요'),
    body('contact')
      .notEmpty()
      .isString()
      .withMessage('전화번호 정확히 입력하세요'),
    validate,
  ],
  join
);

// 로그인API
router.post('/login', [validate], login);

// 비밀번호 초기화 요청
router.post('/reset', [validate], requestPasswordReset);

// 비밀번호 초기화
router.put('/reset', [validate], passwordReset);

export default router;
