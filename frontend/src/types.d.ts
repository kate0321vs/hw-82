export interface IArtist {
    _id: string;
    name: string;
    image: string;
    information: string;
    isPublished: boolean;
}

export interface IMutationArtist {
    name: string;
    image: File | null;
    information: string;
}

export interface IAlbums {
    _id: string;
    artist: IArtist;
    name: string;
    image: string;
    year: number;
    tracks: number;
    isPublished: boolean;
}

export interface IAlbumMutation {
    artist: string;
    name: string;
    image: File | null;
    year: string;
}

export interface ITrack {
    _id: string;
    name: string;
    album: {
        _id: string;
        name: string;
        artist: {
            _id: string;
            name: string;
        }
    };
    duration: string;
    number: number
    isPublished: boolean;
}

export interface ITrackMutation {
    name: string;
    album: string;
    duration: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface ITrackHistory {
    _id: string;
    user: string;
    track: ITrack;
    artist: IArtist;
    datetime: Date;
}