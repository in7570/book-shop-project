import connection from '../mariaDB';
import { StatusCodes } from 'http-status-codes';

export const join = async (req, res) => {
  try {
    let newUser = req.body;
    let { email, password } = newUser;
    let values = [email, password];
    let sql = 'INSERT INTO users (email,password) VALUES (?,?)';
    await connection.query(sql, values);
    res.status(StatusCodes.CREATED).json(`회원가입완`);
  } catch {
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
