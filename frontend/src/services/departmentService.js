import axiosInstance from "../api/axios";

export const getDepartments =
    async () => {
        const response =
            await axiosInstance.get(
                "/organization/major-departments/"
            );

        return response.data;
    };

export const createDepartment =
async (data) => {
    const response =
        await axiosInstance.post(
            "/organization/major-departments/",
            data
        );

    return response.data;
};