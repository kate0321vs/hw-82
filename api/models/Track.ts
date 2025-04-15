import mongoose from "mongoose";
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: [{
            validator: async (value:  mongoose.Types.ObjectId) => {
                const album = await Album.findById(value);
                return !!album;
            },
            message: "Album not found",
        }]
    },
    duration: {
        type: String,
        required: true,
    },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;