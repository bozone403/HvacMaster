import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5050;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(`✅ Connected to DB: ${process.env.DB_NAME}`);

    // Routes
    app.get('/api/customers', async (req, res) => {
      try {
        const [rows] = await db.execute('SELECT * FROM customers');
        res.json(rows);
      } catch (err) {
        console.error('❌ DB error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.get('/', (req, res) => {
      res.send('HVAC Master API is live');
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    }).on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
      } else {
        console.error('❌ Server error:', err);
      }
    });

  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  }
}

startServer();
