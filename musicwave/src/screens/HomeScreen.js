import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAudio } from '../context/AudioProvider';
import TrackItem from '../components/TrackItem';

export default function HomeScreen({ navigation }) {
  const { tracks, playTrack, currentTrackIndex } = useAudio();

  const renderItem = ({ item, index }) => (
    <TrackItem
      track={item}
      onPress={() => {
        playTrack(index);
      }}
      isActive={index === currentTrackIndex}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Good afternoon</Text>
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16 },
  h1: { fontSize: 24, fontWeight: '700' },
});