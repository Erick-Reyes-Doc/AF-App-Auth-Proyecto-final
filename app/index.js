import { Redirect } from 'expo-router';
import { useSession } from '../ctx';

export default function Index() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    return <Redirect href="/(tabs)/inicio" />;
}
