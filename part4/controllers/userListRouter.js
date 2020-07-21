const userListRouter = require("express").Router()
const User = require("../models/user")
userListRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogList")
    res.send(users)
})

module.exports = userListRouter