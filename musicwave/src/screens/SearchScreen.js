import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { useAudio } from '../context/AudioProvider';
import TrackItem from '../components/TrackItem';

export default function SearchScreen() {
  const { tracks, playTrack, currentTrackIndex } = useAudio();
  const [q, setQ] = useState('');

  const results = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(q.toLowerCase()) ||
      t.artist.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={q}
        onChangeText={setQ}
        style={styles.input}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TrackItem
            track={item}
            onPress={() => playTrack(tracks.indexOf(item))}
            isActive={tracks.indexOf(item) === currentTrackIndex}
          />
        )}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No results</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    margin: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});