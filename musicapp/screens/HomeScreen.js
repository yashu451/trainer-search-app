// screens/HomeScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { PlayerContext } from "../context/PlayerContext";
import { useFavorites } from "../context/FavoritesContext";
import { songs } from "../data/songs";

export default function HomeScreen({ navigation }) {
  const { currentSong, isPlaying, playSong, pauseSong, nextSong, prevSong } =
    useContext(PlayerContext);
  const { toggleFavorite, isFavorite } = useFavorites();

  const [searchText, setSearchText] = useState("");

  // Filter songs based on search
  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchText.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchText.toLowerCase())
  );

  const AlbumCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => playSong(item)}
      style={styles.albumCard}
    >
      <Image source={item.image} style={styles.albumImage} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Ionicons
            name={isFavorite(item.id) ? "heart" : "heart-outline"}
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#1c1c1c", "#121212"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Text style={styles.header}>MusicWave</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Featured Section */}
        <Text style={styles.sectionTitle}>Featured</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {filteredSongs.map((s) => (
            <AlbumCard key={s.id} item={s} />
          ))}
        </ScrollView>

        {/* All Songs */}
        <Text style={styles.sectionTitle}>Your Songs</Text>
        {filteredSongs.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.songRow}
            onPress={() => playSong(item)}
          >
            <Image source={item.image} style={styles.songImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Ionicons
                name={isFavorite(item.id) ? "heart" : "heart-outline"}
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mini Player */}
      {currentSong && (
        <View style={styles.miniPlayerContainer}>
          <View style={styles.miniPlayer}>
            <Image source={currentSong.image} style={styles.miniImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.miniTitle} numberOfLines={1}>
                {currentSong.title}
              </Text>
              <Text style={styles.miniArtist}>{currentSong.artist}</Text>
            </View>

            {/* Previous */}
            <TouchableOpacity onPress={prevSong} style={{ marginHorizontal: 5 }}>
              <Ionicons name="play-skip-back" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Play / Pause */}
            <TouchableOpacity
              onPress={() => (isPlaying ? pauseSong() : playSong(currentSong))}
              style={{ marginHorizontal: 5 }}
            >
              <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
            </TouchableOpacity>

            {/* Next */}
            <TouchableOpacity onPress={nextSong} style={{ marginHorizontal: 5 }}>
              <Ionicons name="play-skip-forward" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: { flex: 1, color: "#fff", marginLeft: 8, fontSize: 16 },
  sectionTitle: { color: "#fff", fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  albumCard: { width: 150, marginRight: 15, backgroundColor: "#1c1c1c", padding: 8, borderRadius: 10 },
  albumImage: { width: "100%", height: 140, borderRadius: 8 },
  albumInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  albumTitle: { color: "#fff", fontWeight: "bold" },
  songRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#1c1c1c", padding: 10, marginVertical: 8, borderRadius: 10 },
  songImage: { width: 60, height: 60, borderRadius: 8 },
  songTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  songArtist: { color: "#aaa", fontSize: 14 },
  miniPlayerContainer: { position: "absolute", bottom: 10, left: 10, right: 10 },
  miniPlayer: { backgroundColor: "#1db954", flexDirection: "row", padding: 10, borderRadius: 12, alignItems: "center" },
  miniImage: { width: 55, height: 55, borderRadius: 8 },
  miniTitle: { color: "#fff", fontWeight: "bold" },
  miniArtist: { color: "#eee" },
});
