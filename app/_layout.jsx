import { SessionProvider } from '../ctx';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <SessionProvider>
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="anadir-maceta" options={{ headerShown: false }} />
                <Stack.Screen name="editar-planta" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="detalle-planta"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </SessionProvider>
    );
}
