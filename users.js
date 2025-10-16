import express from 'express';
const router = express.Router();

router.use(express.json());

import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const err = validationResult(req);
  try {
    next();
  } catch (err) {
    res.status(404).json(err.array());
  }
};

// 회원가입API
router.post('/join', [validate], async (req, res) => {
  try {
    res.status(201).json();
  } catch (error) {
    console.error(error);
  }
});
// 로그인API
router.post('/login', async (req, res) => {
  try {
    res.status(200).json();
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
router.post('/reset', async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
});
