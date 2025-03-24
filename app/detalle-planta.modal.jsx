import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PLANTS } from '../data/plants'; // <- Importación corregida

const { width } = Dimensions.get('window');

export default function DetallePlantaModal() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const planta = PLANTS.find((p) => p.id === id);

    if (!planta) {
        return (
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Planta no encontrada</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.title}>{planta.name}</Text>

            <Image source={planta.image} style={styles.image} resizeMode="cover" />

            <View style={styles.card}>
                <Text style={styles.label}>🌿 Especie:</Text>
                <Text style={styles.value}>{planta.especie}</Text>

                <Text style={styles.label}>🗓 Fecha de siembra:</Text>
                <Text style={styles.value}>{planta.siembra}</Text>

                <Text style={styles.label}>🌡 Temp. ideal:</Text>
                <Text style={styles.value}>{planta.temperaturaIdeal}</Text>

                <Text style={styles.label}>💧 Humedad ideal:</Text>
                <Text style={styles.value}>{planta.humedadIdeal}</Text>
            </View>

            <View style={styles.estadoCard}>
                <Text style={styles.estadoLabel}>Estado actual:</Text>
                <Text style={styles.estadoTexto}>
                    Temperatura: {planta.temperaturaActual} {'\n'}
                    Humedad: {planta.humedadActual} {'\n'}
                    Estado: {planta.estado}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({ pathname: '/editar-planta', params: { id } })}
            >
                <Text style={styles.editButtonText}>Editar Planta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFDD',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3D6775',
        marginBottom: 10,
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: 20,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#3D6775',
        padding: 20,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },
    value: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 5,
    },
    estadoCard: {
        backgroundColor: '#A2C579',
        padding: 20,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
    },
    estadoLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3D6775',
        marginBottom: 10,
    },
    estadoTexto: {
        fontSize: 16,
        color: '#000',
    },
    editButton: {
        backgroundColor: '#882D2D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 5,
    },
    closeText: {
        fontSize: 14,
        color: '#3D6775',
        textDecorationLine: 'underline',
    },
});
