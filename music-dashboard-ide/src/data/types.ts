export interface Artist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  imageUrl: string;
  releaseYear: number;
}

export interface Track {
  id: string;
  name: string;
  artist: Artist;
  album: Album;
  duration_ms: number;
  popularity: number;
  explicit: boolean;
  track_number: number;
}
