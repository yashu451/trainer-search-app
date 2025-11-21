// screens/PlayerScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayerContext } from '../context/PlayerContext';

export default function PlayerScreen() {
  const {
    currentSong,
    soundObj,
    isPlaying,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
  } = useContext(PlayerContext);

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  if (!currentSong) return null;

  // Update playback position and duration
  useEffect(() => {
    if (!soundObj) return;

    // Callback whenever playback status changes
    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis / 1000);
        setDuration(status.durationMillis / 1000);
      }
    };

    soundObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    return () => {
      if (soundObj) soundObj.setOnPlaybackStatusUpdate(null);
    };
  }, [soundObj, currentSong]); // re-run when song changes

  const handlePlayPause = () => {
    if (isPlaying) pauseSong();
    else playSong(currentSong);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <LinearGradient colors={['#1db954', '#191414']} style={styles.container}>
      <Image source={currentSong.image} style={styles.cover} />
      <Text style={styles.title}>{currentSong.title}</Text>
      <Text style={styles.artist}>{currentSong.artist}</Text>

      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#777"
        thumbTintColor="#fff"
        onSlidingComplete={async (value) => {
          if (soundObj) await soundObj.setPositionAsync(value * 1000);
        }}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={prevSong}>
          <Ionicons name="play-skip-back" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="#1db954" />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSong}>
          <Ionicons name="play-skip-forward" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cover: { width: 300, height: 300, borderRadius: 10, marginBottom: 30 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  artist: { fontSize: 18, color: '#ccc', marginBottom: 30 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    width: 250,
  },
  playButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  timeContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: { color: '#fff' },
});
