// app/(tabs)/config.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../ctx';
import { useRouter } from 'expo-router';

export default function ConfigScreen() {
    const { signOut } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.replace('/sign-in'); // Redirigir al login
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuraciones</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFDD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3D6775',
        marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#882D2D',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
