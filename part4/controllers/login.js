const loginRouter = require("express").Router()
require("express-async-errors");
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const { request } = require("../app");
loginRouter.use(jsonParser);

loginRouter.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

loginRouter.post("/", async (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        password: passwordHash,
        name: body.name
    })

    const savedUser = await newUser.save()
    res.send({ success: `sent ${body.name}'s login details` })
})

module.exports = loginRouter