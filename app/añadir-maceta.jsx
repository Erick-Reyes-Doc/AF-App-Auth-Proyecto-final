import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function AñadirMaceta() {
    const router = useRouter();
    const [form, setForm] = useState({
        nombre: '',
        especie: '',
        siembra: '',
        temperatura: '',
        humedad: '',
    });

    const [image, setImage] = useState(null);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permiso necesario', 'Se necesita acceso a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePickFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permiso necesario', 'Se necesita acceso a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleGuardar = () => {
        const camposVacios = Object.values(form).some((val) => val === '');
        if (camposVacios || !image) {
            Alert.alert('Error', 'Completa todos los campos y agrega una imagen.');
            return;
        }

        console.log('Guardando maceta:', { ...form, imagen: image });
        // Aquí podrías enviar a Supabase
        router.replace('/(tabs)/inicio');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Añadir Maceta</Text>

                <View style={styles.imageButtons}>
                    <TouchableOpacity onPress={handleTakePhoto} style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>📷 Tomar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePickFromGallery} style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>🖼 Elegir de galería</Text>
                    </TouchableOpacity>
                </View>

                {image && <Image source={{ uri: image }} style={styles.previewImage} />}

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#999"
                    onChangeText={(text) => handleChange('nombre', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Especie"
                    placeholderTextColor="#999"
                    onChangeText={(text) => handleChange('especie', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de siembra (DD/MM/AAAA)"
                    placeholderTextColor="#999"
                    onChangeText={(text) => handleChange('siembra', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Temperatura ideal (°C)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    onChangeText={(text) => handleChange('temperatura', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Humedad ideal (%)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    onChangeText={(text) => handleChange('humedad', text)}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelar]} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.guardar]} onPress={handleGuardar}>
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFDD',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#3D6775',
    },
    imageButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 10,
    },
    uploadButton: {
        flex: 1,
        backgroundColor: '#A2C579',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelar: {
        backgroundColor: '#882D2D',
    },
    guardar: {
        backgroundColor: '#A2C579',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
    },
});
