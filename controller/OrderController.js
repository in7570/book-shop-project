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

    // delivery_id 구하기
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await connection.execute(sql, values); // [values] → values
    let delivery_id = results.insertId;

    // order_id 구하기
    sql = `INSERT INTO orders (book_title,total_quantity,total_price,user_id,delivery_id) VALUES (?,?,?,?,?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await connection.execute(sql, values); // [values] → values, 구조분해할당 추가
    let order_id = results.insertId;

    // items로 book_id와 quantity 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?) `;
    let [order_items] = await connection.query(sql, [items]);
    console.log('items' + items);
    console.log(order_items);

    console.log('===============');

    // orderedBook에 삽입
    sql = `INSERT INTO orderedBook (order_id,book_id,quantity) VALUES ?`;
    values = [];
    order_items.forEach((row) => {
      values.push([order_id, row.book_id, row.quantity]);
    });
    [results] = await connection.query(sql, [values]);

    // 결제 후 기록 삭제
    [results] = await deleteCartItems(connection, items);

    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

// 장바구니 내역 삭제(결제 완료 후)
const deleteCartItems = async (connection, items) => {
  let sql = `DELETE FROM cartItems WHERE id IN (?)`;
  let result = await connection.query(sql, [items]);
  return result;
};

// 주문 내역 조회
export const getOrders = async (req, res) => {
  try {
    let sql = `SELECT orders.id, created_at,address, receiver, contact,book_title, total_quantity, total_price  
               FROM orders LEFT JOIN delivery 
               ON orders.delivery_id = delivery.id`;
    let [results] = await connection.query(sql);

    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json();
  }
};

// 주문 상세 조회
export const getOrderDetail = async (req, res) => {
  try {
    let { orderId } = req.params;
    let sql = `SELECT books.id,title,author,price,quantity
             FROM books LEFT JOIN orderedBook
             ON books.id = orderedBook.book_id
             WHERE order_id = ?`;
    let [results] = await connection.query(sql, [orderId]);

    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json();
  }
};
