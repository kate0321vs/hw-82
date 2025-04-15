import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        res.status(500).send(e)
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const newArtist: IArtist = {
            name: req.body.name,
            image: req.file ? 'images/' + req.file.filename : null,
            information: req.body.information,
        };

        const artist  = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
        }
        next(e);
    }
})

export default artistsRouter;