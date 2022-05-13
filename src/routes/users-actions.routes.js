const connection = require('../db-config');
const router = require('express').Router();
const cors = require('cors');
const session = require('express-session');


router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  
  router.use(session({
    secret: "secret",
    resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    sameSite: "lax",
    secure: false
  }
  }));

  router.use(function (req, res, next) {
    req.session.test = "test";
    next();
  });

router.get('/', (req, res) => {
    connection.query('SELECT * FROM users_actions', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving actions from database');
      } else {
        res.json(result);
      }
    });
  });

// router.get('/:id', (req, res) => {
// const actionId = req.params.id;
// connection.query(
//     'SELECT * FROM actions WHERE id = ?',
//     [actionId],
//     (err, results) => {
//     if (err) {
//         res.status(500).send('Error retrieving action from database');
//     } else {
//         if (results.length) res.json(results[0]);
//         else res.status(404).send('Action not found');
//     }
//     }
// );
// }); 

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
  const { user_id, action_id } = req.body;
  connection.query(
    'INSERT INTO actions (`user_id`, `action_id`) VALUES (?, ?)',
    [user_id, action_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the sign up for action');
      } else {
        const id = result.insertId;
        const createdJoin = { user_id, action_id };
        res.status(201).json(createdJoin);
      }
    }
  );
});

// router.put('/:id', (req, res) => {
//   const actionId = req.params.id;
//   const db = connection.promise();
//   let existingAction = null;
//   db.query('SELECT * FROM actions WHERE id = ?', [actionId])
//     .then(([results]) => {
//       existingAction = results[0];
//       if (!existingAction) return Promise.reject('RECORD_NOT_FOUND');
//       return db.query('UPDATE actions SET ? WHERE id = ?', [req.body, actionId]);
//     })
//     .then(() => {
//       res.status(200).json({ ...existingAction, ...req.body });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err === 'RECORD_NOT_FOUND')
//         res.status(404).send(`Action with id ${actionId} not found.`);
//       else res.status(500).send('Error updating an action');
//     });
// });

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM users_actions WHERE user_id = ? AND action_id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error cancelling action join');
      } else {
        if (result.affectedRows) res.status(200).send('Join deleted!');
        else res.status(404).send('Join not found.');
      }
    }
  );
});

module.exports = router;