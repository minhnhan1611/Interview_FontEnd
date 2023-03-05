import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateCurrentUser, updateProfile, updateEmail, updatePhoneNumber, } from "firebase/auth";
import auth from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const cancel = () => {
        return signOut(auth);
    };

    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser, email);
    }

    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return () => {
            unSubcribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                register,
                cancel,
                login,
                updateUserEmail,
            }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
