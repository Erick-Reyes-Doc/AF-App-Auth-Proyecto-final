import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PLANTS } from './(tabs)/inicio';

const { width } = Dimensions.get('window');

export default function EditarPlanta() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const planta = PLANTS.find(p => p.id === id);

    const [form, setForm] = useState({
        name: '',
        especie: '',
        siembra: '',
        temperaturaIdeal: '',
        humedadIdeal: '',
    });

    useEffect(() => {
        if (planta) {
            setForm({
                name: planta.name,
                especie: planta.especie,
                siembra: planta.siembra,
                temperaturaIdeal: planta.temperaturaIdeal,
                humedadIdeal: planta.humedadIdeal,
            });
        }
    }, [planta]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleGuardar = () => {
        // Aquí iría la lógica real de actualización (Supabase, DB, etc.)
        Alert.alert('Cambios guardados', 'Los datos de la planta han sido actualizados.');
        router.back();
    };

    const handleCancelar = () => {
        router.back();
    };

    if (!planta) {
        return (
            <View style={styles.container}>
                <Text>Planta no encontrada</Text>
                <TouchableOpacity onPress={handleCancelar}>
                    <Text>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Planta</Text>

            <Image source={planta.image} style={styles.image} />

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={form.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Especie"
                value={form.especie}
                onChangeText={(text) => handleChange('especie', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de siembra"
                value={form.siembra}
                onChangeText={(text) => handleChange('siembra', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Temperatura ideal"
                value={form.temperaturaIdeal}
                onChangeText={(text) => handleChange('temperaturaIdeal', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Humedad ideal"
                value={form.humedadIdeal}
                onChangeText={(text) => handleChange('humedadIdeal', text)}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
                <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFDD',
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3D6775',
        marginBottom: 20,
    },
    image: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: 20,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 12,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 12,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    saveButton: {
        backgroundColor: '#882D2D',
        padding: 12,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelText: {
        color: '#3D6775',
        textDecorationLine: 'underline',
    },
});
