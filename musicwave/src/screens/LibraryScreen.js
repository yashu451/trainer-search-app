import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LibraryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Library</Text>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate('Playlist', { playlistId: 'popular' })}
      >
        <Text style={styles.title}>Liked Songs / Playlist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate('Playlist', { playlistId: 'recent' })}
      >
        <Text style={styles.title}>Recently Played</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  listItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginBottom: 12,
  },
  title: { fontSize: 16 },
});