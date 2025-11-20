import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorite songs yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              <Image source={item.image} style={styles.cover} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Ionicons name="heart" size={28} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  header: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  empty: { color: "#777", fontSize: 18, textAlign: "center", marginTop: 20 },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  cover: { width: 60, height: 60, borderRadius: 10 },
  title: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  artist: { color: "#ccc", fontSize: 14 },
});
