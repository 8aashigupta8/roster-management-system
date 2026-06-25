import {
    createContext,
    useState,
    useEffect
} from "react";

import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] =
        useState(
            localStorage.getItem("access")
        );

    const [user, setUser] =
        useState(null);

    const fetchCurrentUser =
        async () => {

            try {

                const response =
                    await axiosInstance.get(
                        "/accounts/users/me/"
                    );

                setUser(response.data);

            } catch (error) {

                console.error(
                    "Failed to fetch current user",
                    error
                );

                logout();
            }
        };

    const login = async (token) => {

        localStorage.setItem(
            "access",
            token
        );

        setAccessToken(token);

        const response =
        await axiosInstance.get(
            "/accounts/users/me/"
        );

        setUser(response.data);
    };

    const logout = () => {

        localStorage.removeItem(
            "access"
        );
        localStorage.removeItem(
            "refresh"
        );
        setAccessToken(null);
        setUser(null);
    };

    useEffect(() => {

        const initializeAuth =
        async () => {

            if (!accessToken) {
                return;
            }

            try {

                const response =
                    await axiosInstance.get(
                        "/accounts/users/me/"
                    );

                setUser(response.data);

            } catch {

                logout();
            }
        };

    initializeAuth();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                accessToken,
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};