import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAudio } from '../context/AudioProvider';
import { useNavigation } from '@react-navigation/native';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, playPause } = useAudio();
  const navigation = useNavigation();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('FullPlayer')}
      activeOpacity={0.9}
    >
      <Image source={{ uri: currentTrack.art }} style={styles.art} />
      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.title}>
          {currentTrack.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {currentTrack.artist}
        </Text>
      </View>
      <TouchableOpacity onPress={playPause} style={styles.control}>
        <Text style={{ fontSize: 18 }}>{isPlaying ? '⏸' : '▶️'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  art: { width: 48, height: 48, borderRadius: 4 },
  meta: { flex: 1, marginLeft: 12 },
  title: { fontSize: 14, fontWeight: '600' },
  artist: { fontSize: 12, color: '#666' },
  control: { padding: 8 },
});