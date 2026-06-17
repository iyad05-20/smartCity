const db = require('../config/db');

class PublicationRepository {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM publications ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM publications WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, description, authors, year, type, url_pdf } = data;
        const [result] = await db.execute(
            'INSERT INTO publications (title, description, authors, year, type, url_pdf) VALUES (?, ?, ?, ?, ?, ?)',
            [title || '', description || '', authors || '', year || '', type || '', url_pdf || '']
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { title, description, authors, year, type, url_pdf } = data;
        await db.execute(
            'UPDATE publications SET title=?, description=?, authors=?, year=?, type=?, url_pdf=? WHERE id=?',
            [title, description, authors, year, type, url_pdf, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM publications WHERE id = ?', [id]);
    }
}

module.exports = PublicationRepository;
