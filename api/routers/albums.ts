import express from "express";
import Album from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        const {id_artist} = req.query;
        let albums
        if (id_artist) {
            albums = await Album.find({artist: id_artist});
        } else {
            albums = await Album.find();
        }
        res.send(albums);
    } catch (e) {
        res.status(500).send(e)
    }
});

export default albumsRouter;