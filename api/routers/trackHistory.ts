import TrackHistory from "../models/TrackHistory";
import {ITrackHistory} from "../types";
import mongoose from "mongoose";
import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Track from "../models/Track";
import Album from "../models/Album";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    const trackHistory = await TrackHistory.find({ user: user._id }).sort({ datetime: -1 }).populate('track').populate('artist');
    res.send(trackHistory);
});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const track = await Track.findById(req.body.track);
        if (!track) {
            res.status(404).json({ error: 'Track not found' });
            return;
        }

        const album = await Album.findById(track.album);
        if (!album) {
            res.status(404).json({ error: 'Album not found' });
            return;
        }

        const trackHistory = new TrackHistory<ITrackHistory>({
            user: user._id,
            track: req.body.track,
            artist: album.artist,
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