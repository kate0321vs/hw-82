import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IAlbum} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        const {artist} = req.query;
        let albums
        if (artist) {
            albums = await Album.find({artist: artist});
        } else {
            albums = await Album.find();
        }
        res.send(albums);
    } catch (e) {
        res.status(500).send(e)
    }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const newAlbum: IAlbum = {
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year,
            image: req.file ? 'images/' + req.file.filename : null,
        };

        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
        }
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res) => {
    const album = await Album.findById(req.params.id).populate('artist');
    if(!album) {
        res.sendStatus(404);
    }
    res.send(album);
})

export default albumsRouter;