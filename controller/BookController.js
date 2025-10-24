import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 도서 전체 조회
export const allBooks = async (req, res) => {
  try {
    let { category_id, news, currentPage } = req.query;

    let offset = limit * (currentPage - 1);

    let sql = `SELECT * (SELECT count (*) FROM likes WHERE books.id = liked_nook_id) AS likes FROM books`;
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
    let { user_id } = req.body;
    let book_id = req.params.id;
    let sql =
      'SELECT *,(SELECT count (*) FROM likes WHERE liked_book_id=books.id) AS likes,(SELECT EXISTS (SELECT * FROM likes WHERE user_ id=? AS liked_book_id=?)) AS liked FROM books LEFT JOIN category ON books. category_id = category.category_id WHERE books. id=?;';
    let values = [user_id, book_id, book_id];
    let results = await connection.query(sql, values);
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
