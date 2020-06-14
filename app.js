const express = require('express');
const app = express();
const port = 3000;

route = require('express').Router({strict: true});
app.use('/strict/', route);
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/user/:userId/book/:bookId', (req, res) => {
  const dataScript = 'User id is ' + req.params.userId + ' with book '
    + req.params.bookId;
  res.send(dataScript);
});

app.listen(port, () => console.log(`App is running on ${port}`));
