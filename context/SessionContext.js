import API from '@/common/paths';
import { useContext, createContext, useState } from 'react';

const SessionContext = createContext({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(SessionContext);

    return value;
}

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(API.LOGIN, { email, password }, { withCredentials: true });
            setSession(response.data.user); // Store user data from the API response
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setSession(null); // Clear the session state
        // Optionally, you can make an API call to invalidate the session on the server
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
            .catch(error => console.error("Logout failed:", error));
    };

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
}