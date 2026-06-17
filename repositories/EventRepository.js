const db = require('../config/db');

class EventRepository {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM events ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, description, event_date, day, month, time, location, type, url, image_url } = data;
        const [result] = await db.execute(
            'INSERT INTO events (title, description, event_date, day, month, time, location, type, url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title || '', description || '', event_date || '', day || '', month || '', time || '', location || '', type || '', url || '', image_url || '']
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { title, description, event_date, day, month, time, location, type, url, image_url } = data;
        await db.execute(
            'UPDATE events SET title=?, description=?, event_date=?, day=?, month=?, time=?, location=?, type=?, url=?, image_url=? WHERE id=?',
            [title, description, event_date, day, month, time, location, type, url, image_url, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM events WHERE id = ?', [id]);
    }
}

module.exports = EventRepository;
