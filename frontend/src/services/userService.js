import axiosInstance from "../api/axios";

export const getUsers = async () => {

    const response = await axiosInstance.get(
        "/accounts/users/"
    );

    return response.data;
};

export const createUser = async (data) => {

    const response = await axiosInstance.post(
        "/accounts/users/",
        data
    );

    return response.data;
};

export const getDepartmentHeads =
    async () => {

        const users =
            await getUsers();

        return users.filter(
            user =>
                user.role ===
                "DEPARTMENT_HEAD"
        );
    };