export interface IArtist {
    name: string;
    image: string | null;
    information: string;
    user: ObjectId;
}

export interface IAlbum {
    name: string;
    artist: string;
    year: number;
    image: string | null;
    user: ObjectId;
}

export interface ITrack {
    name: string;
    album: string;
    duration: string;
    number: number;
    user: ObjectId;
}

export interface IUser {
    username: string;
    password: string;
    role: string;
    token: string;
    displayName: string;
    avatar: string | null;
    googleID?: string;
}

export interface ITrackHistory {
    user: ObjectId;
    track: string;
    artist: ObjectId;
    datetime: Date;
}