const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'craneo.db');
const JSON_DB_FILE = path.join(__dirname, 'reservations.json');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDB();
    }
});

function initDB() {
    db.serialize(() => {
        // 1. Create Reservations Table
        db.run(`CREATE TABLE IF NOT EXISTS reservations (
            id TEXT PRIMARY KEY,
            room_id INTEGER,
            room_name TEXT,
            date TEXT,
            time TEXT,
            contact TEXT,
            created_at TEXT
        )`);

        // 2. Create Users Table (for Admin)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password_hash TEXT
        )`, (err) => {
            if (!err) {
                // Check if admin exists, if not create default
                db.get("SELECT * FROM users WHERE username = ?", ["admin"], (err, row) => {
                    if (!row) {
                        const hash = bcrypt.hashSync("1234", 10); // Default password
                        db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", ["admin", hash]);
                        console.log("Admin user created with default password.");
                    }
                });
            }
        });

        // 3. Migrate from JSON if needed (One-time check)
        // We check if table is empty AND json exists
        db.get("SELECT count(*) as count FROM reservations", [], (err, row) => {
            if (row && row.count === 0 && fs.existsSync(JSON_DB_FILE)) {
                console.log("Migrating data from reservations.json...");
                try {
                    const rawData = fs.readFileSync(JSON_DB_FILE, 'utf8');
                    const reservations = JSON.parse(rawData);
                    const stmt = db.prepare("INSERT INTO reservations VALUES (?, ?, ?, ?, ?, ?, ?)");

                    reservations.forEach(r => {
                        // Assuming JSON structure matches what we expect
                        stmt.run(
                            r.id,
                            r.room.id,
                            r.room.name,
                            r.date,
                            r.time,
                            r.contact || '',
                            r.createdAt || new Date().toISOString()
                        );
                    });
                    stmt.finalize();
                    console.log(`Migrated ${reservations.length} reservations.`);
                } catch (e) {
                    console.error("Migration failed:", e);
                }
            }
        });
    });
}

module.exports = db;
