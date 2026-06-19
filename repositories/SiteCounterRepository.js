const pool = require('../config/db');

class SiteCounterRepository {
    async getCounter(name) {
        const [rows] = await pool.query('SELECT valeur FROM site_counters WHERE nom_compteur = ?', [name]);
        return rows[0] ? rows[0].valeur : 0;
    }

    async incrementCounter(name) {
        await pool.query('UPDATE site_counters SET valeur = valeur + 1 WHERE nom_compteur = ?', [name]);
        return await this.getCounter(name);
    }
}

module.exports = new SiteCounterRepository();
