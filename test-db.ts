import 'dotenv/config';
import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('✅ Connected! Tables:', rows);
    await connection.end();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();
