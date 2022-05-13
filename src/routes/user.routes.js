const connection = require('../db-config');
const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const cors = require('cors');

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
  connection.query('SELECT * FROM user_profiles', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving users from database');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
console.log(req.session)
const userId = req.params.id;
connection.query(
  'SELECT * FROM user_profiles WHERE id = ?',
  [userId],
  (err, results) => {
  if (err) {
      res.status(500).send('Error retrieving user from database');
  } else {
      if (results.length) res.json(results[0]);
      else res.status(404).send('User not found');
  }
  }
);
}); 

// const data = {
//   first_name: firstname,
//   last_name: lastname,
//   email: email,
//   password: password,
//   list_imageUrl: picture,
//   street_number: streetNumber,
//   street_name: streetName,
//   zip_code: zipCode,
//   city: city,
//   country: "France"
// };

router.post('/', (req, res) => {
const { first_name, last_name, email, password, list_imageUrl, street_number, street_name, zip_code, city, country } = req.body;
console.log(req.body)
connection.query(
  'INSERT INTO `user_profiles` (`first_name`, `last_name`, `email`, `password`, `list_imageUrl`, `street_number`, `street_name`, `zip_code`, `city`, `country`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [first_name, last_name, email, password, list_imageUrl, street_number, street_name, zip_code, city, country],
  (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving user');
    } else {
      const id = result.insertId;
      req.session.authId = id
      const createdUser = { id, first_name, last_name, email, password, list_imageUrl, street_number, street_name, zip_code, city, country };
      res.status(201).json(createdUser);
    }
  }
);
});

router.put('/:id', (req, res) => {
const userId = req.params.id;
const db = connection.promise();
let existingUser = null;
db.query('SELECT * FROM `user_profiles` WHERE id = ?', [userId])
  .then(([results]) => {
    existingUser = results[0];
    if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
    return db.query('UPDATE `user_profiles` SET ? WHERE id = ?', [req.body, userId]);
  })
  .then(() => {
    res.status(200).json({ ...existingUser, ...req.body });
  })
  .catch((err) => {
    console.error(err);
    if (err === 'RECORD_NOT_FOUND')
      res.status(404).send(`User with id ${userId} not found.`);
    else res.status(500).send('Error updating user');
  });
});

router.delete('/:id', (req, res) => {
connection.query(
  'DELETE FROM `user_profiles` WHERE id = ?',
  [req.params.id],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting user');
    } else {
      if (result.affectedRows) res.status(200).send('Userdeleted!');
      else res.status(404).send('User not found.');
    }
  }
);
});

router.post('/heroes', function(request, response) {
	// Capture the input fields
	let heroes = request.body;
	console.log(heroes);
    console.log(request.body);
    heroes.map((user) => 
	// Ensure the input fields exists and are not empty
		connection.query('SELECT * FROM `user_profiles` WHERE id = ?', 
    [user.user_id], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
        response.send(results)
			} else {
				response.send('reject');
			}			
			response.end();
})
    );
});



module.exports = router;