import mongoose from "mongoose";
import config from "./config";
import Album from "./models/Album";
import Track from "./models/Track";
import Artist from "./models/Artist";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
       await db.dropCollection("artists");
       await db.dropCollection("albums");
       await db.dropCollection("tracks");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    const [Moby, Monolink, LanaDelRey] = await Artist.create({
        name: "Moby",
        image: "fixtures/moby.jpeg",
        information: "Moby (born Richard Melville Hall on September 11, 1965) is an American musician, producer, and DJ known for his pioneering work in electronic music. He gained international fame with his 1999 album \"Play\", which blended electronic beats with gospel and blues samples. The album became a massive success and was one of the first to license all its tracks for films, commercials, and TV.",
        isPublished: true,
    }, {
        name: "Monolink",
        image: "fixtures/Monolink.jpeg",
        information: "Monolink (real name Steffen Linck) is a German singer, songwriter, and electronic music producer known for blending live vocals, guitar, and melodic techno. He combines elements of folk, electronica, and deep house, creating emotional, atmospheric tracks that are both danceable and introspective.",
        isPublished: true,
    }, {
        name: "Lana Del Rey",
        image: "fixtures/lana.jpg",
        information: "American singer, songwriter, and poet known for her cinematic, melancholic style and nostalgic lyrics that often explore themes of love, glamour, tragedy, and Americana.",
        isPublished: false,
    });

    const [Album1, Album2, Album3, Album4, Album5] = await Album.create({
        name: "Play",
        artist: Moby,
        year: 1999,
        image: "fixtures/Moby_play.jpeg",
        isPublished: true,
    }, {
        name: "18",
        artist: Moby,
        year: 2002,
        image: "fixtures/Moby18.jpg",
        isPublished: true,
        }, {
        name: "Amniotic",
        artist: Monolink,
        year: 2018,
        image: "fixtures/Monolink_Amniotic.jpeg",
        isPublished: true,
    }, {
        name: "Under Darkening Skies",
        artist: Monolink,
        year: 2021,
        image: "fixtures/Monolink_darkeningSkies.jpeg",
        isPublished: true,
    }, {
        name: "Born to Die",
        artist: LanaDelRey,
        year: 2012,
        image: "fixtures/album5.jpg",
        isPublished: false,
    });

    await Track.create({
        name: "Honey",
        album: Album1,
        duration: "3:31",
        number: 1,
        isPublished: true,
    }, {
        name: "Find My Baby",
        album: Album1,
        duration: "3:59",
        number: 2,
    }, {
        name: "Porcelain",
        album: Album1,
        duration: "4:05",
        number: 3,
        isPublished: true,
    }, {
        name: "Why Does My Heart Feel So Bad?",
        album: Album1,
        duration: "4:29",
        number: 4,
        isPublished: true,
    }, {
        name: "South Side",
        album: Album1,
        duration: "3:50",
        number: 5,
        isPublished: true,
    }, {
        name: "We Are All Made Of Stars",
        album: Album2,
        duration: "4:33",
        number: 1,
        isPublished: true,
    }, {
        name: "In This World»",
        album: Album2,
        duration: "4:02",
        number: 2,
        isPublished: true,
    }, {
        name: "In My Heart",
        album: Album2,
        duration: "4:36",
        number: 3,
        isPublished: true,
    }, {
        name: "Great Escape",
        album: Album2,
        duration: "2:08",
        number: 4,
        isPublished: true,
    }, {
        name: "Signs Of Love",
        album: Album2,
        duration: "4:26",
        number: 5,
        isPublished: true,
    }, {
        name: "Amniotic",
        album: Album3,
        duration: "7:54",
        number: 1,
        isPublished: true,
    }, {
        name: "Black Day",
        album: Album3,
        duration: " 5:46",
        number: 2,
        isPublished: true,
    }, {
        name: "Sirens",
        album: Album3,
        duration: "6:24",
        number: 3,
        isPublished: true,
    }, {
        name: "Rearrange My Mind",
        album: Album3,
        duration: "05:29",
        number: 4,
        isPublished: true,
    }, {
        name: "Frozen",
        album: Album3,
        duration: "7:50",
        number: 5,
        isPublished: true,
    }, {
        name: "Laura",
        album: Album4,
        duration: "7:22",
        number: 1,
        isPublished: true,
    }, {
        name: "The Prey",
        album: Album4,
        duration: "4:14",
        number: 2,
        isPublished: true,
    }, {
        name: "We Don’t Sleep",
        album: Album4,
        duration: "5:00",
        number: 3,
        isPublished: true,
    }, {
        name: "Harlem River",
        album: Album4,
        duration: "3:38",
        number: 4,
        isPublished: true,
    }, {
        name: "Into The Glow",
        album: Album4,
        duration: "4:03",
        number: 5,
        isPublished: true,
    }, {
        name: "Born to Die",
        album: Album5,
        duration: "4:46",
        number: 1,
        isPublished: false,
    }, {
        name: "Off to the Races",
        album: Album5,
        duration: "5:00",
        number: 2,
        isPublished: false,
    }, {
        name: "Video Games",
        album: Album5,
        duration: "4:42",
        number: 3,
        isPublished: false,
    });

    await db.close()
};

run().catch(console.error);