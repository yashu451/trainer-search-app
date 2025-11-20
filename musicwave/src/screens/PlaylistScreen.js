import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAudio } from '../context/AudioProvider';
import TrackItem from '../components/TrackItem';

export default function PlaylistScreen({ route }) {
  const { tracks, playTrack, currentTrackIndex } = useAudio();
  const { playlistId } = route.params || {};

  // For demo we just render all tracks
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Playlist: {playlistId ?? 'All Tracks'}</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TrackItem
            track={item}
            onPress={() => playTrack(index)}
            isActive={index === currentTrackIndex}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  h1: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
});