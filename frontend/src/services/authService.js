import axiosInstance from "../api/axios";

export const loginUser = async (data) => {

    const response = await axiosInstance.post(
        "/token/",
        data
    );

    return response.data;
};