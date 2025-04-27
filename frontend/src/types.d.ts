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