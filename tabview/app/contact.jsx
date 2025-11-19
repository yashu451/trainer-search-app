import{ StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function contact(){
    return(
        <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Email: example@gmail.com</Text>
        <Text style={styles.info}>Phone: +123 456 789</Text>
        <Text style={styles.info}>Address: Not added yet</Text>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEC6CF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
});
