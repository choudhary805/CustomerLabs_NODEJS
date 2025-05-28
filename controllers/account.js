const db = require('../config/db');
const { generateSecretToken } = require('../utils/helpers');

exports.createAccount = (req, res) => {
  const { email, account_id, account_name, website } = req.body;
  
  if (!email || !account_id || !account_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const app_secret_token = generateSecretToken();

  db.run(
    `INSERT INTO account (email, account_id, account_name, app_secret_token, website) 
     VALUES (?, ?, ?, ?, ?)`,
    [email, account_id, account_name, app_secret_token, website],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        email,
        account_id,
        account_name,
        app_secret_token,
        website
      });
    }
  );
};

exports.getAccount = (req, res) => {
  const { account_id } = req.params;

  db.get(
    `SELECT * FROM account WHERE account_id = ?`,
    [account_id],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json(row);
    }
  );
};

exports.updateAccount = (req, res) => {
  const { account_id } = req.params;
  const { account_name, website } = req.body;

  if (!account_name) {
    return res.status(400).json({ error: 'Account name is required' });
  }

  db.run(
    `UPDATE account SET account_name = ?, website = ? WHERE account_id = ?`,
    [account_name, website, account_id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json({ message: 'Account updated successfully' });
    }
  );
};

exports.deleteAccount = (req, res) => {
  const { account_id } = req.params;

  db.run(
    `DELETE FROM account WHERE account_id = ?`,
    [account_id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json({ message: 'Account deleted successfully' });
    }
  );
};


// Add this to controllers/account.js
exports.getAccountDestinations = (req, res) => {
  const { account_id } = req.params;

  db.all(
    `SELECT * FROM destination WHERE account_id = ?`,
    [account_id],
    (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const destinations = rows.map(row => ({
        ...row,
        headers: JSON.parse(row.headers)
      }));
      res.json(destinations);
    }
  );
};