import connection from './mariaDB.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto'; // 암호화
dotenv.config();

export const join = async (req, res) => {
  try {
    const newUser = req.body;
    let { email, password } = newUser;

    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
      .toString('base64');

    let values = [email, hashPassword, salt];
    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    await connection.query(sql, values);
    res.status(StatusCodes.CREATED).json(`회원가입완`);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 로그인
export const login = async (req, res) => {
  try {
    let newUser = req.body;
    let { email, password } = newUser;

    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `아이디와 비밀번호를 모두 입력해주세요` });
    }
    let sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await connection.query(sql, [email]);
    const loginUser = results[0];

    if (!loginUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: '이메일 또는 비밀번호가 틀렸습니다.',
      });
    }

    if (!loginUser.salt) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: '계정에 문제가 있습니다. 다시 회원가입해주세요.',
      });
    }

    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512')
      .toString('base64');

    if (loginUser && loginUser.password == hashPassword) {
      // 토큰 발행
      let token = jwt.sign(
        { email: loginUser.email, name: loginUser.name },
        process.env.PRIVATE_KEY,
        { expiresIn: '1m', issuer: 'seoin' } // 언제까지 유효할겨  누가 발행한겨
      );
      // 토큰 쿠키에 담기
      res.cookie('token', token, { httpOnly: true });
      console.log(token);
      res
        .status(StatusCodes.OK)
        .json(`${loginUser.name}님 로그인 되었습니다. 어서오세요!`);
    } else {
      res.status(403).json(`아이디 또는 비밀번호가 틀렸습니다!`);
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
};

export const passwordResetRequest = async (req, res) => {
  try {
    const { email } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    const results = await connection.query(sql, [email]);
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).end();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 비밀번호 초기화
export const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
      .toString('base64');

    let sql = `UPDATE users SET password=?,salt=? WHERE email=?`;
    let values = [hashPassword, salt, email];
    const results = await connection.query(sql, values);
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
