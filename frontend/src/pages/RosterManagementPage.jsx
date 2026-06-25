import {
    useEffect,
    useState,
} from "react";
import { Link } from "react-router-dom";

import DashboardLayout
from "../layouts/DashboardLayout";

import PageHeader
from "../components/common/PageHeader";

import Loading
from "../components/common/Loading";

import ErrorMessage
from "../components/common/ErrorMessage";

import Table
from "../components/common/Table";

import {
    getRosters, createRoster
} from "../services/rosterService";

import {
    getSubDepartments,
} from "../services/subDepartmentService";

function RosterManagementPage() {

    const [rosters,
        setRosters] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    const [
        subDepartments,
        setSubDepartments,
    ] = useState([]);

    const [
        formData,
        setFormData,
    ] = useState({

        sub_department: "",

        month:
            new Date().getMonth() + 1,

        year:
            new Date().getFullYear(),
    });

    const fetchRosters =
        async () => {

            try {

                const data =
                    await getRosters();

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

    useEffect(() => {

    const initialize =
            async () => {

                await fetchRosters();

                try {

                    const data =
                        await getSubDepartments();

                    setSubDepartments(
                        data
                    );

                } catch (error) {

                    console.error(error);
                }
            };

        initialize();

    }, []);

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,
            });
        };
    
    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await createRoster(
                formData
            );

            alert(
                "Roster created successfully."
            );

            setFormData({

                sub_department: "",

                month:
                    new Date()
                        .getMonth() + 1,

                year:
                    new Date()
                        .getFullYear(),
            });

            await fetchRosters();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to create roster."
            );
        }
    };

    const columns = [

        {
            key: "major_department_name",
            title: "Major Department",
        },
        {
            key:
                "sub_department_name",

            title:
                "Sub Department",
        },

        {
            key:
                "month",

            title:
                "Month",
        },

        {
            key:
                "year",

            title:
                "Year",
        },

        {
            key:
                "status",

            title:
                "Status",
        },
    ];

    return (

        <DashboardLayout>

            <PageHeader
                title=
                    "Roster Management"

                subtitle=
                    "Manage department rosters."
            />

            {
                loading &&
                <Loading />
            }

            {
                error &&
                (
                    <ErrorMessage
                        message={
                            error
                        }
                    />
                )
            }

            <form
                onSubmit={handleSubmit}
            >
                <h2>
                    Create Roster
                </h2>

                <select
                    name="sub_department"
                    value={
                        formData.sub_department
                    }
                    onChange={
                        handleChange
                    }
                >

                    <option value="">
                        Select Sub Department
                    </option>

                    {
                        subDepartments.map(
                            department => (

                                <option
                                    key={
                                        department.id
                                    }
                                    value={
                                        department.id
                                    }
                                >

                                    {
                                        department.name
                                    }

                                </option>
                            )
                        )
                    }
                </select>
                <br /><br />

                <input
                    type="number"
                    name="month"
                    min="1"
                    max="12"
                    value={
                        formData.month
                    }
                    onChange={
                        handleChange
                    }
                />
                <br /><br />

                <input
                    type="number"
                    name="year"
                    min="2024"
                    value={
                        formData.year
                    }
                    onChange={
                        handleChange
                    }
                />
                <br /><br />

                <button
                    type="submit"
                >
                    Create Roster
                </button>
            </form>
            <hr />

            {
                !loading &&
                !error &&
                (
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>

                                {
                                    columns.map(
                                        column => (

                                            <th
                                                key={
                                                    column.key
                                                }
                                            >

                                                {
                                                    column.title
                                                }

                                            </th>
                                        )
                                    )
                                }

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
                                            {roster.major_department_name}
                                        </td>

                                        <td>
                                            {roster.sub_department_name}
                                        </td>

                                        <td>
                                            {roster.month}
                                        </td>

                                        <td>
                                            {roster.year}
                                        </td>

                                        <td>
                                            {roster.status}
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

export default
RosterManagementPage;