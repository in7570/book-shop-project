import mysql from 'mysql2/promise';

let connection;

try {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // 공백 제거
    database: 'Bookshop',
    dateStrings: true,
  });
  console.log('✅ MariaDB 연결 성공!');
} catch (error) {
  console.warn('⚠️ MariaDB 연결 실패, 더미 객체로 대체:', error.message);
  // 연결 실패 시 더미 객체로 대체
  connection = {
    query: async (sql, params) => {
      console.log('🔸 DB 쿼리 실행 (더미):', sql, params);
      return [[], {}];
    },
    end: () => console.log('🔸 DB 연결 종료 (더미)'),
  };
}

export default connection;
