const express = require('express');
const exphbs = require('express-handlebars');
const avocados = require('./avo-shopper');
const avocado = require('./avo-shopper')
const app = express();


const pg = require("pg");
const Pool = pg.Pool;



// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/avocado',
    ssl: {rejectUnauthorized: false}
});

let counter = 0;
const avoInstance = avocados(pool)

app.get('/', function (req, res) {
	res.render('index', {
		counter
	});
});
app.post('/shoprite', async function(req, res){
        try {
            res.render('shoprite', { allDeals: await avoInstance.dealsForShop()})
        } catch (error) {
            console.log(error)
        }
})
app.post('/pnp', async function(req, res){
	try {
		res.render('pnp', { allDeals: await avoInstance.dealsForShop()})
	} catch (error) {
		console.log(error)
	}
})
app.post('/spar', async function(req, res){
	try {
		res.render('spar', { allDeals: await avoInstance.dealsForShop()})
	} catch (error) {
		console.log(error)
	}
})
app.post('/foodLovers', async function(req, res){
	try {
		res.render('foodLovers', { allDeals: await avoInstance.dealsForShop()})
	} catch (error) {
		console.log(error)
	}
})
app.post('/woolies', async function(req, res){
	try {
		res.render('woolies', { allDeals: await avoInstance.dealsForShop()})
	} catch (error) {
		console.log(error)
	}
})

// start  the server and start listening for HTTP request on the PORT number specified...
const PORT = process.env.PORT || 3019;
app.listen(PORT, function () {
	console.log(`AvoApp started on port ${PORT}`)
})