import connection from '../mariaDB.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

router.use(express.json());

// 도서 전체 조회
export const allBooks = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json();
  } catch (err) {
    console.error(err);
  }
};

// 도서 개별 조회
export const bookDetail = async (req, res) => {};

// 도서 카테고리별 조회
export const booksByCategory = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json();
  } catch (err) {
    console.error(err);
  }
};
