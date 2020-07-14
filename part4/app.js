const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blog");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/blogapp";
const blogRouter = require("./controllers/blogs");
app.use("/api/blogs", blogRouter);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(express.json());

module.exports = app;
