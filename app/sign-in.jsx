import React, { useState, useEffect } from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardEvent,
} from 'react-native';
import { useSession } from '../ctx';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSignIn = () => {
    if (email === 'usuario@ejemplo.com' && password === 'password123') {
      setErrorMessage(null);
      signIn();
      router.replace('/');
    } else {
      setErrorMessage('Correo o contraseña incorrectos.');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.root}>
      {/* Mostrar imagen solo si el teclado está oculto */}
      {!isKeyboardVisible && (
        <Image
          source={require('../assets/mano.png')}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={styles.contentWrapper}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>GreenMate</Text>
            <Text style={styles.subtitle}>Iniciar sesión</Text>

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#FFFFDD"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#FFFFDD"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>¿No tienes una cuenta?</Text>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerButtonText}>Regístrate</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#61A3BA',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    bottom: -35,        // Pegada al borde inferior
    right: -18  ,         // Pegada al borde derecho
    width: 430,
    height: 370,
  },
  

  scrollContent: {
    paddingTop: 60,
    paddingBottom: 150,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#FFFFDD',
    marginBottom: 40,
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
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    color: '#FFFFDD',
    marginTop: 25,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#882D2D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 2,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  error: {
    color: '#fff',
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    width: '100%',
    marginTop: -5,
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
    overflow: 'hidden',   // Opcional: evita que se desborde la imagen
  },
  
});
