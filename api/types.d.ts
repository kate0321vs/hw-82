export interface IArtist {
    name: string;
    image: string | null;
    information: string;
}

export interface IAlbum {
    name: string;
    artist: string;
    year: string;
    image: string | null;
}

export interface ITrack {
    name: string;
    album: string;
    duration: string;
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface ITrackHistory {
    user: ObjectId;
    track: string;
    datetime: Date;
}