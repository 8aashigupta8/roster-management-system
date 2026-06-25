import axiosInstance
from "../api/axios";

export const getSubDepartments =
    async () => {

        const response =
            await axiosInstance.get(
                "/organization/sub-departments/"
            );

        return response.data;
    };