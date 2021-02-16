const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const auth = require('./controllers/authorization');
const rawdata = require('./controllers/rawdatahandler');

//will save reuseable data component
var rawDataComponent = {
	previousHit: new Date(),
	lastCurrency: '',
};
//data inisialization
rawdata.updateCurrencyConversion(rawDataComponent);

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
//processing data
app.get('/rawdata', auth.requireAuth, (req, res) =>
	rawdata.getDataHandler(req, res, rawDataComponent),
);
//validate token
app.get('/validatetoken', (req, res) => auth.validateToken(req, res));
app.listen(process.env.PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
