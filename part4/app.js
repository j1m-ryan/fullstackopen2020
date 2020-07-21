const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userListRouter = require('./controllers/userListRouter');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/usersRouter');
const loginRouter = require('./controllers/loginRouter');
app.use(middleware.logging);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use('/api/blogs/', blogRouter);
app.use('/api/create/', usersRouter);
app.use('/api/login/', loginRouter);

app.use('/api/users/', userListRouter);

module.exports = app;
