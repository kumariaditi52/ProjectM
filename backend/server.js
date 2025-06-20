const express = require('express');
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const analyticsRoute = require('./routes/analytics');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/analytics', analyticsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
