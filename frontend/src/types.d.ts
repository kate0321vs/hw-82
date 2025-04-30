export interface IArtist {
    _id: string;
    name: string;
    image: string;
    information: string;
}

export interface IAlbums {
    _id: string;
    artist: IArtist;
    name: string;
    image: string;
    year: number;
    tracks: number;
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
}

export interface RegisterResponse {
    user: User;
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