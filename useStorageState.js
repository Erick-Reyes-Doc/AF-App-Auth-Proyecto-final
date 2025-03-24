import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

function useAsyncState(initialValue = [true, null]) {
  return useReducer(
    (state, action = null) => [false, action],
    initialValue
  );
}

// Guardar datos
export async function setStorageItemAsync(key, value) {
  const stringValue = value ? JSON.stringify(value) : null;

  if (Platform.OS === 'web') {
    try {
      if (stringValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, stringValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (stringValue == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, stringValue);
    }
  }
}

// Obtener datos
export function useStorageState(key) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    const load = async () => {
      let value = null;

      if (Platform.OS === 'web') {
        try {
          value = localStorage.getItem(key);
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        value = await SecureStore.getItemAsync(key);
      }

      try {
        const parsed = value ? JSON.parse(value) : null;
        setState(parsed);
      } catch (e) {
        console.warn('Failed to parse stored value:', e);
        setState(null);
      }
    };

    load();
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
