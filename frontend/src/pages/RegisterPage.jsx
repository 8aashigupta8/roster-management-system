import { useState } from "react";
import { createUser } from "../services/userService";

function RegisterPage() {

    const [formData, setFormData] = useState({
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
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await createUser(formData);

            console.log(response);

            alert("User created successfully");

            setFormData({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                employee_code: "",
                role: "EMPLOYEE",
            });

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.detail ||
                "Failed to create user"
            );
        }
    };

    return (
        <div>

            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="employee_code"
                    placeholder="Employee Code"
                    value={formData.employee_code}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="EMPLOYEE">
                        Employee
                    </option>

                    <option value="TEAM_LEADER">
                        Team Leader
                    </option>

                    <option value="DEPARTMENT_HEAD">
                        Department Head
                    </option>
                </select>

                <br /><br />

                <button type="submit">
                    Create User
                </button>

            </form>

        </div>
    );
}

export default RegisterPage;