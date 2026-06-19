const pool = require('../config/db');

class AxeRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM axes ORDER BY ordre ASC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM axes WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async findBySlug(slug) {
        const [rows] = await pool.query('SELECT * FROM axes WHERE slug = ?', [slug]);
        return rows[0] || null;
    }
}

module.exports = new AxeRepository();
