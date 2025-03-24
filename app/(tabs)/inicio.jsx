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
import { PLANTS } from '../../data/plants'; // <- Importamos desde el archivo nuevo

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const renderPlant = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.plantImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.stateText}>Estado</Text>
      </View>

      <Text style={styles.statusIcon}>{item.estado}</Text>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() =>
          router.push({
            pathname: '/detalle-planta',
            params: { id: item.id },
          })
        }
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
        onPress={() => router.push('/añadir-maceta')}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#3D6775',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  plantImage: {
    width: 74,
    height: 74,
    borderRadius: 10,
    marginRight: 12,
  },
  plantName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stateText: {
    color: '#fff',
    fontSize: 14,
  },
  statusIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  viewButton: {
    backgroundColor: '#A2C579',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
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
