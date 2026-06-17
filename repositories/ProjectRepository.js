const db = require('../config/db');

class ProjectRepository {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, description, axe, partner, status, url, image_url } = data;
        const [result] = await db.execute(
            'INSERT INTO projects (title, description, axe, partner, status, url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title || '', description || '', axe || '', partner || '', status || 'En cours', url || '', image_url || '']
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { title, description, axe, partner, status, url, image_url } = data;
        await db.execute(
            'UPDATE projects SET title=?, description=?, axe=?, partner=?, status=?, url=?, image_url=? WHERE id=?',
            [title, description, axe, partner, status, url, image_url, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    }
}

module.exports = ProjectRepository;
