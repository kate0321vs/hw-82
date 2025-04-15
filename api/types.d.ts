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