
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AircraftStat() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/plane.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aircraft Stats</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={28} color="#222" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.allTimeButton}>
        <Text style={styles.allTimeText}>ALL-TIME</Text>
      </TouchableOpacity>
      <View style={styles.centerContent}>
        <Text style={styles.subtitle}>Most flown aircraft</Text>
        <Text style={styles.title}>Papercraft 747</Text>
        <Text style={styles.desc}>No flights on a real plane yet.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'blue',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  allTimeButton: {
    marginTop: 24,
    marginLeft: 24,
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  allTimeText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 14,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  subtitle: {
    color: '#1e3a5c',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    color: '#1e3a5c',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    color: '#1e3a5c',
    fontSize: 16,
    opacity: 0.7,
  },
});
