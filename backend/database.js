import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTasks() {
  const [res] = await pool.query("SELECT * FROM tasks");
  return res;
}

export async function getTask(id) {
  const [res] = await pool.query(`SELECT * FROM tasks WHERE taskId = ?`, [id]);
  return res[0];
}

export async function createTask(title, status) {
  const [res] = await pool.query(
    `INSERT INTO tasks (title, status) values (?, ?)`,
    [title, status]
  );

  return res.insertId;
}

export async function updateTask(id, title, status) {
  const [res] = await pool.query(
    `UPDATE tasks SET title = ?, status = ? WHERE taskId = ?`,
    [title, status, id]
  );

  return res.insertId;
}

export async function updateStatusTask(id, status) {
  const [res] = await pool.query(
    `UPDATE tasks SET status = ? WHERE taskId = ?`,
    [status, id]
  );

  return res.insertId;
}

export async function updateTitleTask(id, title) {
  const [res] = await pool.query(
    `UPDATE tasks SET title = ? WHERE taskId = ?`,
    [title, id]
  );

  return res.insertId;
}

export async function deleteTask(id) {
  pool.query(`DELETE FROM tasks WHERE taskId = ?`, [id]);
}
