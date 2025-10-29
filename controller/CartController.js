import jwt from 'jsonwebtoken';
import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 장바구니 담기
export const addToCart = async (req, res) => {
  try {
    const { book_id, quantity } = req.body;

    let authorization = ensureAuthorization(req, res);
    let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?,?,?)`;
    let values = [book_id, quantity, authorization.id];

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
    const { selected } = req.body;
    let authorization = ensureAuthorization(req, res);
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id=? AND cartItems.id IN (?);`;
    let values = [authorization.id, ...selected];
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
    let { cartId } = req.params;
    let authorization = ensureAuthorization(req, res);
    let sql = `DELETE FROM cartItems WHERE id = ? AND  user_id = ?`;
    let values = [cartId, authorization.id];
    console.log(values);
    const [results] = await connection.query(sql, values);
    // 장바구니에서 없는데도 삭제메세지 출력됨
    if (results.affectedRows > 0) res.status(StatusCodes.OK).json('식제완료');
    else res.status(StatusCodes.OK).json('삭제안돼' + results.affectedRows);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 인증 인가
function ensureAuthorization(req, res) {
  try {
    let receivedJwt = req.headers['authorization'];
    console.log('received jwt : ', receivedJwt);

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedJwt);
    return decodedJwt;
  } catch (err) {
    console.error(err);
    return err;
    // return res.status(StatusCodes.UNAUTHORIZED).json({
    //   message: '로그인 세션이 만료 되었다제',
    // });
  }
}
