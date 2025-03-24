// app/_layout.jsx
import { SessionProvider } from '../ctx';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <SessionProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="detalle_planta"
                    options={{
                        presentation: 'modal',
                        title: 'Detalle de Planta',
                    }}
                />
            </Stack>
        </SessionProvider>
    );
}