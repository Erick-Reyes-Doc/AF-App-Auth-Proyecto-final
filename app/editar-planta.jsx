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
import { PLANTS } from '../data/plants';

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

    const [showDatePicker, setShowDatePicker] = useState(false);

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
        const temp = parseInt(form.temperaturaIdeal);
        const hum = parseInt(form.humedadIdeal);

        if (isNaN(temp) || temp < 0 || temp > 60) {
            Alert.alert('Error', 'La temperatura debe estar entre 0°C y 60°C.');
            return;
        }

        if (isNaN(hum) || hum < 0 || hum > 100) {
            Alert.alert('Error', 'La humedad debe estar entre 0% y 100%.');
            return;
        }

        Alert.alert('Cambios guardados', 'Los datos de la planta han sido actualizados.');
        router.back();
    };

    const handleCancelar = () => {
        router.back();
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const fecha = selectedDate.toLocaleDateString('es-MX');
            setForm({ ...form, siembra: fecha });
        }
    };

    if (!planta) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Planta no encontrada</Text>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
                    <Text style={styles.cancelText}>Volver</Text>
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

            {/* Fecha de siembra con calendario */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de siembra"
                    value={form.siembra}
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Temperatura ideal (0-60°C)"
                keyboardType="numeric"
                value={form.temperaturaIdeal}
                onChangeText={(text) =>
                    handleChange('temperaturaIdeal', text.replace(/[^0-9]/g, ''))
                }
            />
            <TextInput
                style={styles.input}
                placeholder="Humedad ideal (0-100%)"
                keyboardType="numeric"
                value={form.humedadIdeal}
                onChangeText={(text) =>
                    handleChange('humedadIdeal', text.replace(/[^0-9]/g, ''))
                }
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
        backgroundColor: '#D76363', // rojo
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#89AED3', // azul
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
