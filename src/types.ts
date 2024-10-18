export interface Album {
  id: string;
  name: string;
  artistName: string;
  coverUrl: string;
  releaseDate: string;
  songs: string[]; // Array of song IDs
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  songs: string[]; // Array of song IDs
}

export interface Song {
  id: string;
  title: string;
  type: 'album' | 'single';
  albumId?: string;
  artistId: string;
  duration: string;
  releaseDate: string;
  genre: string;
  ratings: { userId: string; rating: number }[];
  albumCoverUrl: string;
  artistName: string;
}

export interface SongFormData {
  title: string;
  type: 'album' | 'single';
  albumName?: string;
  artistName: string;
  duration: string;
  albumCoverUrl: string;
  artistImageUrl: string;
  releaseDate: string;
  genre: string;
  albumId?: string;
  artistId?: string;
}

export const genres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical', 'Reggae', 'Folk',
  'Blues', 'Metal', 'Punk', 'Indie', 'Alternative', 'Soul', 'Funk', 'Disco', 'Techno', 'House',
  'Ambient', 'Trap', 'Grunge', 'Gospel', 'Latin', 'World', 'Ska', 'Dubstep', 'Experimental'
];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}