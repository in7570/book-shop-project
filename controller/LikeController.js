import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 좋아요 추가
export const addLike = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 좋아요 추가
export const removeLike = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json('좋아요 삭제');
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
