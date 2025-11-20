import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { songs } from '../data/songs';
import { PlayerContext } from '../context/PlayerContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const { currentSong, setCurrentSong, isPlaying, togglePlay } = useContext(PlayerContext);

  const AlbumCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setCurrentSong(item)}
    >
      <View style={styles.featuredCard}>
        <Image source={{ uri: item.cover }} style={styles.featuredImage} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          {item.isTopHit && <Ionicons name="flame" size={16} color="#ff6347" style={{ marginLeft: 5 }} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1c1c1c', '#121212']} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.header}>Good Evening</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#aaa" style={{ marginLeft: 10 }} />
          <TextInput placeholder="Search" placeholderTextColor="#aaa" style={styles.searchInput} />
        </View>

        {/* Horizontal Sections */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {songs.map(item => <AlbumCard key={item.id} item={item} />)}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {songs.map(item => <AlbumCard key={item.id} item={item} />)}
        </ScrollView>

        <Text style={styles.sectionTitle}>Top Hits</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {songs.map(item => <AlbumCard key={item.id} item={item} />)}
        </ScrollView>

        {/* Vertical song list */}
        <Text style={styles.sectionTitle}>Your Songs</Text>
        {songs.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.songItem}
            onPress={() => setCurrentSong(item)}
          >
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
            {item.isTopHit && <Ionicons name="flame" size={20} color="#ff6347" style={{ marginRight: 10 }} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mini Player */}
      {currentSong && (
        <TouchableOpacity
          style={styles.miniPlayerContainer}
          onPress={() => navigation.navigate('Player', { song: currentSong })}
          activeOpacity={0.9}
        >
          <View style={[styles.miniPlayer, { backgroundColor: '#1db954' }]}>
            <Image source={{ uri: currentSong.cover }} style={styles.miniCover} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.miniTitle}>{currentSong.title}</Text>
              <Text style={styles.miniArtist}>{currentSong.artist}</Text>
            </View>
            <TouchableOpacity onPress={togglePlay}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },

  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2a2a2a', borderRadius: 10, paddingHorizontal: 10, height: 40, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, color: '#fff' },

  sectionTitle: { color: '#fff', fontSize: 20, marginBottom: 10, fontWeight: 'bold' },

  songItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, backgroundColor: '#1c1c1c', borderRadius: 10, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5 },
  cover: { width: 60, height: 60, borderRadius: 8 },
  title: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  artist: { fontSize: 14, color: '#aaa' },

  featuredCard: { marginRight: 15, width: 140, backgroundColor: '#1c1c1c', borderRadius: 10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5 },
  featuredImage: { width: 140, height: 140, borderRadius: 10, marginBottom: 5 },
  featuredTitle: { color: '#fff', fontWeight: 'bold' },

  miniPlayerContainer: { position: 'absolute', bottom: 10, left: 10, right: 10, height: 70, borderRadius: 15, overflow: 'hidden' },
  miniPlayer: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 15 },
  miniCover: { width: 50, height: 50, borderRadius: 5 },
  miniTitle: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  miniArtist: { fontSize: 14, color: '#eee' },
});
