import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IAlbum} from "../types";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        const {id_artist} = req.query;
        let albums
        if (id_artist) {
            albums = await Album.find({artist: id_artist}).populate('artist', 'name').sort({year: -1});
        } else {
            albums = await Album.find().populate('artist', 'name').sort({year: -1});
        }

        const albumsWithTracks = await Promise.all(
            albums.map(async (album) => {
                const tracks = await Track.find({ album: album._id });
                return {
                ...album.toJSON(),
                tracks: tracks.length
                };
            })
        );
        res.send(albumsWithTracks);
    } catch (e) {
        res.status(500).send(e);
    }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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
            res.status(400).send(e.message);
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
});

albumsRouter.delete('/:id', auth, permit('admin'),async (req, res) => {
   try {
       const album = await Album.findOne({_id: req.params.id})
       if (!album) {
           res.status(404).send({error: "Album not found"});
           return;
       }
       await album.deleteOne();
       res.send({message: "Album deleted"})
   } catch (e) {
       res.status(500).send(e);
   }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'),async (req, res) => {
    const album = await Album.findOne({_id: req.params.id})
    if (!album) {
        res.status(404).send({error: "Album not found"});
        return;
    }
    album.isPublished = !album.isPublished;
    await album.save();
    res.send({ message: "Album publication status toggled"});
});

export default albumsRouter;