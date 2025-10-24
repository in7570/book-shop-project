import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 좋아요 추가
export const addLike = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { user_id } = req.body;

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
    let values = [user_id, bookId];

    const [results] = await connection.query(sql, values);
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 좋아요 추가
export const removeLike = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { user_id } = req.body;

    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    let values = [user_id, bookId];

    const [results] = await connection.query(sql, values);
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
