import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener usuarios registrados
export async function obtenerUsuarios() {
    try {
        const data = await AsyncStorage.getItem('usuarios');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('❗ Error al obtener los usuarios:', error);
        return [];
    }
}

// Buscar usuario por email
export async function findUser(email) {
    try {
        const usuarios = await obtenerUsuarios();
        const user = usuarios.find((u) => u.email === email);
        return user || null;
    } catch (error) {
        console.error('❗ Error al buscar usuario:', error);
        throw error;
    }
}

// Registrar un nuevo usuario
export async function addUser(usuario) {
    try {
        const usuarios = await obtenerUsuarios();

        // Verificar si el usuario ya existe por su email
        const usuarioExistente = usuarios.find((u) => u.email === usuario.email);
        if (usuarioExistente) {
            throw new Error('Este correo ya está registrado.');
        }

        // Agregar usuario con ID único
        const nuevoUsuario = { ...usuario, id: Date.now().toString() };
        usuarios.push(nuevoUsuario);

        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('✅ Usuario registrado:', nuevoUsuario);
        return nuevoUsuario;
    } catch (error) {
        console.error('❗ Error al registrar usuario:', error);
        throw error;
    }
}

// Guardar sesión del usuario
export async function signInUser(user) {
    try {
        await AsyncStorage.setItem('userSession', JSON.stringify(user));
        console.log('✅ Usuario logueado:', user.username);
    } catch (error) {
        console.error('❗ Error al guardar sesión:', error);
    }
}

// Obtener sesión actual
export async function getSession() {
    try {
        const sessionData = await AsyncStorage.getItem('userSession');
        if (!sessionData) {
            console.warn('⚠ No hay ninguna sesión activa.');
            return null;
        }
        const user = JSON.parse(sessionData);
        console.log('✅ Sesión activa:', user.username);
        return user;
    } catch (error) {
        console.error('❗ Error al obtener sesión:', error);
        return null;
    }
}

// Cerrar sesión
export async function signOutUser() {
    try {
        await AsyncStorage.removeItem('userSession');
        console.log('🚪 Sesión cerrada.');
    } catch (error) {
        console.error('❗ Error al cerrar sesión:', error);
    }
}
