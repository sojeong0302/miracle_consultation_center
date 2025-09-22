const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "mydatabase.db");
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve(this); // this.lastID, this.changes
        });
    });
}
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    });
}
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
    });
}

// --- 테이블 생성(최초 1회) ---
async function init() {
    await run(`
    CREATE TABLE IF NOT EXISTS Admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      adminName TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

    await run(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickName TEXT NOT NULL,
      date TEXT NOT NULL,                 -- YYYY-MM-DD
      content TEXT NOT NULL,
      isChecked INTEGER NOT NULL DEFAULT 0,
      code TEXT UNIQUE NOT NULL,
      answer TEXT
    )
  `);
}

init().catch(console.error);

module.exports = { db, run, get, all };
