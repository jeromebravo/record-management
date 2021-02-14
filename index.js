require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

// connect to database
db();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/record', require('./routes/record'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));