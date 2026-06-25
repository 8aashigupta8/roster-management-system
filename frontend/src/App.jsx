import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardRedirectPage from "./pages/DashboardRedirectPage";
import SuperAdminDashboard
from "./pages/SuperAdminDashboard";

import DepartmentHeadDashboard
from "./pages/DepartmentHeadDashboard";

import TeamLeaderDashboard
from "./pages/TeamLeaderDashboard";

import EmployeeDashboard
from "./pages/EmployeeDashboard";

import UnauthorizedPage
from "./pages/UnauthorizedPage";

import RoleProtectedRoute
from "./routes/RoleProtectedRoute";

import UserManagementPage
from "./features/users/UserManagementPage";

import DepartmentManagementPage
from "./pages/DepartmentManagementPage";

import ShiftManagementPage
from "./pages/ShiftManagementPage";

import RosterManagementPage
from "./pages/RosterManagementPage";

import RosterDetailPage from "./pages/RosterDetailPage";
import MyRostersPage
from "./pages/MyRostersPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (

        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardRedirectPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/unauthorized"
                    element={
                        <UnauthorizedPage />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN"
                            ]}
                        >
                            <SuperAdminDashboard />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN"
                            ]}
                        >
                            <UserManagementPage />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/departments"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN"
                            ]}
                        >
                            <DepartmentManagementPage />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/shifts"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN"
                            ]}
                        >
                            <ShiftManagementPage />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/department"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "DEPARTMENT_HEAD"
                            ]}
                        >
                            <DepartmentHeadDashboard />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/team"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "TEAM_LEADER"
                            ]}
                        >
                            <TeamLeaderDashboard />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/employee"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "EMPLOYEE"
                            ]}
                        >
                            <EmployeeDashboard />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/rosters"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "DEPARTMENT_HEAD",
                                "TEAM_LEADER",
                            ]}
                        >
                            <RosterManagementPage />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/rosters/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "DEPARTMENT_HEAD",
                                "TEAM_LEADER",
                                "EMPLOYEE"
                            ]}
                        >
                            <RosterDetailPage />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/my-rosters"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "EMPLOYEE"
                            ]}
                        >
                            <MyRostersPage />
                        </RoleProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
