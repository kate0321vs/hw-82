import {model, Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";

const trackHistorySchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        validate: [{
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: 'User not found',
        }]
    },
    track: {
        type: Types.ObjectId,
        ref: "Track",
        required: true,
        validate: [{
            validator: async (value: Types.ObjectId) => {
                const track = await Track.findById(value);
                return !!track;
            },
            message: 'Track not found',
        }]
    },
    datetime: {
        type: Date,
        required: true,
    }
})

const TrackHistory = model('TrackHistory', trackHistorySchema);
export default TrackHistory;
