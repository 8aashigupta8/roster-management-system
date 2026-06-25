import {
    Link, useNavigate
} from "react-router-dom";

import {
    useContext
} from "react";

import {
    AuthContext
} from "../context/AuthContext";

function Sidebar() {

    const {user, logout,} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: "250px",
                background: "#f4f4f4",
                padding: "20px",
            }}
        >

            <h2>
                RMS
            </h2>

            <hr />

            <p>

                <strong>
                    {user?.email}
                </strong>

            </p>

            <p>
                {user?.role}
            </p>

            <hr />

            {
                user?.role ===
                "SUPER_ADMIN" && (

                    <>
                        <Link to="/admin">
                            Dashboard
                        </Link>

                        <br />
                        <br />

                        <Link to="/users">
                            Users
                        </Link>

                        <br />
                        <br />

                        <Link to="/departments">
                            Departments
                        </Link>

                        <br />
                        <br />
                        <Link to="/shifts">
                            Shifts
                        </Link>

                        <br />
                        <br />
                        <Link to="/rosters">
                            Rosters
                        </Link>
                    </>
                )
            }

            {
                user?.role ===
                "DEPARTMENT_HEAD" && (

                    <>
                        <Link to="/department">
                            Dashboard
                        </Link>

                        <br />
                        <br />

                        <Link to="/rosters">
                            Rosters
                        </Link>
                    </>
                )
            }

            {
                user?.role ===
                "TEAM_LEADER" && (

                    <>
                        <Link to="/team">
                            Dashboard
                        </Link>

                        <br />
                        <br />

                        <Link to="/rosters">
                            Team Rosters
                        </Link>
                    </>
                )
            }

            {
                user?.role ===
                "EMPLOYEE" && (

                    <>
                        <Link to="/employee">
                            Dashboard
                        </Link>

                        <br />
                        <br />

                        <Link to="/my-rosters">
                            My Rosters
                        </Link>
                    </>
                )
            }

            <hr />

            <button
                onClick={() => {

                    logout();
                    navigate("/login");
                }}
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;