const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();

/*Toda requisição que acontecer no nossa aplicação, ela vai cair
dentro do nosso router*/

app.use(express.json());
app.use(cors());
app.use(router);



module.exports = app