const db = require('../config/db');

class Destination {
  static async create({ account_id, url, http_method, headers }) {
    const sql = `
      INSERT INTO destination (account_id, url, http_method, headers)
      VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [account_id, url, http_method, JSON.stringify(headers)],
        function(err) {
          if (err) return reject(err);
          resolve({
            id: this.lastID,
            account_id,
            url,
            http_method,
            headers
          });
        }
      );
    });
  }

  static async findById(id) {
    const sql = `SELECT * FROM destination WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) return reject(err);
        if (row) {
          row.headers = JSON.parse(row.headers);
        }
        resolve(row);
      });
    });
  }

  static async findByAccountId(account_id) {
    const sql = `SELECT * FROM destination WHERE account_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [account_id], (err, rows) => {
        if (err) return reject(err);
        const destinations = rows.map(row => ({
          ...row,
          headers: JSON.parse(row.headers)
        }));
        resolve(destinations);
      });
    });
  }

  static async update(id, { url, http_method, headers }) {
    const sql = `
      UPDATE destination 
      SET url = ?, http_method = ?, headers = ?
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [url, http_method, JSON.stringify(headers), id],
        function(err) {
          if (err) return reject(err);
          resolve({ changes: this.changes });
        }
      );
    });
  }

  static async delete(id) {
    const sql = `DELETE FROM destination WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [id], function(err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Destination;