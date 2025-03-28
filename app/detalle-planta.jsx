import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { obtenerMacetaPorId, eliminarMaceta } from '../utils/macetasService';
import { FontAwesome } from '@expo/vector-icons';

// Iconos y colores por estado
const estadoIcons = {
    Óptima: 'check-circle',
    Baja: 'times-circle',
    Seca: 'frown-o',
    Exceso: 'exclamation-circle',
};

const estadoColors = {
    Óptima: '#2ecc71',   // Verde
    Baja: '#e74c3c',     // Rojo
    Seca: '#e74c3c',     // Rojo
    Exceso: '#f1c40f',   // Amarillo
};

export default function DetallePlanta() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [planta, setPlanta] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await obtenerMacetaPorId(id);
                setPlanta(data);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los detalles de la maceta.');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [id]);

    // Eliminar maceta
    const handleEliminar = async () => {
        Alert.alert(
            'Eliminar Maceta',
            '¿Estás seguro de que deseas eliminar esta maceta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await eliminarMaceta(id);
                            Alert.alert('Éxito', 'La maceta ha sido eliminada.');
                            router.replace('/(tabs)/inicio');
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar la maceta.');
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#A2C579" style={styles.loader} />;
    }

    if (!planta) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Maceta no encontrada</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>{planta.nombre}</Text>

            {planta.imagen_url ? (
                <Image source={{ uri: planta.imagen_url }} style={styles.image} />
            ) : (
                <Text style={styles.errorText}>Imagen no disponible</Text>
            )}

            {/* Contenedor 1: Especie y Fecha */}
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Especie: {planta.especie}</Text>
                <Text style={styles.infoText}>Fecha de Creación: {new Date(planta.creado_en).toLocaleDateString()}</Text>
            </View>

            {/* Contenedor 2: Temperatura, Humedad y Estado */}
            <View style={styles.statusContainer}>
                <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Temperatura:</Text>
                    <Text style={styles.statusValue}>{planta.temperatura}°</Text>
                    <FontAwesome name="check-circle" size={18} color="#2ecc71" />
                </View>

                <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Humedad:</Text>
                    <Text style={styles.statusValue}>{planta.humedad}%</Text>
                    <FontAwesome name={estadoIcons[planta.estado] || 'question-circle'} size={18} color={estadoColors[planta.estado] || '#888'} />
                </View>

                <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Estado:</Text>
                    <Text style={styles.statusValue}>{planta.estado || 'No definido'}</Text>
                    <FontAwesome name={estadoIcons[planta.estado] || 'question-circle'} size={18} color={estadoColors[planta.estado] || '#888'} />
                </View>
            </View>

            {/* Botones Editar y Eliminar */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.edit]}
                    onPress={() => router.push(`/editar-planta?id=${id}`)}
                >
                    <Text style={styles.buttonText}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.delete]}
                    onPress={handleEliminar}
                >
                    <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFDD',
    },
    content: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3D6775',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginBottom: 20,
    },
    infoBox: {
        backgroundColor: '#3D6775',
        padding: 16,
        borderRadius: 15,
        width: '100%',
        marginBottom: 25,
    },
    infoText: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    statusContainer: {
        backgroundColor: '#E0E8F0',
        padding: 16,
        borderRadius: 15,
        width: '100%',
        marginBottom: 25,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    statusLabel: {
        fontWeight: 'bold',
        color: '#3D6775',
        flex: 1,
    },
    statusValue: {
        color: '#000',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 30,
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    edit: {
        backgroundColor: '#799CC5',
    },
    delete: {
        backgroundColor: '#C25E5E',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#A2C579',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    backText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
    },
});
