import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { addUser, findUser } from '../utils/authService';

const { width } = Dimensions.get('window');

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    // Función para manejar el registro
    const handleRegister = async () => {
        if (!username) {
            setErrorMessage('Por favor ingresa un nombre de usuario.');
            return;
        }
        if (!email || !password || !confirmPassword) {
            setErrorMessage('Por favor completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const userExists = await findUser(email);
            if (userExists) {
                setErrorMessage('Este correo ya está registrado.');
                return;
            }

            await addUser({ username, email, password });
            Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada correctamente!');
            router.push('/sign-in');
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage('Ocurrió un error durante el registro. Inténtalo nuevamente.');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                        <Text style={styles.title}>GreenMate</Text>
                        <Text style={styles.subtitle}>Registro</Text>

                        {/* Campo para el Nombre de Usuario */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            placeholderTextColor="#FFFFDD"
                            value={username}
                            onChangeText={setUsername}
                        />

                        {/* Campo para el Correo */}
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#FFFFDD"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        {/* Campo para la Contraseña */}
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#FFFFDD"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        {/* Confirmación de Contraseña */}
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#FFFFDD"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

                        {/* Botón de Registro */}
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity>

                        {/* Enlace a Iniciar Sesión */}
                        <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/sign-in')}>
                            <Text style={styles.buttonText}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A2C579',
    },
    wrapper: {
        flex: 1,
        position: 'relative',
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#FFFFDD',
        marginBottom: 40,
        fontFamily: 'System',
    },
    subtitle: {
        fontSize: 30,
        color: '#FFFFDD',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        backgroundColor: '#3D6775',
        padding: 14,
        borderRadius: 25,
        color: '#FFFFDD',
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#882D2D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#882D2D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        color: '#FFFFDD',
        marginTop: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: '#fff',
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        width: '100%',
        marginBottom: 10,
    },
});
