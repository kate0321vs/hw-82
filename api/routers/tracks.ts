import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {ITrack} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        const {album} = req.query;
        const {artist} = req.query;

        let tracks;

        if (album) {
            tracks = await Track.find({album: album});
        } else if (artist) {
             const allTracks = await Track.find().populate('album', 'artist');
             tracks = allTracks.filter(track => {
                 const album = track.album as { artist: mongoose.Types.ObjectId };
                 return album.artist.toString() === artist
             })
        } else {
            tracks = await Track.find()
        }
        res.send(tracks);
    } catch (err) {
        res.status(500).send(err);
    }
});

tracksRouter.post('/', async (req, res, next) => {
    try {
        const newTrack: ITrack = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        }
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
        }
        next(e);
    }
});

export default tracksRouter