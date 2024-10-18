import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { SongFormData, genres, Song, Album, Artist } from '../types';

interface AddSongFormProps {
  onAddSong: (song: SongFormData) => void;
  existingSongs: Song[];
  existingAlbums: Album[];
  existingArtists: Artist[];
}

const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong, existingSongs, existingAlbums, existingArtists }) => {
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    type: 'single',
    albumName: '',
    artistName: '',
    duration: '',
    albumCoverUrl: '',
    artistImageUrl: '',
    releaseDate: '',
    genre: genres[0],
    albumId: '',
    artistId: '',
  });

  const [suggestions, setSuggestions] = useState({
    title: [] as string[],
    albumName: [] as string[],
    artistName: [] as string[],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showAlbumSuggestions, setShowAlbumSuggestions] = useState(false);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);
  const artistInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isValid = 
      formData.title.trim() !== '' &&
      formData.artistName.trim() !== '' &&
      formData.albumCoverUrl.trim() !== '' &&
      formData.artistImageUrl.trim() !== '' &&
      formData.releaseDate.trim() !== '' &&
      (formData.type !== 'album' || (formData.type === 'album' && formData.albumName.trim() !== ''));

    const titleExists = existingSongs.some(song => song.title.toLowerCase() === formData.title.toLowerCase());
    const albumExists = formData.type === 'album' && existingAlbums.some(album => album.name.toLowerCase() === formData.albumName.toLowerCase());
    const artistExists = existingArtists.some(artist => artist.name.toLowerCase() === formData.artistName.toLowerCase());

    const newContentCount = [!titleExists, !albumExists, !artistExists].filter(Boolean).length;

    setIsFormValid(isValid && newContentCount > 0);
  }, [formData, existingSongs, existingAlbums, existingArtists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update suggestions
    if (name === 'title') {
      const titleSuggestions = existingSongs
        .filter(song => song.title.toLowerCase().includes(value.toLowerCase()))
        .map(song => song.title);
      setSuggestions(prev => ({ ...prev, title: titleSuggestions }));
      setShowTitleSuggestions(true);
    } else if (name === 'albumName') {
      const albumSuggestions = existingAlbums
        .filter(album => album.name.toLowerCase().includes(value.toLowerCase()))
        .map(album => album.name);
      setSuggestions(prev => ({ ...prev, albumName: albumSuggestions }));
      setShowAlbumSuggestions(true);
    } else if (name === 'artistName') {
      const artistSuggestions = existingArtists
        .filter(artist => artist.name.toLowerCase().includes(value.toLowerCase()))
        .map(artist => artist.name);
      setSuggestions(prev => ({ ...prev, artistName: artistSuggestions }));
      setShowArtistSuggestions(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const existingAlbum = existingAlbums.find(album => album.name.toLowerCase() === formData.albumName.toLowerCase());
      const existingArtist = existingArtists.find(artist => artist.name.toLowerCase() === formData.artistName.toLowerCase());

      const songData: SongFormData = {
        ...formData,
        albumId: existingAlbum ? existingAlbum.id : '',
        artistId: existingArtist ? existingArtist.id : '',
      };

      onAddSong(songData);
      setFormData({
        title: '',
        type: 'single',
        albumName: '',
        artistName: '',
        duration: '',
        albumCoverUrl: '',
        artistImageUrl: '',
        releaseDate: '',
        genre: genres[0],
        albumId: '',
        artistId: '',
      });
      setSuggestions({ title: [], albumName: [], artistName: [] });
    }
  };

  const handleSuggestionClick = (field: string, suggestion: string) => {
    setFormData(prev => ({ ...prev, [field]: suggestion }));
    if (field === 'title') setShowTitleSuggestions(false);
    if (field === 'albumName') setShowAlbumSuggestions(false);
    if (field === 'artistName') setShowArtistSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-lg" id="addSongForm">
      <h2 className="text-2xl font-bold mb-4">Add a Song</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="bg-primary text-white p-2 rounded w-full"
            ref={titleInputRef}
          />
          {showTitleSuggestions && suggestions.title.length > 0 && (
            <ul className="absolute z-10 bg-primary w-full mt-1 rounded shadow-lg">
              {suggestions.title.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-secondary cursor-pointer"
                  onClick={() => handleSuggestionClick('title', suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-primary text-white p-2 rounded w-full"
          >
            <option value="single">Single</option>
            <option value="album">Album</option>
          </select>
        </div>
        {formData.type === 'album' && (
          <div className="relative">
            <input
              type="text"
              name="albumName"
              value={formData.albumName}
              onChange={handleChange}
              placeholder="Album Name"
              required
              className="bg-primary text-white p-2 rounded w-full"
              ref={albumInputRef}
            />
            {showAlbumSuggestions && suggestions.albumName.length > 0 && (
              <ul className="absolute z-10 bg-primary w-full mt-1 rounded shadow-lg">
                {suggestions.albumName.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-secondary cursor-pointer"
                    onClick={() => handleSuggestionClick('albumName', suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="bg-primary text-white p-2 rounded w-full"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="bg-primary text-white p-2 rounded w-full"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            placeholder="Artist Name"
            required
            className="bg-primary text-white p-2 rounded w-full"
            ref={artistInputRef}
          />
          {showArtistSuggestions && suggestions.artistName.length > 0 && (
            <ul className="absolute z-10 bg-primary w-full mt-1 rounded shadow-lg">
              {suggestions.artistName.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-secondary cursor-pointer"
                  onClick={() => handleSuggestionClick('artistName', suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <input
            type="url"
            name="artistImageUrl"
            value={formData.artistImageUrl}
            onChange={handleChange}
            placeholder="Artist Image URL"
            required
            className="bg-primary text-white p-2 rounded w-full"
          />
        </div>
        <div>
          <input
            type="url"
            name="albumCoverUrl"
            value={formData.albumCoverUrl}
            onChange={handleChange}
            placeholder={`${formData.type === 'album' ? 'Album' : 'Single'} Cover Image URL`}
            required
            className="bg-primary text-white p-2 rounded w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 3:45)"
            required
            className="bg-primary text-white p-2 rounded w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className={`mt-4 ${isFormValid ? 'bg-accent hover:bg-accent/80' : 'bg-gray-600 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded inline-flex items-center`}
        disabled={!isFormValid}
      >
        <Plus className="mr-2" />
        Add Song
      </button>
    </form>
  );
};

export default AddSongForm;