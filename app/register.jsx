import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Register() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRegister = () => {
        if (!email || !confirmEmail || !password || !confirmPassword) {
            setErrorMessage('Por favor completa todos los campos.');
        } else if (email !== confirmEmail) {
            setErrorMessage('Los correos no coinciden.');
        } else if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
        } else {
            setErrorMessage(null);
            // Aquí puedes integrar Supabase u otro backend
            router.replace('/'); // Redirige a la home
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.curvedBackground} />

                    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
                        <TouchableOpacity onPress={() => router.push('/sign-in')}>
                            <Text style={styles.registerLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/planta.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A2C579',
        justifyContent: 'space-between',
    },
    curvedBackground: {
        position: 'absolute',
        top: 0,
        width: width,
        height: '70%',
        backgroundColor: '#61A3BA',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        zIndex: 0,
    },
    content: {
        paddingTop: 100,
        paddingHorizontal: 30,
        alignItems: 'center',
        zIndex: 2,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFDD',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFDD',
        marginBottom: 25,
    },
    input: {
        width: '100%',
        backgroundColor: '#3D6775',
        padding: 14,
        borderRadius: 25,
        color: '#FFFFDD',
        fontSize: 16,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#882D2D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        color: '#FFFFDD',
        marginTop: 20,
        fontSize: 14,
    },
    registerLink: {
        color: '#FFFFDD',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 4,
    },
    error: {
        color: '#fff',
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        width: '100%',
        marginTop: 5,
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    image: {
        width: 455,
        height: 370,
        opacity: 0.9,
    },
});
