import jwt from 'jsonwebtoken';
import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 좋아요 추가
export const addLike = async (req, res) => {
  try {
    const { bookId } = req.params;
    let authorization = ensureAuthorization(req);

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
    let values = [authorization.id, bookId];

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
    let authorization = ensureAuthorization(req);

    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    let values = [authorization.id, bookId];

    const [results] = await connection.query(sql, values);
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 인증 인가
function ensureAuthorization(req) {
  let receivedJwt = req.headers['authorization'];
  console.log('received jwt : ', receivedJwt);

  let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  return decodedJwt;
}
