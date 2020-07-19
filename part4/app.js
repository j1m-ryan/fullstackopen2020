const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const loginRouter = require("./controllers/login")
const middleware = require('./utils/middleware');
app.use(middleware.logging);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use('/api/blogs/', blogRouter);
app.use('/api/login/', loginRouter);

module.exports = app;
