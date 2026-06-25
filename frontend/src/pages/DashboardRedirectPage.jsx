import { Navigate } from "react-router-dom";
import { useContext } from "react";

import {
    AuthContext
} from "../context/AuthContext";

function DashboardRedirectPage() {

    const { user } =
        useContext(
            AuthContext
        );
    console.log("Dashboard redirect page:", user?.role);

    if (!user) {

        return (
            <div>
                Loading...
            </div>
        );
    }

    switch (
        user.role
    ) {

        case "SUPER_ADMIN":

            return (
                <Navigate
                    to="/admin"
                    replace
                />
            );

        case "DEPARTMENT_HEAD":

            return (
                <Navigate
                    to="/department"
                    replace
                />
            );

        case "TEAM_LEADER":

            return (
                <Navigate
                    to="/team"
                    replace
                />
            );

        case "EMPLOYEE":

            return (
                <Navigate
                    to="/employee"
                    replace
                />
            );

        default:

            return (
                <Navigate
                    to="/login"
                    replace
                />
            );
    }
}

export default DashboardRedirectPage;