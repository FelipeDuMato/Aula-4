const musicaRoute = require('./routes/musicaRoute.js');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', musicaRoute);

app.use('/images', express.static('images'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});