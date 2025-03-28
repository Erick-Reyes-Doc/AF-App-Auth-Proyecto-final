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
    Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { obtenerMacetaPorId, editarMaceta } from '../utils/macetasService';

const { width } = Dimensions.get('window');

export default function EditarPlanta() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [form, setForm] = useState({
        nombre: '',
        especie: '',
        siembra: '',
        temperatura: '',
        humedad: '',
        imagen_url: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    // Cargar datos de la maceta
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const planta = await obtenerMacetaPorId(id);
                setForm({
                    nombre: planta.nombre,
                    especie: planta.especie,
                    siembra: planta.creado_en || new Date().toISOString(),
                    temperatura: String(planta.temperatura),
                    humedad: String(planta.humedad),
                    imagen_url: planta.imagen_url,
                });
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los datos de la maceta.');
            }
        };
        cargarDatos();
    }, [id]);

    // Guardar cambios
    const handleGuardar = async () => {
        const temp = parseFloat(form.temperatura);
        const hum = parseFloat(form.humedad);

        if (isNaN(temp) || temp < 0 || temp > 60) {
            Alert.alert('Error', 'La temperatura debe estar entre 0°C y 60°C.');
            return;
        }

        if (isNaN(hum) || hum < 0 || hum > 100) {
            Alert.alert('Error', 'La humedad debe estar entre 0% y 100%.');
            return;
        }

        try {
            const datosActualizados = {
                ...form,
                id,
                temperatura: temp,
                humedad: hum,
            };
            await editarMaceta(datosActualizados);
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
            router.replace('/(tabs)/inicio');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la maceta.');
        }
    };

    // Cancelar edición
    const handleCancelar = () => {
        router.back();
    };

    // Manejar cambios en el formulario
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    // Manejar la selección de la fecha
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setForm((prev) => ({ ...prev, siembra: selectedDate.toISOString() }));
        }
    };

    if (!form.nombre) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Cargando o planta no encontrada</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Planta</Text>

            {form.imagen_url ? (
                <Image source={{ uri: form.imagen_url }} style={styles.image} />
            ) : (
                <Text style={styles.notFound}>Imagen no disponible</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={form.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Especie"
                value={form.especie}
                onChangeText={(text) => handleChange('especie', text)}
            />

            {/* Calendario */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de siembra"
                    value={new Date(form.siembra).toLocaleDateString('es-MX')}
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={new Date(form.siembra)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Temperatura ideal (0-60°C)"
                keyboardType="numeric"
                value={form.temperatura}
                onChangeText={(text) => handleChange('temperatura', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Humedad ideal (0-100%)"
                keyboardType="numeric"
                value={form.humedad}
                onChangeText={(text) => handleChange('humedad', text)}
            />

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 25,
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 14,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 14,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 14,
        marginTop: 20,
        width: '100%',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#8ED739',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#C25E5E',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
    notFound: {
        marginTop: 60,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
});
