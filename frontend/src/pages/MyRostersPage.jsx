import {
    useEffect,
    useState,
} from "react";

import { Link }
from "react-router-dom";
import DashboardLayout
from "../layouts/DashboardLayout";

import PageHeader
from "../components/common/PageHeader";

import Loading
from "../components/common/Loading";

import ErrorMessage
from "../components/common/ErrorMessage";

import {
    getMyRosters,
} from "../services/rosterService";

function MySchedulePage() {

    const [rosters,
        setRosters] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    useEffect(() => {
        const fetchRosters =
            async () => {
                try {
                    const data =
                        await getMyRosters();

                    setRosters(data);

                } catch (error) {
                    console.error(error);
                    setError(
                        "Failed to load rosters."
                    );
                } finally {
                    setLoading(false);
                }
            };

        fetchRosters();

    }, []);

    return (
        <DashboardLayout>
            <PageHeader
                title="My Rosters"
                subtitle="View your monthly rosters."
            />

            {
                loading &&
                <Loading />
            }
            {
                error &&
                (
                    <ErrorMessage
                        message={error}
                    />
                )
            }

            {
                !loading &&
                !error &&
                (
                    <table
                        border="1"
                        cellPadding="10"
                    >
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                rosters.map(
                                    roster => (

                                        <tr
                                            key={roster.id}
                                        >
                                            <td>
                                                {
                                                    roster.sub_department_name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    roster.month
                                                }
                                            </td>

                                            <td>
                                                {
                                                    roster.year
                                                }
                                            </td>

                                            <td>
                                                {
                                                    roster.status
                                                }
                                            </td>

                                            <td>
                                                <Link
                                                    to={`/rosters/${roster.id}`}
                                                >
                                                    View
                                                </Link>
                                            </td>

                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                )
            }
        </DashboardLayout>
    );
}

export default MySchedulePage;