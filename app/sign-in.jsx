import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSession } from '../ctx';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#bbb"
    autoCapitalize="none"
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
  />
);

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = () => {
    if (email === 'usuario@ejemplo.com' && password === 'password123') {
      setErrorMessage(null);
      signIn();
      router.replace('/');
    } else {
      setErrorMessage('Correo o contraseña incorrectos.');
    }
  };

  return (
    <LinearGradient colors={['#3b3b98', '#1e3799']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <InputField placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
        <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    width: '100%',
  },
  errorContainer: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f39c12',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

