const pool = require('../db');

const getAllAssets = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT assets.*, users.name AS assigned_to_name, departments.name AS department_name
      FROM assets
      LEFT JOIN users ON assets.assigned_to = users.id
      LEFT JOIN departments ON assets.department_id = departments.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT assets.*, users.name AS assigned_to_name, departments.name AS department_name
      FROM assets
      LEFT JOIN users ON assets.assigned_to = users.id
      LEFT JOIN departments ON assets.department_id = departments.id
      WHERE assets.id = $1
    `, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Asset not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAsset = async (req, res) => {
  try {
    const { name, type, serial_number, status, assigned_to, department_id } = req.body;
    const result = await pool.query(
      `INSERT INTO assets (name, type, serial_number, status, assigned_to, department_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, type, serial_number, status, assigned_to, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, serial_number, status, assigned_to, department_id } = req.body;
    const result = await pool.query(
      `UPDATE assets SET name=$1, type=$2, serial_number=$3, status=$4, assigned_to=$5, department_id=$6
       WHERE id=$7 RETURNING *`,
      [name, type, serial_number, status, assigned_to, department_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Asset not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM assets WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Asset not found' });
    res.json({ message: 'Asset deleted', asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllAssets, getAssetById, createAsset, updateAsset, deleteAsset };