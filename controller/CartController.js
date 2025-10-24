import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 장바구니 담기
export const addToCart = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json('장바구니에 담았서요');
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
// 장바구니 목록 조회
export const getCartItems = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
// 장바구니 도서 삭제
export const removeCartItem = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json('장바구니에서 삭제합니당');
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// // 장바구니에서 선택한 주문 예상 상품 목록 조회
// export const addToCart = async (req, res) => {
//   try {
//     res.status(StatusCodes.OK).json('장바구니에 담았서요');
//   } catch (err) {
//     console.error(err);
//     res.status(StatusCodes.BAD_REQUEST).end();
//   }
// };
