import React, { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObj, setSoundObj] = useState(null);

  // Play new song when currentSong changes
  useEffect(() => {
    if (currentSong) playSong(currentSong.url);
  }, [currentSong]);

  const playSong = async (url) => {
    try {
      if (soundObj) await soundObj.unloadAsync(); // stop previous
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSoundObj(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (e) {
      console.log('Error playing song:', e);
    }
  };

  const togglePlay = async () => {
    if (!soundObj) return;
    if (isPlaying) await soundObj.pauseAsync();
    else await soundObj.playAsync();
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, togglePlay }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
