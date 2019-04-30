require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/queries.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})

app.get('/api/:stockId', db.getStockByTicker);

app.get('/:stockId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/dist/index.html'));
})
