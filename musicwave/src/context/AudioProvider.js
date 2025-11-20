import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import tracks from '../data/tracks';

const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export const AudioProvider = ({ children }) => {
  const soundRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  async function loadTrackAsync(index) {
    try {
      const track = tracks[index];
      if (!track) return;
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 },
        onPlaybackStatus
      );
      soundRef.current = sound;
      setCurrentTrackIndex(index);
      setIsLoaded(true);
      setIsPlaying(true);
    } catch (e) {
      console.warn('loadTrack error', e);
    }
  }

  function onPlaybackStatus(status) {
    if (!status) return;
    setPositionMillis(status.positionMillis ?? 0);
    setDurationMillis(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      // auto-next
      handleNext();
    }
  }

  async function handlePlayPause() {
    if (!soundRef.current) {
      if (currentTrackIndex === null && tracks.length > 0) {
        loadTrackAsync(0);
      }
      return;
    }
    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    }
  }

  async function handleSeek(ms) {
    if (!soundRef.current) return;
    try {
      await soundRef.current.setPositionAsync(ms);
    } catch (e) {
      console.warn('seek error', e);
    }
  }

  async function handleNext() {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    await loadTrackAsync(nextIndex);
  }

  async function handlePrev() {
    if (currentTrackIndex === null) return;
    const prevIndex =
      currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    await loadTrackAsync(prevIndex);
  }

  async function playTrack(index) {
    await loadTrackAsync(index);
  }

  const value = {
    tracks,
    currentTrack: currentTrackIndex !== null ? tracks[currentTrackIndex] : null,
    currentTrackIndex,
    isPlaying,
    positionMillis,
    durationMillis,
    playTrack,
    playPause: handlePlayPause,
    seekTo: handleSeek,
    next: handleNext,
    prev: handlePrev,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};