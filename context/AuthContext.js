import { useContext, createContext, useState } from 'react';

const AuthContext = createContext({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);

    return value;
}

export function SessionProvider({ children }) {
    const [session, setSession] = useState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
            }}>
            {children}
        </AuthContext.Provider>
    );
}