import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useAudio } from '../context/AudioProvider';

function formatMs(ms) {
  if (!ms) return '0:00';
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? '0' + s : s}`;
}

export default function FullPlayerScreen() {
  const {
    currentTrack,
    isPlaying,
    playPause,
    next,
    prev,
    positionMillis,
    durationMillis,
    seekTo,
  } = useAudio();

  if (!currentTrack) {
    return (
      <View style={styles.empty}>
        <Text>No track playing</Text>
      </View>
    );
  }

  const progress = durationMillis ? (positionMillis / durationMillis) : 0;
  const width = Dimensions.get('window').width - 40;

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentTrack.art }} style={styles.art} />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.artist}>{currentTrack.artist}</Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: width, backgroundColor: '#eee' }]}>
          <View style={{ width: Math.max(0, width * progress), backgroundColor: '#1DB954', height: 4 }} />
        </View>
        <View style={styles.times}>
          <Text>{formatMs(positionMillis)}</Text>
          <Text>{formatMs(durationMillis)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={prev} style={styles.ctrlBtn}><Text style={styles.ctrlText}>⏮</Text></TouchableOpacity>
        <TouchableOpacity onPress={playPause} style={[styles.playBtn]}><Text style={styles.playText}>{isPlaying ? '⏸' : '▶️'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={next} style={styles.ctrlBtn}><Text style={styles.ctrlText}>⏭</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
  art: { width: 320, height: 320, borderRadius: 8, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  artist: { fontSize: 16, color: '#666', marginBottom: 16 },
  progressContainer: { width: '100%', alignItems: 'center', marginTop: 24 },
  progressBar: { height: 4, borderRadius: 2, overflow: 'hidden' },
  times: { width: '90%', marginTop: 6, flexDirection: 'row', justifyContent: 'space-between' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '60%', marginTop: 32 },
  ctrlBtn: { padding: 12 },
  ctrlText: { fontSize: 26 },
  playBtn: { backgroundColor: '#1DB954', width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  playText: { fontSize: 28, color: '#fff' },
});