import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function TrackItem({ track, onPress, isActive }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Image source={{ uri: track.art }} style={styles.art} />
      <View style={styles.meta}>
        <Text numberOfLines={1} style={[styles.title, isActive && { color: '#1DB954' }]}>
          {track.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {track.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  art: { width: 56, height: 56, borderRadius: 6, marginRight: 12 },
  meta: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  artist: { fontSize: 13, color: '#666' },
});