import AsyncStorage from '@react-native-async-storage/async-storage';

// Posibles estados para las macetas
const estadosPlanta = ['Óptima', 'Baja', 'Seca', 'Exceso'];

// Obtener un estado aleatorio
function obtenerEstadoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * estadosPlanta.length);
    return estadosPlanta[indiceAleatorio];
}

// ✅ Guardar una maceta
export async function guardarMaceta(maceta) {
    try {
        if (!maceta || !maceta.nombre || !maceta.especie) {
            throw new Error('Faltan datos obligatorios para guardar la maceta');
        }

        const macetas = await obtenerMacetas();

        // Asignar un estado aleatorio al guardar
        const nuevaMaceta = {
            ...maceta,
            id: Date.now().toString(),
            creado_en: new Date().toISOString(),
            estado: obtenerEstadoAleatorio(), // ✅ Estado aleatorio asignado
        };

        const nuevasMacetas = [...macetas, nuevaMaceta];
        await AsyncStorage.setItem('macetas', JSON.stringify(nuevasMacetas));

        console.log('✅ Maceta guardada exitosamente:', nuevaMaceta);
        return nuevaMaceta;
    } catch (error) {
        console.error('❗ Error al guardar la maceta:', error);
        throw error;
    }
}

// ✅ Obtener todas las macetas
export async function obtenerMacetas() {
    try {
        const data = await AsyncStorage.getItem('macetas');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('❗ Error al obtener las macetas:', error);
        return [];
    }
}

// ✅ Obtener una maceta por ID
export async function obtenerMacetaPorId(id) {
    try {
        const macetas = await obtenerMacetas();
        const maceta = macetas.find((m) => m.id === id);

        if (!maceta) {
            throw new Error('Maceta no encontrada');
        }
        return maceta;
    } catch (error) {
        console.error('❗ Error al obtener la maceta por ID:', error);
        throw error;
    }
}

// ✅ Eliminar una maceta
export async function eliminarMaceta(id) {
    try {
        const macetas = await obtenerMacetas();
        const nuevasMacetas = macetas.filter((m) => m.id !== id);
        await AsyncStorage.setItem('macetas', JSON.stringify(nuevasMacetas));
        console.log('🗑️ Maceta eliminada:', id);
        return nuevasMacetas;
    } catch (error) {
        console.error('❗ Error al eliminar la maceta:', error);
        throw error;
    }
}

// ✅ Editar una maceta
export async function editarMaceta(macetaActualizada) {
    try {
        const macetas = await obtenerMacetas();
        const index = macetas.findIndex((m) => m.id === macetaActualizada.id);

        if (index === -1) {
            throw new Error('No se encontró la maceta para editar');
        }

        macetas[index] = { ...macetas[index], ...macetaActualizada };
        await AsyncStorage.setItem('macetas', JSON.stringify(macetas));

        console.log('✅ Maceta actualizada:', macetaActualizada);
        return macetaActualizada;
    } catch (error) {
        console.error('❗ Error al editar la maceta:', error);
        throw error;
    }
}
