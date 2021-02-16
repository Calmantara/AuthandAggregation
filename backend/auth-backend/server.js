const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const generatepassword = require('./controllers/generatepassword');
const signin = require('./controllers/signin');
const auth = require('./controllers/authorization');

//Database Setup
const db = knex({
	client: 'pg',
	connection: process.env.POSTGRES_URI,
	pool: { min: 0, max: 7 },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//test connection
app.get('/connectiontest', (req, res) => {
	console.log(`You are connected on port ${process.env.PORT}`);
	res.json('You are connected!');
});
//generate password
app.post('/generatepassword', (req, res) =>
	generatepassword.generatepasswordHandle(req, res, db),
);
//sign in
app.post('/signin', signin.signInAuth(db));
//validate token
app.get('/validatetoken', (req, res) => auth.requireAuth(req, res));
app.listen(process.env.PORT, () => {
	console.log('app is running on port 5000');
});
