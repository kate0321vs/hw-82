import express from "express";
import mongoose from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    await newUser.save();
    res.send(newUser)
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e)
        }
        next(e)
    }
});

usersRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).send({error: "Wrong username or password [username]"});
            return;
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            res.status(404).send({error: "Wrong username or password [password]"});
        }

        user.generateToken();
        await user.save();
        res.send({message: "Username and password correct", user});

    } catch (e) {
        next(e);
    }
})

export default usersRouter