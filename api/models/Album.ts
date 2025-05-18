import mongoose, {model} from "mongoose";
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
        type: Number,
        required: true,
    },
    image: String,
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const Album = model("Album", AlbumSchema);
export default Album;