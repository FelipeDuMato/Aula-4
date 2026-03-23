const portifolioRoute = require('./routes/portifolioRoute');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', portifolioRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});