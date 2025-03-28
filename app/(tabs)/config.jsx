import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../ctx';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function ConfigScreen() {
    const { signOut } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.replace('/sign-in');
    };

    return (
        <View style={styles.container}>
            {/* Título actualizado */}
            <Text style={styles.title}>Configuraciones</Text>

            {/* Contenedor para opciones */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} disabled={true}>
                    <FontAwesome name="user" size={18} color="#fff" />
                    <Text style={styles.optionText}>Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} disabled={true}>
                    <FontAwesome name="bell" size={18} color="#fff" />
                    <Text style={styles.optionText}>Notificaciones</Text>
                </TouchableOpacity>
            </View>

            {/* Espaciador para empujar el botón de cerrar sesión al fondo */}
            <View style={styles.flexSpacer} />

            {/* Botón de Cerrar Sesión */}
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
    optionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#3D6775',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
        width: '90%',
        justifyContent: 'center',
        gap: 10,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    flexSpacer: {
        flex: 1, // Esto empuja el botón de logout al final
    },
    logoutButton: {
        backgroundColor: '#882D2D',
        paddingVertical: 14,
        borderRadius: 25,
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
