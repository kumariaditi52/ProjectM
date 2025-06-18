const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

// Middleware
app.use(cors());
app.use(express.json());

// API
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
