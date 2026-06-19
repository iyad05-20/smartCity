const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '1234',
            database: process.env.DB_NAME || 'smartcity'
        });

        console.log("Starting migration: Mapping old categories to axe_id...");

        const mapping = {
            "Énergie & Environnement": 3, // Énergie et environnement intelligents
            "Connectivité & IoT": 10,     // Technologies et Données (Transversal)
            "Mobilité Urbaine": 2,        // Mobilité intelligente
            "Gouvernance & Sécurité": 1   // Gouvernance intelligente (ambiguous, could be 8 too)
        };

        const [projects] = await connection.query("SELECT id, title, axe, axe_id FROM projects");

        let updated = 0;
        for (const p of projects) {
            if (!p.axe_id && p.axe) {
                const mappedId = mapping[p.axe];
                if (mappedId) {
                    await connection.query("UPDATE projects SET axe_id = ? WHERE id = ?", [mappedId, p.id]);
                    updated++;
                    if (p.axe === "Gouvernance & Sécurité") {
                        console.log(`[ATTENTION] Project '${p.title}' (id: ${p.id}) was mapped from '${p.axe}' to axe_id ${mappedId} (Gouvernance). It could also belong to 'Sûreté'. Please verify in admin.`);
                    }
                } else {
                    console.log(`[WARNING] No mapping found for project '${p.title}' with axe '${p.axe}'`);
                }
            }
        }

        console.log(`Migration completed successfully. Updated ${updated} projects.`);
        await connection.end();
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

runMigration();
