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

export default usersRouter