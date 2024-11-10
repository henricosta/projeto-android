import axios from 'axios'; // Make sure to import axios
import API from '@/common/paths';
import { useContext, createContext, useState } from 'react';

const SessionContext = createContext({
    login: (email, senha, callback) => null,
    logout: (callback) => null,
    session: null,
    setSession: (user) => null,
    isLoading: false,
});

// Custom hook to access session information and actions
export function useSession() {
    return useContext(SessionContext);
}

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // To manage loading state

    const login = async (email, senha, callback) => {
        setIsLoading(true);
        try {
            const response = await axios.post(API.LOGIN, {
                email: email,
                password: senha
            }, { withCredentials: true });
            setSession(response.data.user); // Store user data from the API response~
            callback()
        } catch (error) {
            console.error("Login failed:", error);
            alert('login failed')
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (callback) => {
        setIsLoading(true);
        try {
            await axios.post(API.LOGOUT, {}, { withCredentials: true });
            setSession(null); // Clear the session state
            callback()
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SessionContext.Provider value={{ session, setSession, login, logout, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
}
