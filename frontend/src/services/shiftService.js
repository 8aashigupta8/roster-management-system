import axiosInstance from "../api/axios";

export const getShifts = async () => {

    const response =
        await axiosInstance.get(
            "/roster/shifts/"
        );

    return response.data;
};

export const createShift =
    async (data) => {

        const response =
            await axiosInstance.post(
                "/roster/shifts/",
                data
            );

        return response.data;
    };