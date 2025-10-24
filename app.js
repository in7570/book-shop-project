import express from 'express';
import dotenv from 'dotenv'; // .env

const app = express();

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log('🚀 서버가 포트 9999에서 실행 중입니다!');
  console.log('📡 http://localhost:9999');
});

import userRouter from './routes/users.js';
import booksRouter from './routes/books.js';
import categoryRouter from './routes/category.js';
import likesRouter from './routes/likes.js';
// import ordersRouter from './routes/orders.js';
import cartsRouter from './routes/carts.js';

app.use('/users', userRouter);
app.use('/books', booksRouter);
app.use('/category', categoryRouter);
app.use('/likes', likesRouter);
// app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
