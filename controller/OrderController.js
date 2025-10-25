import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 결제하기
export const order = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json();
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json();
  }
};

// 주문 내역 조회
export const getOrders = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json();
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json();
  }
};

// 주문 상세 조회
export const getOrderDetail = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json();
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json();
  }
};
