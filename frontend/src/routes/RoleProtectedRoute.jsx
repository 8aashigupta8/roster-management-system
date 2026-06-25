import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function RoleProtectedRoute({
    children,
    allowedRoles,
}) {

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

    // console.log("User:", user);
    // console.log("Allowed Roles:", allowedRoles);
    // console.log("User Role:", user?.role);
    const isAllowed =
        allowedRoles.includes(
            user.role
        );

    if (!isAllowed) {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return children;
}

export default RoleProtectedRoute;