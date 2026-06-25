import {
    useEffect,
    useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
    getUsers, createUser
} from "../../services/userService";

import Table
from "../../components/common/Table";

import PageHeader from "../../components/common/PageHeader";
import Loading from "../../components/common/Loading";

const columns = [

        {
            key: "first_name",
            title: "First Name",
        },

        {
            key: "last_name",
            title: "Last Name",
        },

        {
            key: "email",
            title: "Email",
        },

        {
            key: "employee_code",
            title: "Employee Code",
        },

        {
            key: "role",
            title: "Role",
        },
    ];

function UserManagementPage() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [formData, setFormData] =
    useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        employee_code: "",
        role: "EMPLOYEE",
    });

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

            await createUser(
                formData
            );

            alert(
                "User created successfully"
            );

            setFormData({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                employee_code: "",
                role: "EMPLOYEE",
            });

            await fetchUsers();

        } catch (error) {
            console.error(error);
            alert(
                "Failed to create user"
            );
        }
    };

    const fetchUsers =
            async () => {
                try {

                    const data =
                        await getUsers();

                    setUsers(data);

                } catch (error) {

                    console.error(
                        error
                    );
                    setError(
                        "Failed to load users."
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (error) {

        return (

            <DashboardLayout>

                <PageHeader
                    title="User Management"
                    subtitle="Manage users and roles."
                />

                <p>
                    {error}
                </p>

            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <h1>
                User Management
            </h1>

            <form
                onSubmit={handleSubmit}
            >

                <h2>
                    Create User
                </h2>

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={
                        formData.first_name
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={
                        formData.last_name
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={
                        formData.email
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={
                        formData.password
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <input
                    type="text"
                    name="employee_code"
                    placeholder="Employee Code"
                    value={
                        formData.employee_code
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option
                        value="EMPLOYEE"
                    >
                        Employee
                    </option>

                    <option
                        value="TEAM_LEADER"
                    >
                        Team Leader
                    </option>

                    <option
                        value="DEPARTMENT_HEAD"
                    >
                        Department Head
                    </option>

                </select>

                <br /><br />

                <button
                    type="submit"
                >
                    Create User
                </button>

            </form>

<hr />

            {
                loading
                ?
                <Loading />
                :
                (   
                    <Table
                        columns={columns}
                        data={users}
                    />
                )
            }

        </DashboardLayout>
    );
}

export default UserManagementPage;