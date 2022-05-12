const connection = require('../db-config');
const router = require('express').Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM actions', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving action from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
const actionId = req.params.id;
connection.query(
    'SELECT * FROM actions WHERE id = ?',
    [actionId],
    (err, results) => {
    if (err) {
        res.status(500).send('Error retrieving action from database');
    } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Action not found');
    }
    }
);
}); 

// title: eventName,
// author: organisator,
// start_date: date,
// start_hour: hour,
// type: action,
// street_number: number,
// street_name: adress,
// zip_code: zip,
// city: city,
// country: "France",
// description: description,

router.post('/', (req, res) => {
  const { title, author, start_date, start_hour, street_number, street_name, zip_code, city, type, country, description } = req.body;
  connection.query(
    'INSERT INTO actions (title, author, start_date, start_hour, street_number, street_name, zip_code, city, type, country, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, author, start_date, start_hour, street_number, street_name, zip_code, city, type, country, description],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the action');
      } else {
        const id = result.insertId;
        const createdAction = { title, author, start_date, start_hour, street_number, street_name, zip_code, city, type, country, description };
        res.status(201).json(createdAction);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const actionId = req.params.id;
  const db = connection.promise();
  let existingAction = null;
  db.query('SELECT * FROM actions WHERE id = ?', [actionId])
    .then(([results]) => {
      existingAction = results[0];
      if (!existingAction) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE actions SET ? WHERE id = ?', [req.body, actionId]);
    })
    .then(() => {
      res.status(200).json({ ...existingAction, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Action with id ${actionId} not found.`);
      else res.status(500).send('Error updating an action');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM animal WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an animal');
      } else {
        if (result.affectedRows) res.status(200).send('Action deleted!');
        else res.status(404).send('Action not found.');
      }
    }
  );
});

module.exports = router;