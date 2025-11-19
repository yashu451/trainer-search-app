import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>Yashaswini</Text>
      <Text style={styles.email}>yashaswini@example.com</Text>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  editBtn: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});