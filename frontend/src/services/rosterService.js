import axiosInstance from "../api/axios";

export const getRosters =
    async () => {

        const response =
            await axiosInstance.get(
                "/roster/rosters/"
            );

        return response.data;
    };

export const getRosterById =
    async (id) => {
        const response =
            await axiosInstance.get(
                `/roster/rosters/${id}/`
            );

        return response.data;
    };

export const createRoster =
    async (data) => {

        const response =
            await axiosInstance.post(
                "/roster/rosters/",
                data
            );

        return response.data;
    };

export const bulkAssignShift =
    async (rosterId, data) => {

        const response =
            await axiosInstance.post(
                `/roster/rosters/${rosterId}/bulk_assign/`,
                data
            );

        return response.data;
    };

export const publishRoster =
    async (id) => {

        const response =
            await axiosInstance.post(
                `/roster/rosters/${id}/publish/`
            );

        return response.data;
    };

export const lockRoster =
    async (id) => {

        const response =
            await axiosInstance.post(
                `/roster/rosters/${id}/lock/`
            );

        return response.data;
    };

export const getMyRosters =
    async () => {
        const response =
            await axiosInstance.get(
                "/roster/rosters/my-rosters/"
            );

        return response.data;
    };

export const assignSingleShift =
    async (rosterId, data) => {
        const response =
            await axiosInstance.post(
                `/roster/rosters/${rosterId}/assign_single/`,
                data
            );
        return response.data;
    };

export const getRosterTeamMembers =
    async (rosterId) => {
        const response =
            await axiosInstance.get(
                `/roster/rosters/${rosterId}/team_members/`
            );

        return response.data;
    };