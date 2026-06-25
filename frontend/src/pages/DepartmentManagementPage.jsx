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
    getDepartments,
} from "../services/departmentService";

import {
    createDepartment,
} from "../services/departmentService";

import {
    getDepartmentHeads,
} from "../services/userService";

function DepartmentManagementPage() {

    const [departments,
        setDepartments] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    const [
        departmentHeads,
        setDepartmentHeads,
    ] = useState([]);

    const [
        formData,
        setFormData,
    ] = useState({

        name: "",

        department_head: "",
    });

    useEffect(() => {

        const fetchDepartments =
            async () => {

                try {

                    const data =
                        await getDepartments();

                    setDepartments(
                        data
                    );

                    const heads =
                        await getDepartmentHeads();

                    setDepartmentHeads(
                        heads
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                    setError(
                        "Failed to load departments."
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchDepartments();

    }, []);

    const handleChange = (e) => {
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

            await createDepartment(
                formData
            );

            alert(
                "Department created successfully."
            );

            setFormData({
                name: "",
                department_head: "",
            });

            const data =
                await getDepartments();

            setDepartments(
                data
            );

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Failed to create department."
            );
        }
    };

    const columns = [

        {
            key: "name",
            title: "Department Name",
        },

        {
            key:
                "department_head_email",

            title:
                "Department Head",
        },
    ];

    return (

        <DashboardLayout>

            <PageHeader
                title=
                    "Departments"

                subtitle=
                    "Manage company departments."
            />

            {
                loading
                &&
                <Loading />
            }

            {
                error
                &&
                (
                    <ErrorMessage
                        message={
                            error
                        }
                    />
                )
            }

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <h2>
                    Create Department
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder=
                        "Department Name"
                    value={
                        formData.name
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <select
                    name=
                        "department_head"
                    value={
                        formData.department_head
                    }
                    onChange={
                        handleChange
                    }
                >

                    <option value="">
                        Select Department Head
                    </option>

                    {
                        departmentHeads.map(
                            head => (

                                <option
                                    key={
                                        head.id
                                    }
                                    value={
                                        head.id
                                    }
                                >

                                    {
                                        head.email
                                    }

                                </option>
                            )
                        )
                    }

                </select>

                <br /><br />

                <button
                    type="submit"
                >
                    Create Department
                </button>
            </form>

            <hr />

            {
                !loading &&
                !error &&
                (
                    <Table
                        columns={
                            columns
                        }
                        data={
                            departments
                        }
                    />
                )
            }

        </DashboardLayout>
    );
}

export default DepartmentManagementPage;