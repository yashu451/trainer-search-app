// context/PlayerContext.js
import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (soundObj) soundObj.unloadAsync();
    };
  }, [soundObj]);

  useEffect(() => {
    (async () => {
      if (!currentSong) return;
      try {
        if (soundObj) {
          await soundObj.unloadAsync();
          setSoundObj(null);
        }
        // currentSong.audio must be { uri: 'https://...' } or a remote url string
        const source = currentSong.audio?.uri ? { uri: currentSong.audio.uri } : currentSong.audio;
        const { sound } = await Audio.Sound.createAsync(source);
        setSoundObj(sound);
        await sound.playAsync();
        setIsPlaying(true);
      } catch (e) {
        console.log("play error", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  const togglePlay = async () => {
    if (!soundObj) return;
    if (isPlaying) await soundObj.pauseAsync();
    else await soundObj.playAsync();
    setIsPlaying((p) => !p);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};
