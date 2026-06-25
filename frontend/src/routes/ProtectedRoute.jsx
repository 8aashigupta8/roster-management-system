import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const {
        accessToken,
        user,
    } = useContext(AuthContext);

    if (!accessToken) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (!user) {

        return (
            <div>
                Loading...
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;