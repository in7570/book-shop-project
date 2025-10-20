import connection from '../mariaDB';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const join = async (req, res) => {
  try {
    let newUser = req.body;
    let { email, password } = newUser;
    let values = [email, password];
    let sql = 'INSERT INTO users (email,password) VALUES (?,?)';
    await connection.query(sql, values);
    res.status(StatusCodes.CREATED).json(`회원가입완`);
  } catch {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

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
    if (loginUser && loginUser.password == password) {
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
  } catch {
    console.error(error);
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
};

export const requestPasswordReset = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    let values = [password, email];
    const results = await connection.query(sql, values);
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
