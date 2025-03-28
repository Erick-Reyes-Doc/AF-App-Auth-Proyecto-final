import React, { useState, useEffect, useCallback } from 'react';
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
import { useRouter, useFocusEffect } from 'expo-router';
import { obtenerMacetas } from '../../utils/macetasService';

const { width } = Dimensions.get('window');

// Iconos por estado
const estadoIcons = {
  Óptima: 'smile-o',
  Baja: 'meh-o',
  Seca: 'frown-o',
  Exceso: 'exclamation-circle',
};

// Colores por estado
const estadoColors = {
  Óptima: '#2ecc71',   // Verde
  Baja: '#f1c40f',     // Amarillo
  Seca: '#e74c3c',     // Rojo
  Exceso: '#3498db',   // Azul
};

export default function HomeScreen() {
  const router = useRouter();
  const [macetas, setMacetas] = useState([]);

  // Obtener macetas al cargar la pantalla
  const cargarMacetas = async () => {
    try {
      const data = await obtenerMacetas();
      setMacetas(data);
    } catch (error) {
      console.error('Error al cargar macetas:', error);
    }
  };

  // Ejecutar cargarMacetas cada vez que la pantalla esté en foco
  useFocusEffect(
    useCallback(() => {
      cargarMacetas();
    }, [])
  );

  const renderPlant = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen_url }} style={styles.plantImage} />

      <View style={styles.textContainer}>
        <Text style={styles.plantName}>{item.nombre}</Text>
        {/* Estado Visual */}
        <View style={styles.statusContainer}>
          <FontAwesome
            name={estadoIcons[item.estado] || 'question-circle'}
            size={20}
            color={estadoColors[item.estado] || '#888'}
          />
          <Text style={[styles.estadoText, { color: estadoColors[item.estado] || '#888' }]}>
            {item.estado || 'Desconocido'}
          </Text>
        </View>
      </View>

      {/* Botón Ver Más */}
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => router.push(`/detalle-planta?id=${item.id}`)}
      >
        <Text style={styles.viewText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>

      {macetas.length === 0 ? (
        <Text style={styles.emptyText}>No hay macetas agregadas.</Text>
      ) : (
        <FlatList
          data={macetas}
          renderItem={renderPlant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
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
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  estadoText: {
    fontSize: 14,
    fontWeight: 'bold',
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
