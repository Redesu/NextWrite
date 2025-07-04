'use client';
import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { config } from "process";

type AuthContextType = {
    user: any;
    loading: boolean;
    register: (formData: FormData) => Promise<any>;
    login: (formData: FormData) => Promise<any>;
    logout: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                    withCredentials: true
                });
                setUser(res.data)
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);


    const register = async (formData: FormData) => {
        try {
            const data = Object.fromEntries(formData.entries());
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data, {
                withCredentials: true
            });
            setUser(res.data);
            router.push('/');
            return { success: true };
        } catch (err) {
            return { success: false, message: (err as Error).message || 'Register failed' };
        };
    };

    const login = async (formData: FormData) => {
        try {
            const data = Object.fromEntries(formData.entries());
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data, {
                withCredentials: true
            });
            console.log(res.data);
            router.push('/');
            return { success: true };
        } catch (err) {
            return { success: false, message: (err as Error).message || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
                withCredentials: true
            });
            setUser(null);
            Cookies.remove('acessToken');
            Cookies.remove('refreshToken');
            router.push('/login');
        } catch (err) {
            return { success: false, message: (err as Error).message || 'Logout failed' };
        }
    };

    const refreshToken = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
                withCredentials: true
            });
            setUser(res.data);
            return true;
        } catch (err) {
            return false;
        }
    };


    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    const accessToken = Cookies.get('acessToken');
                    if (accessToken) {
                        config.headers['Authorization'] = `Bearer ${accessToken}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(requestInterceptor);
        };
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
