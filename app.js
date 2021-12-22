const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const api = require('./src/api');

app.use(bodyParser.json());
app.use('/api/v1', api);

app.listen(port);