const db = require('../config/db');

class FormationRepository {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM formations ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM formations WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, description, duration, level, type, url, image_url } = data;
        const [result] = await db.execute(
            'INSERT INTO formations (title, description, duration, level, type, url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title || '', description || '', duration || '', level || '', type || '', url || '', image_url || '']
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { title, description, duration, level, type, url, image_url } = data;
        await db.execute(
            'UPDATE formations SET title=?, description=?, duration=?, level=?, type=?, url=?, image_url=? WHERE id=?',
            [title, description, duration, level, type, url, image_url, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM formations WHERE id = ?', [id]);
    }
}

module.exports = FormationRepository;
