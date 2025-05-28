const db = require('../config/db');

exports.createDestination = (req, res) => {
  const { account_id, url, http_method, headers } = req.body;

  if (!account_id || !url || !http_method || !headers) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO destination (account_id, url, http_method, headers) 
     VALUES (?, ?, ?, ?)`,
    [account_id, url, http_method, JSON.stringify(headers)],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        account_id,
        url,
        http_method,
        headers
      });
    }
  );
};

exports.getDestination = (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM destination WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json({
        ...row,
        headers: JSON.parse(row.headers)
      });
    }
  );
};

exports.updateDestination = (req, res) => {
  const { id } = req.params;
  const { url, http_method, headers } = req.body;

  db.run(
    `UPDATE destination SET url = ?, http_method = ?, headers = ? WHERE id = ?`,
    [url, http_method, JSON.stringify(headers), id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json({ message: 'Destination updated successfully' });
    }
  );
};

exports.deleteDestination = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM destination WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json({ message: 'Destination deleted successfully' });
    }
  );
};

// exports.getAccountDestinations = (req, res) => {
//   const { account_id } = req.params;

//   db.all(
//     `SELECT * FROM destination WHERE account_id = ?`,
//     [account_id],
//     (err, rows) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       const destinations = rows.map(row => ({
//         ...row,
//         headers: JSON.parse(row.headers)
//       }));
//       res.json(destinations);
//     }
//   );
// };