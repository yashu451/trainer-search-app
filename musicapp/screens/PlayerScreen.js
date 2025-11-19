import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlayerScreen({ route }) {
  const { song } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  async function playPause() {
    if (!sound) {
      const { sound: playbackObject, status } = await Audio.Sound.createAsync(
        { uri: song.audio },
        { shouldPlay: true }
      );
      setSound(playbackObject);
      setIsPlaying(true);
      setDuration(status.durationMillis / 1000);

      playbackObject.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) setPosition(status.positionMillis / 1000);
      });
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient
      colors={['#1db954', '#191414']}
      style={styles.container}
    >
      <Image source={{ uri: song.cover }} style={styles.cover} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#777"
        thumbTintColor="#fff"
        onSlidingComplete={async (value) => {
          if (sound) await sound.setPositionAsync(value * 1000);
        }}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause} style={styles.playButton}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="#1db954" />
        </TouchableOpacity>

        <TouchableOpacity>
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
