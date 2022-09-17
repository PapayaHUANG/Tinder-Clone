const PORT = 8000;

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/tinderRoutes');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}...`));
