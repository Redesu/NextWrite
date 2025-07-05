import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@radix-ui/themes';




export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading || !user) {
        return <Spinner />;
    }

    if (!user && !loading) {
        router.push('/login');
        return null;
    }

    return <>{children}</>;
}