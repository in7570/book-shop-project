import express from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import join from '../UserController';

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
router.post('/login', [validate], async (req, res) => {
  try {
    let newUser = req.body;
    let { email, password } = newUser;

    if (email || password) {
      let sql;
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: '아이디와 비밀번호를 모두 입력해주세요' });
    }

    res.status(StatusCodes.OK).json();
  } catch (error) {
    console.error(error);
  }
});

// 비밀번호 초기화 요청
router.post('/reset', async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

// 비밀번호 초기화
router.put('/reset', async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});

export default router;
