import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const plantOptions = [
    { label: 'Mini cactus', value: 'Mini cactus' },
    { label: 'Lengua de suegra', value: 'Lengua de suegra' },
];

const dataByPlant = {
    'Mini cactus': {
        temperatura: [22, 25, 23, 28, 30, 27, 26],
        humedad: [20, 45, 28, 80, 99, 43, 50],
    },
    'Lengua de suegra': {
        temperatura: [24, 26, 27, 29, 28, 26, 25],
        humedad: [30, 35, 55, 70, 60, 45, 80],
    },
};

export default function Estadisticas() {
    const [selectedPlant, setSelectedPlant] = useState('Mini cactus');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(plantOptions);

    const plantData = dataByPlant[selectedPlant];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estadísticas</Text>

            <View style={styles.dropdownWrapper}>
                <DropDownPicker
                    open={open}
                    value={selectedPlant}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedPlant}
                    setItems={setItems}
                    style={{
                        backgroundColor: '#3D6775',
                        borderColor: '#3D6775',
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: '#3D6775',
                    }}
                    textStyle={{ color: '#FFFFDD', fontWeight: 'bold' }}
                    zIndex={1000}
                    zIndexInverse={3000}
                />
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.subtitle}>
                    Temperatura de <Text style={{ fontWeight: 'bold' }}>{selectedPlant}</Text>
                </Text>
                <BarChart
                    data={{
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{ data: plantData.temperatura }],
                    }}
                    width={width - 30}
                    height={220}
                    fromZero
                    yAxisSuffix="°C"
                    chartConfig={{
                        backgroundColor: '#FFFFDD',
                        backgroundGradientFrom: '#FFFFDD',
                        backgroundGradientTo: '#FFFFDD',
                        decimalPlaces: 0,
                        color: () => '#3D6775',
                        labelColor: () => '#3D6775',
                        propsForBackgroundLines: {
                            stroke: '#ccc',
                        },
                    }}
                    style={styles.chart}
                />

                <Text style={styles.subtitle}>
                    Humedad de <Text style={{ fontWeight: 'bold' }}>{selectedPlant}</Text>
                </Text>
                <BarChart
                    data={{
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{ data: plantData.humedad }],
                    }}
                    width={width - 30}
                    height={220}
                    fromZero
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundColor: '#FFFFDD',
                        backgroundGradientFrom: '#FFFFDD',
                        backgroundGradientTo: '#FFFFDD',
                        decimalPlaces: 0,
                        color: () => '#A2C579',
                        labelColor: () => '#3D6775',
                        propsForBackgroundLines: {
                            stroke: '#ccc',
                        },
                    }}
                    style={styles.chart}
                />
            </ScrollView>
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
});
