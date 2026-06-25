import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import DashboardLayout
from "../layouts/DashboardLayout";

import Loading
from "../components/common/Loading";

import ErrorMessage
from "../components/common/ErrorMessage";

import PageHeader
from "../components/common/PageHeader";

import {
    getRosterById, bulkAssignShift, publishRoster, lockRoster, assignSingleShift
} from "../services/rosterService";

import {
    getUsers,
} from "../services/userService";

import {
    getShifts,
} from "../services/shiftService";
import {
    AuthContext
} from "../context/AuthContext";

function RosterDetailPage() {

    const { id } =
        useParams();

    const{user} = useContext(AuthContext);

    const [roster,
        setRoster] =
        useState(null);

    const [
        rosterGrid,
        setRosterGrid
    ] = useState({});

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    const [
        employees,
        setEmployees,
    ] = useState([]);

    const [
        shifts,
        setShifts,
    ] = useState([]);

    const [
        selectedCell,
        setSelectedCell
    ] = useState(null);

    const [
        formData,
        setFormData,
    ] = useState({

        shift: "",

        employees: [],

        dates: [],
    });

    const buildRosterGrid =
    (entries) => {
        const grid = {};
        entries.forEach(
            entry => {
                const employee =
                    entry.employee_email;
                if (
                    !grid[employee]
                ) {
                    grid[employee] = {};
                }

                grid[employee][
                    entry.date
                ] = {
                    shift_short_code: entry.shift_short_code,
                    color_code: entry.shift_color_code,
                };
            }
        );

        return grid;
    };

    const getDaysInMonth =
    (month, year) => {

        return new Date(
            year,
            month,
            0
        ).getDate();
    };

    const days =
    roster
        ? Array.from(
            {
                length:
                    getDaysInMonth(
                        roster.month,
                        roster.year
                    )
            },
            (_, index) =>
                index + 1
        )
        : [];

    const fetchRoster =
        async () => {
            try {
                const data =
                    await getRosterById(
                        id
                    );
                setRoster(
                    data
                );

                setRosterGrid(
                    buildRosterGrid(
                        data.entries
                    )
                );

                const employeesData =
                    await getUsers();
                setEmployees(
                    employeesData
                );

                const shiftsData =
                    await getShifts();
                setShifts(
                    shiftsData
                );

            } catch (error) {
                console.error(error);
                setError(
                    "Failed to load roster."
                );

            } finally {
                setLoading(
                    false
                );
            }
        };
    useEffect(() => {
        fetchRoster();
    }, [id]);

    useEffect(() => {
        console.log(rosterGrid);
    }, [rosterGrid]);

    const handlePublish =
    async () => {
        try {
            await publishRoster(id);
            alert(
                "Roster published successfully."
            );
            await fetchRoster();
        } catch (error) {
            console.error(error);
            alert(
                "Failed to publish roster."
            );
        }
    };

    const handleLock =
    async () => {
        try {
            await lockRoster(id);
            alert(
                "Roster locked successfully."
            );
            await fetchRoster();
        } catch (error) {
            console.error(error);
            alert(
                "Failed to lock roster."
            );
        }
    };

    const handleShiftChange =
        (e) => {
            setFormData({
                ...formData,
                shift: e.target.value,
            });
        };
    
    const handleEmployeeChange =
        (e) => {
            const selected =
                Array.from(
                    e.target.selectedOptions
                ).map(
                    option =>
                        option.value
                );
            setFormData({
                ...formData,
                employees:
                    selected,
            });
        };

    const handleDatesChange =
    (e) => {
        const dates =
            e.target.value
                .split(",")
                .map(
                    date =>
                        date.trim()
                );

        setFormData({
            ...formData,
            dates,
        });
    };

    const handleBulkAssign =
    async (e) => {
        e.preventDefault();
        try {
            await bulkAssignShift(
                id,
                formData
            );
            alert(
                "Bulk assignment completed."
            );
            await fetchRoster();
            setFormData({
                shift: "",
                employees: [],
                dates: [],
            });
        } catch (error) {
            console.error(error);
            alert(
                "Bulk assignment failed."
            );
        }
    };

    return (

        <DashboardLayout>

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
            { user?.role !== "EMPLOYEE" && roster?.status !== "LOCKED" && (
            <form
                onSubmit={
                    handleBulkAssign
                }
            >
                <h2>Bulk Assign Shift</h2>

                <select
                    value={
                        formData.shift
                    }
                    onChange={
                        handleShiftChange
                    }
                >
                    <option value="">
                        Select Shift
                    </option>
                    {
                        shifts.map(
                            shift => (
                                <option
                                    key={
                                        shift.id
                                    }
                                    value={
                                        shift.id
                                    }
                                >
                                    {
                                        shift.name
                                    }
                                </option>
                            )
                        )
                    }
                </select>
                <br /><br />
                <select
                    multiple
                    size="5"
                    value={formData.employees}
                    onChange={
                        handleEmployeeChange
                    }
                >
                    {
                        employees.map(
                            employee => (
                                <option
                                    key={
                                        employee.id
                                    }
                                    value={
                                        employee.id
                                    }
                                >
                                    {
                                        employee.email
                                    }
                                </option>
                            )
                        )
                    }
                </select>
                <br /><br />
                <input
                    type="text"
                    value={formData.dates}
                    placeholder="2026-06-01,2026-06-02"
                    onChange={
                        handleDatesChange
                    }
                />
                <br /><br />
                <button
                    type="submit"
                >
                    Assign Shift
                </button>
            </form>
            )}
            <hr />

            {
                roster &&
                (
                    <>
                        <PageHeader
                            title={
                                `${roster.sub_department_name}`
                            }

                            subtitle={
                                `${roster.month}/${roster.year}`
                            }
                        />

                        <h3>
                            Status:
                            {" "}
                            {roster.status}
                        </h3>
                        <br />

                        {   user?.role !== "EMPLOYEE" &&
                            roster.status === "DRAFT" && (
                                <button
                                    onClick={
                                        handlePublish
                                    }
                                >
                                    Publish Roster
                                </button>
                            )
                        }
                        {   user?.role !== "EMPLOYEE" &&
                            roster.status === "PUBLISHED" && (
                                <button
                                    onClick={
                                        handleLock
                                    }
                                >
                                    Lock Roster
                                </button>
                            )
                        }

                        <h2>
                            Roster Entries
                        </h2>
                        {
                            roster.entries.length === 0 && (
                                <p>
                                    No roster entries yet.
                                </p>
                            )
                        }
                        <table
                            border="1"
                            cellPadding="10"
                        >

                            <thead>

                                <tr>

                                    <th>
                                        Employee
                                    </th>

                                    {
                                        days.map(
                                            day => (

                                                <th
                                                    key={day}
                                                >
                                                    {day}
                                                </th>
                                            )
                                        )
                                    }

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    employees.map(
                                        employee => (

                                            <tr
                                                key={employee.id}
                                            >

                                                <td>
                                                    {employee.email}
                                                </td>

                                                {
                                                    days.map(
                                                        day => {

                                                            const date =
                                                                `${roster.year}-${String(
                                                                    roster.month
                                                                ).padStart(2, "0")}-${String(
                                                                    day
                                                                ).padStart(2, "0")}`;

                                                            const shiftData =
                                                                rosterGrid[
                                                                    employee.email
                                                                ]?.[
                                                                    date
                                                                ] || null;

                                                            return (

                                                                <td
                                                                    key={date}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        backgroundColor:
                                                                            shiftData
                                                                                ? shiftData.color_code
                                                                                : "#FFFFFF"
                                                                    }}
                                                                    onClick={() =>
                                                                        setSelectedCell({
                                                                            employee_id:
                                                                                employee.id,
                                                                            date,
                                                                        })
                                                                    }
                                                                >
                                                                    {shiftData
                                                                        ? shiftData.shift_short_code
                                                                        : "-"}
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                }

                                            </tr>
                                        )
                                    )
                                }

                            </tbody>
                        </table>
                        {   
                            user?.role !== "EMPLOYEE"
                            && roster?.status !== "LOCKED" &&
                            selectedCell && (
                                <div>
                                    <h3>Assign Shift</h3>
                                    <select
                                        onChange={async (e) => {
                                            try {
                                                await assignSingleShift(
                                                    id,
                                                    {
                                                        employee:
                                                            selectedCell.employee_id,
                                                        shift:
                                                            e.target.value,
                                                        date:
                                                            selectedCell.date,
                                                    }
                                                );

                                                await fetchRoster();
                                                setSelectedCell(
                                                    null
                                                );
                                            } catch (error) {
                                                console.error(
                                                    error
                                                );
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Select Shift
                                        </option>
                                        {
                                            shifts.map(
                                                shift => (
                                                    <option
                                                        key={
                                                            shift.id
                                                        }
                                                        value={
                                                            shift.id
                                                        }
                                                    >
                                                        {
                                                            shift.name
                                                        }
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </>
                )
            }
        </DashboardLayout>
    );
}

export default RosterDetailPage;