import { useState, useContext, useEffect } from "react";

import { loginUser } from "../services/authService";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    useEffect(() => {

        console.log("User Updated:", user);

    }, [user]);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    console.log("render");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await loginUser({
                email,
                password,
            });

            localStorage.setItem(
                "refresh",
                response.refresh
            );

            await login(
                response.access
            );
            navigate("/dashboard");

            alert("Login successful");
            console.log("Logged In");

        } catch (error) {

            console.error(error);

            alert("Login failed");
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
};

export default LoginPage;