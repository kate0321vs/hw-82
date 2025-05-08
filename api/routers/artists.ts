import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        res.status(500).send(e)
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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
            res.status(400).send(e.message);
        }
        next(e);
    }
});

artistsRouter.delete('/:id', auth, permit('admin'),async (req, res) => {
    try {
        const artist = await Artist.findOne({_id: req.params.id})
        if (!artist) {
            res.status(404).send({error: "Artist not found"});
            return;
        }
        await artist.deleteOne();
        res.send({message: "Artist deleted"})
    } catch (e) {
        res.status(500).send(e);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'),async (req, res) => {
    const artist = await Artist.findOne({_id: req.params.id})
    if (!artist) {
        res.status(404).send({error: "Artist not found"});
        return;
    }
    artist.isPublished = !req.body.isPublished;
    await artist.save();
    res.send({ message: "Artist publication status toggled"});
});


export default artistsRouter;