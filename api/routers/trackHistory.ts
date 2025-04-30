import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {ITrackHistory} from "../types";
import mongoose from "mongoose";
import express from "express";
import auth from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
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

        console.log(req.body.track)

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
});

export default trackHistoryRouter;