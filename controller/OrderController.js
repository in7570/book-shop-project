import connection from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

// 결제하기
export const order = async (req, res) => {
  try {
    const {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      userId,
      firstBookTitle,
    } = req.body;
    let delivery_id = 3;
    let order_id = 1;
    // delivery_id 구하기
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];

    // order_id 구하기
    sql = `INSERT INTO orders (book_title,total_quantity,total_price,user_id,delivery_id) VALUES (?,?,?,?,?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    // order_id = results.insertId;

    sql = `INSERT INTO orderedBook (order_id,book_id,quantity) VALUES ?`;

    values = [];
    items.forEach((item) => {
      values.push([order_id, item.book_id, item.quantity]);
    });

    const [results] = await connection.query(sql, [values]);

    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
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
