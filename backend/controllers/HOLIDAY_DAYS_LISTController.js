const db = require('../models/db');

// --- HOLIDAY_DAYS_LIST ---
exports.getHOLIDAY_DAYS_LIST = (req, res) => {
  db.query('SELECT * FROM HOLIDAY_DAYS_LIST ORDER BY DATE DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch holiday list' });
    res.json(results);
  });
};

exports.addHOLIDAY_DAYS_LIST = (req, res) => {
  const { HOLIDAY_NAME, DATE, COUNTRY, Type } = req.body;
  if (!HOLIDAY_NAME || !DATE) return res.status(400).json({ error: 'Missing required fields' });

  db.query(
    'INSERT INTO HOLIDAY_DAYS_LIST (HOLIDAY_NAME, DATE, COUNTRY, TYPE) VALUES (?, ?, ?, ?)',
    [HOLIDAY_NAME, DATE, COUNTRY, Type],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Insert failed' });
      res.status(201).json({ message: 'Holiday added', insertedId: result.insertId });
    }
  );
};

// --- SPECIAL USER HOLIDAYS ---
exports.getSpecialHoliday = (req, res) => {
  db.query('SELECT * FROM SPECIAL_USER_HOLIDAY ORDER BY DATE DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch special holidays' });
    res.json(results);
  });
};

exports.addSpecialHoliday = (req, res) => {
  const { HOLIDAY_NAME, DATE, USERID, FIRMID, STATUS = 'ACTIVE', Type, Country } = req.body;

  if (!HOLIDAY_NAME || !DATE || !USERID || !FIRMID)
    return res.status(400).json({ error: 'Missing required fields' });

  db.query(
    `INSERT INTO SPECIAL_USER_HOLIDAY (HOLIDAY_NAME, DATE, USERID, FIRMID, STATUS, TYPE, COUNTRY)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [HOLIDAY_NAME, DATE, USERID, FIRMID, STATUS, Type, Country],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Insert failed' });
      res.status(201).json({ message: 'Special holiday added', insertedId: result.insertId });
    }
  );
};
