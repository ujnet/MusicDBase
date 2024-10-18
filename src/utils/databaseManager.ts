import { Song, Album, Artist, SongFormData } from '../types';

export const clearDatabase = () => {
  localStorage.removeItem('songs');
  localStorage.removeItem('albums');
  localStorage.removeItem('artists');
};

export const addSong = (songData: SongFormData, songs: Song[], albums: Album[], artists: Artist[]): [Song[], Album[], Artist[]] => {
  const newSong: Song = {
    id: Date.now().toString(),
    title: songData.title,
    type: songData.type,
    albumId: songData.type === 'album' ? songData.albumId || Date.now().toString() : undefined,
    artistId: songData.artistId || Date.now().toString(),
    duration: songData.duration,
    releaseDate: songData.releaseDate,
    genre: songData.genre,
    ratings: [],
    albumCoverUrl: songData.albumCoverUrl,
    artistName: songData.artistName,
  };

  let updatedAlbums = [...albums];
  let updatedArtists = [...artists];

  if (songData.type === 'album') {
    const existingAlbum = albums.find(album => album.id === songData.albumId);
    if (existingAlbum) {
      updatedAlbums = updatedAlbums.map(album =>
        album.id === existingAlbum.id
          ? { ...album, songs: [...album.songs, newSong.id] }
          : album
      );
    } else {
      const newAlbum: Album = {
        id: newSong.albumId!,
        name: songData.albumName!,
        artistName: songData.artistName,
        coverUrl: songData.albumCoverUrl,
        releaseDate: songData.releaseDate,
        songs: [newSong.id],
      };
      updatedAlbums.push(newAlbum);
    }
  }

  const existingArtist = artists.find(artist => artist.id === songData.artistId);
  if (existingArtist) {
    updatedArtists = updatedArtists.map(artist =>
      artist.id === existingArtist.id
        ? { ...artist, songs: [...artist.songs, newSong.id] }
        : artist
    );
  } else {
    const newArtist: Artist = {
      id: newSong.artistId,
      name: songData.artistName,
      imageUrl: songData.artistImageUrl,
      songs: [newSong.id],
    };
    updatedArtists.push(newArtist);
  }

  return [[...songs, newSong], updatedAlbums, updatedArtists];
};