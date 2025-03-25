import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PLANTS } from '../data/plants';

export default function DetallePlanta() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const planta = PLANTS.find((p) => p.id === id);

    if (!planta) {
        return (
            <View style={styles.centered}>
                <Text>Planta no encontrada</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>{planta.name}</Text>

            <Image source={planta.image} style={styles.image} />

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Especie: {planta.especie}</Text>
                <Text style={styles.infoText}>Fecha de creación: {planta.siembra}</Text>
                <Text style={styles.infoText}>Temperatura Ideal: {planta.temperaturaIdeal}</Text>
                <Text style={styles.infoText}>Humedad Ideal: {planta.humedadIdeal}</Text>
            </View>

            <View style={styles.statusBox}>
                <Text style={styles.statusText}>
                    <Text style={styles.bold}>Temperatura: </Text>
                    {planta.temperaturaActual}{' '}
                    {parseInt(planta.temperaturaActual) > parseInt(planta.temperaturaIdeal) ? '❌' : '✅'}
                </Text>
                <Text style={styles.statusText}>
                    <Text style={styles.bold}>Humedad: </Text>
                    {planta.humedadActual}{' '}
                    {parseInt(planta.humedadActual) < parseInt(planta.humedadIdeal) ? '❌' : '✅'}
                </Text>
                <Text style={styles.statusText}>
                    <Text style={styles.bold}>Estado: </Text>
                    {planta.estado}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.edit]}
                    onPress={() => router.push(`/editar-planta?id=${planta.id}`)}
                >
                    <Text style={styles.buttonText}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.delete]}
                    onPress={() => alert('Eliminar en desarrollo')}
                >
                    <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>⬅ Volver</Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'System',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginBottom: 25,
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
    statusBox: {
        backgroundColor: '#E6E6E6',
        padding: 16,
        borderRadius: 15,
        width: '100%',
        marginBottom: 30,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 6,
    },
    bold: {
        fontWeight: 'bold',
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
        backgroundColor: '#89AED3', // Azul claro estilo Figma
    },
    delete: {
        backgroundColor: '#D76363', // Rojo claro estilo Figma
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
