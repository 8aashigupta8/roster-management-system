import {
    useEffect,
    useState,
} from "react";

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
    getShifts,
    createShift
} from "../services/shiftService";

function ShiftManagementPage() {

    const [shifts,
        setShifts] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    const [formData, setFormData] =
    useState({

        name: "",

        shift_type: "MORNING",

        start_time: "",

        end_time: "",

        color_code: "#FFFFFF",

        is_weekoff: false,
    });

    const fetchShifts =
            async () => {

                try {

                    const data =
                        await getShifts();

                    setShifts(data);

                } catch (error) {

                    console.error(error);

                    setError(
                        "Failed to load shifts."
                    );

                } finally {

                    setLoading(false);
                }
            };

    useEffect(() => {
        fetchShifts();
    }, []);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await createShift(
                formData
            );

            alert(
                "Shift created successfully."
            );

            setFormData({

                name: "",

                shift_type:
                    "MORNING",

                start_time: "",

                end_time: "",

                color_code:
                    "#FFFFFF",

                is_weekoff:
                    false,
            });

            await fetchShifts();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to create shift."
            );
        }
    };

    const columns = [

        {
            key: "name",
            title: "Name",
        },

        {
            key: "shift_type",
            title: "Type",
        },

        {
            key: "start_time",
            title: "Start Time",
        },

        {
            key: "end_time",
            title: "End Time",
        },

        {
            key: "is_weekoff",
            title: "Week Off",
        },
    ];

    return (

        <DashboardLayout>

            <PageHeader
                title="Shift Management"
                subtitle="Manage roster shifts."
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

            <form
                onSubmit={handleSubmit}
            >

                <h2>
                    Create Shift
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Shift Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="shift_type"
                    value={formData.shift_type}
                    onChange={handleChange}
                >

                    <option value="MORNING">
                        Morning
                    </option>

                    <option value="EVENING">
                        Evening
                    </option>

                    <option value="NIGHT">
                        Night
                    </option>

                    <option value="OFF">
                        Off
                    </option>

                </select>

                <br /><br />

                <label>

                    Start Time

                    <br />

                    <input
                        type="time"
                        name="start_time"
                        value={
                            formData.start_time
                        }
                        onChange={
                            handleChange
                        }
                    />

                </label>

                <br /><br />

                <label>

                    End Time

                    <br />

                    <input
                        type="time"
                        name="end_time"
                        value={
                            formData.end_time
                        }
                        onChange={
                            handleChange
                        }
                    />

                </label>

                <br /><br />

                <label>

                    Color

                    <br />

                    <input
                        type="color"
                        name="color_code"
                        value={
                            formData.color_code
                        }
                        onChange={
                            handleChange
                        }
                    />

                </label>

                <br /><br />

                <label>

                    Week Off

                    <input
                        type="checkbox"
                        name="is_weekoff"
                        checked={
                            formData.is_weekoff
                        }
                        onChange={
                            handleChange
                        }
                    />

                </label>

                <br /><br />

                <button
                    type="submit"
                >
                    Create Shift
                </button>

            </form>

            <hr />

            {
                !loading &&
                !error &&
                (
                    <Table
                        columns={columns}
                        data={shifts}
                    />
                )
            }

        </DashboardLayout>
    );
}

export default ShiftManagementPage;