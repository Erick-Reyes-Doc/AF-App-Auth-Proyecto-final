import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image,
    StyleSheet, Dimensions, KeyboardAvoidingView,
    Platform, ScrollView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import { addUser, findUser } from '../data/localUsers';

const { width } = Dimensions.get('window');

export default function Register() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    const handleRegister = async () => {
        if (!email || !confirmEmail || !password || !confirmPassword) {
            setErrorMessage('Por favor completa todos los campos.');
        } else if (email !== confirmEmail) {
            setErrorMessage('Los correos no coinciden.');
        } else if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
        } else if (await findUser(email)) {
            setErrorMessage('Este correo ya está registrado.');
        } else {
            await addUser({ email, password });
            setErrorMessage(null);
            alert('Registro exitoso 🎉');
            router.push('/sign-in');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                        <Text style={styles.title}>GreenMate</Text>
                        <Text style={styles.subtitle}>Registro</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#FFFFDD"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar correo electrónico"
                            placeholderTextColor="#FFFFDD"
                            value={confirmEmail}
                            onChangeText={setConfirmEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#FFFFDD"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#FFFFDD"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity>

                        <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/sign-in')}>
                            <Text style={styles.buttonText}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {!keyboardVisible && (
                        <Image
                            source={require('../assets/plantitareg.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
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
    image: {
        position: 'absolute',
        bottom: -120,
        left: 0,
        right: 0,
        alignSelf: 'center',
        width: 430,
        height: 370,
        zIndex: -1,
    },
});
