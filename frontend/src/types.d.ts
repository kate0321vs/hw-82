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