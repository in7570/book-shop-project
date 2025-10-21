import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';

import dotenv from 'dotenv';
dotenv.config();

// 카테고리 전체 조회
export const allCategory = async (req, res) => {
  try {
    let sql = 'SELECT * FROM category';
    const [results] = await connection.query(sql); // 구조 분해 할당 사용
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
