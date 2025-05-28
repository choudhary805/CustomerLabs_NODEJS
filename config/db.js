const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to SQLite database');
});

// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON;');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      account_id TEXT NOT NULL UNIQUE,
      account_name TEXT NOT NULL,
      app_secret_token TEXT NOT NULL,
      website TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS destination (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id TEXT NOT NULL,
      url TEXT NOT NULL,
      http_method TEXT NOT NULL,
      headers TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;