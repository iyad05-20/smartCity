const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const loadData = (filename) => {
    try {
        const filePath = path.join(__dirname, 'models', filename);
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(`Error loading ${filename}:`, err.message);
        return [];
    }
};

async function initDB() {
    try {
        // Connect without database selected to create it if it doesn't exist
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '1234'
        });

        const dbName = process.env.DB_NAME || 'smartcity';
        console.log(`Creating database ${dbName} if not exists...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        
        await connection.query(`USE \`${dbName}\``);

        // CREATE TABLES
        console.log("Creating tables...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                axe VARCHAR(100),
                partner VARCHAR(255),
                status VARCHAR(50) DEFAULT 'En cours',
                url VARCHAR(255),
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                event_date VARCHAR(50),
                day VARCHAR(10),
                month VARCHAR(20),
                time VARCHAR(50),
                location VARCHAR(255),
                type VARCHAR(50),
                url VARCHAR(255),
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS publications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                authors VARCHAR(255),
                year VARCHAR(10),
                type VARCHAR(100),
                url_pdf VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS formations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                duration VARCHAR(100),
                level VARCHAR(100),
                type VARCHAR(100),
                url VARCHAR(255),
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // SEED DATA from JSON
        console.log("Seeding data from JSON files...");
        const projects = loadData('projects.json');
        for (const p of projects) {
            await connection.execute(
                'INSERT INTO projects (title, description, axe, partner, status) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = ?)',
                [p.title || '', p.description || '', p.axe || '', p.partner || '', p.status || 'En cours', p.title || '']
            );
        }

        const events = loadData('events.json');
        for (const e of events) {
            await connection.execute(
                'INSERT INTO events (title, description, event_date, day, month, time, location, type) SELECT ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = ?)',
                [e.title || '', e.description || '', e.date || '', e.day || '', e.month || '', e.time || '', e.location || '', e.type || '', e.title || '']
            );
        }

        const publications = loadData('publications.json');
        for (const p of publications) {
            await connection.execute(
                'INSERT INTO publications (title, description, authors, year, type) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title = ?)',
                [p.title || '', p.description || '', p.authors || '', p.year || '', p.type || '', p.title || '']
            );
        }

        const formations = loadData('formations.json');
        for (const f of formations) {
            await connection.execute(
                'INSERT INTO formations (title, description, duration, level, type) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM formations WHERE title = ?)',
                [f.title || '', f.description || '', f.duration || '', f.level || '', f.type || '', f.title || '']
            );
        }

        console.log("Database initialization completed successfully!");
        await connection.end();
    } catch (err) {
        console.error("Database initialization failed:", err);
        process.exit(1);
    }
}

initDB();
