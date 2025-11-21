// context/PlayerContext.js
import React, { createContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { songs } from "../data/songs";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());

  const playSong = async (song) => {
    try {
      if (currentSong?.id !== song.id) {
        // unload previous sound
        await sound.current.unloadAsync();
        await sound.current.loadAsync({ uri: song.audio.uri });
      }
      await sound.current.playAsync();
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (e) {
      console.log("play error", e);
    }
  };

  const pauseSong = async () => {
    try {
      if (!currentSong) return;
      await sound.current.pauseAsync();
      setIsPlaying(false);
    } catch (e) {
      console.log("pause error", e);
    }
  };

  const stopSong = async () => {
    try {
      if (!currentSong) return;
      await sound.current.stopAsync();
      setIsPlaying(false);
      setCurrentSong(null);
    } catch (e) {
      console.log("stop error", e);
    }
  };

  const nextSong = async () => {
    if (!currentSong) return;
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (index + 1) % songs.length;
    await playSong(songs[nextIndex]);
  };

  const prevSong = async () => {
    if (!currentSong) return;
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (index - 1 + songs.length) % songs.length;
    await playSong(songs[prevIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        setCurrentSong,
        setIsPlaying,
        playSong,
        pauseSong,
        stopSong,
        nextSong,
        prevSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
