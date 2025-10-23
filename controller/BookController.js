import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 도서 전체 조회
export const allBooks = async (req, res) => {
  try {
    let { category_id, news, currentPage } = req.query;

    let offset = limit * (currentPage - 1);

    let sql = `SELECT * FROM books`;
    let values = [];
    if (category_id && news) {
      sql += `WHERE category_id =? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH)AND NOW()`;
      values = [category_id];
    } else if (category_id) {
      sql += `WHERE category_id=?`;
      values = [category_id];
    } else if (news) {
      sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH)AND NOW()`;
      values = values.push(news);
    }

    sql += `LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);

    let results = await connection.query(sql, category_id);
    if (results.length) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 도서 개별 조회
export const bookDetail = async (req, res) => {
  try {
    let { id } = req.params;
    let sql = 'SELECT * FROM books WHERE id=?';
    let results = await connection.query(sql, id);
    if (results[0]) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 도서 카테고리별 조회
export const booksByCategory = async (req, res) => {
  try {
    let { category_id } = req.query;
    let sql =
      'SELECT * FROM books LEFT JOIN category ON books.category_id = category_id WHERE books.id =1;';
    let results = await connection.query(sql, category_id);
    if (results.length) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
