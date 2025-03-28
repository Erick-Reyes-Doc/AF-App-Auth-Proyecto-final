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
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { guardarMaceta } from '../utils/macetasService';

export default function AñadirMaceta() {
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: '',
        especie: '',
        temperatura: '',
        humedad: '',
    });

    const [image, setImage] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
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

    const handleGuardar = async () => {
        const camposVacios = Object.values(form).some((val) => val === '');
        if (camposVacios || !image) {
            Alert.alert('Error', 'Completa todos los campos y agrega una imagen.');
            return;
        }

        const nuevaMaceta = {
            nombre: form.nombre,
            especie: form.especie,
            temperatura: parseFloat(form.temperatura),
            humedad: parseFloat(form.humedad),
            creado_en: date.toISOString(),
            imagen_url: image,
        };

        try {
            await guardarMaceta(nuevaMaceta);
            Alert.alert('Éxito', 'Maceta guardada correctamente');
            router.replace('/(tabs)/inicio');
        } catch (error) {
            console.error('Error al guardar:', error);
            Alert.alert('Error', 'Hubo un problema al guardar la maceta.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Añadir Maceta</Text>

                    <View style={styles.imageButtons}>
                        <TouchableOpacity onPress={handleTakePhoto} style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>📷 Tomar Foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handlePickFromGallery} style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>🖼 Galería</Text>
                        </TouchableOpacity>
                    </View>

                    {image && <Image source={{ uri: image }} style={styles.previewImage} />}

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        placeholderTextColor="#666"
                        onChangeText={(text) => handleChange('nombre', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Especie"
                        placeholderTextColor="#666"
                        onChangeText={(text) => handleChange('especie', text)}
                    />
                    <Pressable onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de siembra"
                            value={date.toLocaleDateString('es-MX')}
                            editable={false}
                            placeholderTextColor="#666"
                        />
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Temperatura ideal (°C)"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        onChangeText={(text) => handleChange('temperatura', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Humedad ideal (%)"
                        placeholderTextColor="#666"
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
            </TouchableWithoutFeedback>
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
        color: '#3D6775',
        marginBottom: 25,
    },
    imageButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    uploadButton: {
        flex: 1,
        backgroundColor: '#A2C579',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 14,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
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
        fontSize: 16,
    },
});
