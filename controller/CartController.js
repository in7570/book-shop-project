import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 장바구니 담기
export const addToCart = async (req, res) => {
  try {
    const { book_id, quantity, user_id } = req.body;

    let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?,?,?)`;
    let values = [book_id, quantity, user_id];

    const [results] = await connection.query(sql, values);
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
// 장바구니 조회  // 선택된 장바구니 아이템 조회
export const getCartItems = async (req, res) => {
  try {
    const { user_id, selected } = req.body;
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id=? AND cartItems.id IN (?);`;
    let values = [user_id, selected];
    const [results] = await connection.query(sql, values);
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
// 장바구니 도서 삭제
export const removeCartItem = async (req, res) => {
  try {
    let { id } = req.params;
    let sql = `DELETE FROM cartItems WHERE id = ? `;
    const [results] = await connection.query(sql, id);
    res.status(StatusCodes.OK).json('장바구니에서 삭제합니당');
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
