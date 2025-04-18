import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {ITrackHistory} from "../types";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });
    newUser.generateToken();
    await newUser.save();
    res.send(newUser)
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e)
            return;
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
});

usersRouter.post('/track_history', async (req, res, next) => {
   try {
       const token = req.get("Authorization");
       if (!token) {
           res.status(401).send({error: "No token provided"});
           return;
       }
       const user = await User.findOne({token});
       if (!user) {
           res.status(401).send({error: "Wrong token"});
           return;
       }

       const trackHistory = new TrackHistory<ITrackHistory>({
           user: user._id,
           track: req.body.track,
           datetime: new Date(),
       });

       await trackHistory.save();
       res.send(trackHistory);

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           res.status(400).send(e);
           return
       }
       next(e)
   }
})

export default usersRouter