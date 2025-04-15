import express from "express";
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";


const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use('/artists', artistsRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect()
    })
};

run().catch((err) => console.error(err));