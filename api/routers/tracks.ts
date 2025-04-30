import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {ITrack} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        const {id_album} = req.query;
        const {artist} = req.query;

        let tracks;

        if (id_album) {
            tracks = await Track.find({album: id_album}).populate({
                path: 'album',
                populate: {
                    path: 'artist',
                    model: 'Artist'
                }
            }).sort({ number: +1 });
        } else if (artist) {
            const allTracks = await Track.find().populate({
                path: 'album',
                populate: {
                    path: 'artist',
                    model: 'Artist',
                    select: 'name',
                }
            });
             tracks = allTracks.filter(track => {
                 const album = track.album as any;
                 return album.artist.toString() === artist
             })
        } else {
            tracks = await Track.find().sort({ number: +1 });
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
            number: req.body.number,
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