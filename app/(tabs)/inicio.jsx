import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PLANTS } from '../../data/plants';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const renderPlant = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.plantImage} />

      <View style={styles.textContainer}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.stateText}>Estado</Text>
        <Text style={styles.estado}>{item.estado}</Text>
      </View>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => router.push(`/detalle-planta?id=${item.id}`)} // ✅ Cambio aquí
      >
        <Text style={styles.viewText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>

      <FlatList
        data={PLANTS}
        renderItem={renderPlant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/anadir-maceta')}
      >
        <FontAwesome name="plus" size={20} color="#000" />
        <Text style={styles.addText}>Añadir maceta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFDD',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#3D6775',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plantImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  plantName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  stateText: {
    color: '#fff',
    fontSize: 14,
  },
  estado: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#A2C579',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  viewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#A2C579',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  addText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
