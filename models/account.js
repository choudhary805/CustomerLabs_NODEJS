const db = require('../config/db');
const { generateSecretToken } = require('../utils/helpers');

class Account {
  static async create({ email, account_id, account_name, website }) {
    const app_secret_token = generateSecretToken();
    const sql = `
      INSERT INTO account (email, account_id, account_name, app_secret_token, website)
      VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [email, account_id, account_name, app_secret_token, website],
        function(err) {
          if (err) return reject(err);
          resolve({
            id: this.lastID,
            email,
            account_id,
            account_name,
            app_secret_token,
            website
          });
        }
      );
    });
  }

  static async findByaccountId(account_id) {
    const sql = `SELECT * FROM account WHERE account_id = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [account_id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async findByToken(app_secret_token) {
    const sql = `SELECT * FROM account WHERE app_secret_token = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [app_secret_token], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async update(account_id, { account_name, website }) {
    const sql = `UPDATE account SET account_name = ?, website = ? WHERE account_id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [account_name, website, account_id], function(err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  static async delete(account_id) {
    const sql = `DELETE FROM account WHERE account_id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [account_id], function(err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Account;