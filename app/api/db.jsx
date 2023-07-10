import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
};

const pool = mysql.createPool(dbConfig);

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error(
      "Error occurred while acquiring a database connection:",
      error
    );
    throw error;
  }
};

export default {
  getConnection,
};
