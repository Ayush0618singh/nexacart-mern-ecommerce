import {
    createContext,
    useState,
    useEffect,
} from "react";

export const AuthContext =
    createContext();


function AuthProvider({ children }) {

    // =====================================================
    // LOAD USER FROM LOCAL STORAGE
    // =====================================================

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;

    });


    // =====================================================
    // SAVE / REMOVE USER
    // =====================================================

    useEffect(() => {

        if (user) {

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

        } else {

            localStorage.removeItem(
                "user"
            );

        }

    }, [user]);


    // =====================================================
    // UPDATE USER DATA
    // =====================================================

    const updateUser = (updatedData) => {

        setUser((currentUser) => {

            if (!currentUser) {
                return updatedData;
            }

            return {
                ...currentUser,
                ...updatedData,
            };

        });

    };


    // =====================================================
    // CONTEXT
    // =====================================================

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}


export default AuthProvider;