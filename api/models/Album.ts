import mongoose from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "Artist",
        required: true,
        validate: [{
            validator: async (value:  mongoose.Types.ObjectId) => {
                const artist = await Artist.findById(value);
                return !!artist;
            },
            message: "Artist not found",
        }]
    },
    year: {
        type: String,
        required: true,
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;