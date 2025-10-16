// express
import express from 'express';
const app = express();

// .env
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log('🚀 서버가 포트 9999에서 실행 중입니다!');
  console.log('📡 http://localhost:9999');
});
