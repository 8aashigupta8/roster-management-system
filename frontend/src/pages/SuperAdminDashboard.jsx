import {
    useEffect,
    useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import StatsCard
from "../components/StatsCard";

import {
    getDashboardStats,
} from "../services/dashboardService";

function SuperAdminDashboard() {

    const [stats, setStats] =
        useState(null);

    useEffect(() => {

        const fetchStats =
            async () => {

                try {

                    const data =
                        await getDashboardStats();

                    setStats(
                        data
                    );

                } catch (error) {

                    console.error(
                        error
                    );
                }
            };

        fetchStats();

    }, []);

    if (!stats) {

        return (

            <DashboardLayout>

                <p>
                    Loading...
                </p>

            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <h1>
                Super Admin Dashboard
            </h1>

            <div
                style={{
                    display:
                        "flex",

                    gap:
                        "20px",

                    flexWrap:
                        "wrap",
                }}
            >

                <StatsCard
                    title="Users"
                    value={
                        stats.totalUsers
                    }
                />

                <StatsCard
                    title="Employees"
                    value={
                        stats.totalEmployees
                    }
                />

                <StatsCard
                    title="Team Leaders"
                    value={
                        stats.totalTeamLeaders
                    }
                />

                <StatsCard
                    title="Department Heads"
                    value={
                        stats.totalDepartmentHeads
                    }
                />

            </div>

        </DashboardLayout>
    );
}

export default SuperAdminDashboard;