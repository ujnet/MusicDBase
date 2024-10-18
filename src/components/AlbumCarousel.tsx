import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Album, Song } from '../types';

interface AlbumCarouselProps {
  albums: Album[];
  songs: Song[];
  onAlbumClick: (albumId: string) => void;
  onSongClick: (songId: string) => void;
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums, songs, onAlbumClick, onSongClick }) => {
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Albums</h2>
      <Slider {...settings}>
        {albums.map(album => (
          <div key={album.id} className="px-2">
            <div className="flex flex-col md:flex-row items-center bg-gray-700 p-4 rounded-lg">
              <img
                src={album.coverUrl}
                alt={album.name}
                className="w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6 cursor-pointer"
                onClick={() => onAlbumClick(album.id)}
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => onAlbumClick(album.id)}>
                  {album.name}
                </h3>
                <p className="text-gray-400 mb-4">{album.artistName}</p>
                <h4 className="text-lg font-semibold mb-2">Top Songs:</h4>
                <ul>
                  {getTopSongsForAlbum(album.id).map(song => (
                    <li
                      key={song.id}
                      className="text-gray-300 hover:text-white cursor-pointer"
                      onClick={() => onSongClick(song.id)}
                    >
                      {song.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AlbumCarousel;