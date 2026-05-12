const pool = require('../db');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT users.*, departments.name AS department_name
      FROM users
      LEFT JOIN departments ON users.department_id = departments.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT users.*, departments.name AS department_name
      FROM users
      LEFT JOIN departments ON users.department_id = departments.id
      WHERE users.id = $1
    `, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, department_id } = req.body;
    const result = await pool.query(
      `INSERT INTO users (name, email, department_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department_id } = req.body;
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, department_id=$3 WHERE id=$4 RETURNING *`,
      [name, email, department_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };