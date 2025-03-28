import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
import { obtenerMacetas } from '../../utils/macetasService';

const { width } = Dimensions.get('window');

export default function Estadisticas() {
    const [plantas, setPlantas] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [plantOptions, setPlantOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Obtener las macetas desde AsyncStorage
    useEffect(() => {
        const cargarPlantas = async () => {
            try {
                const macetas = await obtenerMacetas();
                if (macetas.length === 0) {
                    setLoading(false);
                    return;
                }
                
                setPlantas(macetas);
                setPlantOptions(macetas.map((planta) => ({
                    label: planta.nombre,
                    value: planta.id,
                })));
                
                setSelectedPlant(macetas[0].id); // Selecciona la primera planta por defecto
            } catch (error) {
                console.error('Error al cargar macetas:', error);
            } finally {
                setLoading(false);
            }
        };

        cargarPlantas();
    }, []);

    const generarDatosSimulados = (min, max) =>
        Array.from({ length: 7 }, () => Math.floor(Math.random() * (max - min + 1) + min));

    const obtenerDatosPlanta = () => {
        const plantaSeleccionada = plantas.find((planta) => planta.id === selectedPlant);

        if (!plantaSeleccionada) return null;

        return {
            temperatura: generarDatosSimulados(20, 35),
            humedad: generarDatosSimulados(30, 80),
        };
    };

    const plantData = obtenerDatosPlanta();

    if (loading) {
        return <ActivityIndicator size="large" color="#A2C579" style={{ marginTop: 50 }} />;
    }

    if (!selectedPlant || !plantData) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Estadísticas</Text>
                <Text style={styles.errorText}>No hay plantas disponibles</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estadísticas</Text>

            {/* Dropdown para seleccionar la planta */}
            <View style={styles.dropdownWrapper}>
                <DropDownPicker
                    open={open}
                    value={selectedPlant}
                    items={plantOptions}
                    setOpen={setOpen}
                    setValue={setSelectedPlant}
                    setItems={setPlantOptions}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    zIndex={1000}
                    zIndexInverse={3000}
                />
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Gráfico de Temperatura */}
                <Text style={styles.subtitle}>Temperatura de {plantOptions.find(p => p.value === selectedPlant)?.label}</Text>
                <BarChart
                    data={{
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{ data: plantData.temperatura }],
                    }}
                    width={width - 30}
                    height={220}
                    fromZero
                    yAxisSuffix="°C"
                    chartConfig={chartConfig('#3D6775')}
                    style={styles.chart}
                />

                {/* Gráfico de Humedad */}
                <Text style={styles.subtitle}>Humedad de {plantOptions.find(p => p.value === selectedPlant)?.label}</Text>
                <BarChart
                    data={{
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{ data: plantData.humedad }],
                    }}
                    width={width - 30}
                    height={220}
                    fromZero
                    yAxisSuffix="%"
                    chartConfig={chartConfig('#A2C579')}
                    style={styles.chart}
                />
            </ScrollView>
        </View>
    );
}

const chartConfig = (color) => ({
    backgroundColor: '#FFFFDD',
    backgroundGradientFrom: '#FFFFDD',
    backgroundGradientTo: '#FFFFDD',
    decimalPlaces: 0,
    color: () => color,
    labelColor: () => '#3D6775',
    propsForBackgroundLines: {
        stroke: '#ccc',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFDD',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#3D6775',
        marginBottom: 12,
        textAlign: 'center',
        marginTop: 20,
    },
    chart: {
        borderRadius: 12,
        alignSelf: 'center',
    },
    dropdownWrapper: {
        zIndex: 1000,
        marginBottom: 25,
        width: '90%',
        alignSelf: 'center',
    },
    dropdown: {
        backgroundColor: '#3D6775',
        borderColor: '#3D6775',
    },
    dropdownContainer: {
        backgroundColor: '#3D6775',
    },
    dropdownText: {
        color: '#FFFFDD',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: '#e74c3c',
        textAlign: 'center',
        marginTop: 20,
    },
});
