import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {ITrack} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

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

tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const tracks = await Track.find({album: req.body.album});
        const user = (req as RequestWithUser).user;
        const newTrack: ITrack = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            number: tracks.length + 1,
            user: user._id
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

tracksRouter.delete('/:id', auth, permit('admin'),async (req, res) => {
    try {
        const track = await Track.findOne({_id: req.params.id})
        if (!track) {
            res.status(404).send({error: "Track not found"});
            return;
        }
        await track.deleteOne();
        res.send({message: "Track deleted"})
    } catch (e) {
        res.status(500).send(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'),async (req, res) => {
    const track = await Track.findOne({_id: req.params.id})
    if (!track) {
        res.status(404).send({error: "Track not found"});
        return;
    }
    track.isPublished = !track.isPublished;
    await track.save();
    res.send({ message: "Track publication status toggled"});
});

export default tracksRouter