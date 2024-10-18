import React from 'react';
import Slider from 'react-slick';
import { Album, Song, Artist } from '../types';
import { Star } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface FeaturedAlbumsProps {
  albums: Album[];
  songs: Song[];
  artists: Artist[];
  onAlbumClick: (albumId: string) => void;
  onSongClick: (songId: string) => void;
  onArtistClick: (artistId: string) => void;
}

const FeaturedAlbums: React.FC<FeaturedAlbumsProps> = ({ albums, songs, artists, onAlbumClick, onSongClick, onArtistClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const getTopSongsForAlbum = (albumId: string) => {
    return songs
      .filter(song => song.albumId === albumId)
      .sort((a, b) => {
        const avgRatingA = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length || 0;
        const avgRatingB = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length || 0;
        return avgRatingB - avgRatingA;
      })
      .slice(0, 3);
  };

  const getAlbumRating = (albumId: string) => {
    const albumSongs = songs.filter(song => song.albumId === albumId);
    const totalRating = albumSongs.reduce((sum, song) => {
      const avgRating = song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0;
      return sum + avgRating;
    }, 0);
    return albumSongs.length > 0 ? totalRating / albumSongs.length : 0;
  };

  const topAlbums = albums
    .sort((a, b) => getAlbumRating(b.id) - getAlbumRating(a.id))
    .slice(0, 5);

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Featured Albums</h2>
      <Slider {...settings}>
        {topAlbums.map(album => {
          const artist = artists.find(a => a.name === album.artistName);
          const topSongs = getTopSongsForAlbum(album.id);
          return (
            <div key={album.id} className="px-2">
              <div className="flex items-center bg-primary p-6 rounded-lg" style={{ minHeight: '250px' }}>
                <img
                  src={album.coverUrl}
                  alt={album.name}
                  className="w-48 h-48 object-cover rounded-lg cursor-pointer mr-6"
                  onClick={() => onAlbumClick(album.id)}
                />
                <div className="flex-grow flex flex-col items-start">
                  <h3 className="text-2xl font-semibold mb-2 cursor-pointer text-white" onClick={() => onAlbumClick(album.id)}>
                    {album.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" size={18} />
                    <span className="text-lg font-bold text-white">{getAlbumRating(album.id).toFixed(1)}</span>
                  </div>
                  <div className="space-y-2">
                    {topSongs.map(song => (
                      <div
                        key={song.id}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => onSongClick(song.id)}
                      >
                        <img
                          src={song.albumCoverUrl}
                          alt={song.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-sm text-gray-300 hover:text-white">{song.title}</span>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1" size={12} />
                          <span className="text-xs text-white">
                            {(song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {artist && (
                  <div className="flex flex-col items-center ml-6">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-24 h-24 object-cover rounded-full cursor-pointer mb-2"
                      onClick={() => onArtistClick(artist.id)}
                    />
                    <span className="text-sm text-gray-300 cursor-pointer hover:text-white" onClick={() => onArtistClick(artist.id)}>
                      {artist.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default FeaturedAlbums;