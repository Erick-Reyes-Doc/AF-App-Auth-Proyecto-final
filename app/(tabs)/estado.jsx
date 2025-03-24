import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadoScreen() {
    const chartData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 50],
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estadísticas</Text>
            <Text style={styles.subtitle}>Reporte de datos</Text>

            <View style={styles.card}>
                <Text style={styles.cardText}>2 plantas con datos presentes</Text>
            </View>

            <Text style={styles.graphLabel}>Promedio de datos semanal</Text>

            <BarChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                fromZero
                showValuesOnTopOfBars
                chartConfig={{
                    backgroundColor: '#FFFFDD',
                    backgroundGradientFrom: '#FFFFDD',
                    backgroundGradientTo: '#FFFFDD',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(61, 103, 117, ${opacity})`,
                    labelColor: () => '#3D6775',
                    barPercentage: 0.5,
                }}
                style={styles.chart}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFDD',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#3D6775',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 20,
    },
    cardText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    graphLabel: {
        fontSize: 16,
        color: '#3D6775',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    chart: {
        borderRadius: 12,
    },
});
