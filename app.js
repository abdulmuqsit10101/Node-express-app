const express = require('express');
const app = express();
const port = 3000;
const mv = require('./middlewares/Validator_middleware.js');
var bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitizeBody} = require('express-validator/filter');


// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

// parse application/json
app.use(bodyParser.json());
const jsonParser = bodyParser.json();


app.set('view engine', 'twig');
app.set('views', './public/views');

route = require('express').Router({strict: true});
app.use('/strict/', route);
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/flights/:From-:To', (req, res) => {
  res.send('Here are flights data. ' + 'From ' + req.params.From + ' To ' + req.params.To);
});

app.get('/flights/:From?.:To?', (req, res) => {
  res.send('Here are flights data. ' + 'From ' + req.params.From + ' To ' + req.params.To);
});

// this route /ab?cd below is showing b is optional. We can have access of the res using both `acd or abcd`.
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

// this route /ab+cd below is showing b can be repeated. We can have access of the res using all `abcd, abbcd and abbcd
// etc with increment in b's` .
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});

// this route /ab*cd below is showing any can be added between ab and cd. We can have access of the entered between
// value in res.params[0] .
app.get('/ab*cd', (req, res) => {
  console.log('req.params : ', req.params);
  res.send('ab*cd and the words typed in between and and cd are : ' + req.params[0]);
});

// this route /.*fly$/ below is showing any word can be added before fly but not after fly. e.g. dragonfly, butterfly
// etc. value in res.params[0] .
app.get(/.*fly$/, (req, res) => {
  console.log('req.params : ', req);
  res.send('/.*fly$// and the words typed in between and and cd are : ');
});

app.get('/user/:userId/book/:bookId', (req, res) => {
  const dataScript = 'User id is ' + req.params.userId + ' with book ' + req.params.bookId;
  res.send(dataScript);
});

app.get('/users', (req, res) => {
  const name = mv.name;
  console.log(name);
  res.send(`We are Users ${name}`);
});

app.get('/users/:username', mv.validator('Ali'), (req, res) => {
  res.send('Welcome Mr.Ali');
});

app.get('/engine', (req, res) => {
  res.render('index', {
    title: 'The View Engine',
    heading: 'Watch template Engine',
    description: 'Here is the explanation of the view engins part'
  });
});

app.get('/about/:a-:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  res.render('calculator', {
    title: 'Calculations',
    heading: 'Calculations',
    sum: a + b,
    sub: a - b,
    multiple: a * b
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', urlencodedParser, [
  check('username', 'Username should be an email!').trim().isEmail(),
  check('password', 'Password must not be less than 5!').trim().isLength({min: 5}),
  check('cpassword').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Confirm password should be same to password!');
    }
    return true;
  })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const user = matchedData(req);
    res.render('login', {title: 'errors', errors: errors.mapped(), user: user})
  } else {
    const user = matchedData(req);
    res.render('home', {title: 'baba', user: user});
  }
});

app.listen(port, () => console.log(`App is running on ${port}`));
