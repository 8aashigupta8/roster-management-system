import { getUsers } from "./userService";

export const getDashboardStats =
    async () => {

        const users =
            await getUsers();

        return {

            totalUsers:
                users.length,

            totalEmployees:
                users.filter(
                    user =>
                        user.role ===
                        "EMPLOYEE"
                ).length,

            totalTeamLeaders:
                users.filter(
                    user =>
                        user.role ===
                        "TEAM_LEADER"
                ).length,

            totalDepartmentHeads:
                users.filter(
                    user =>
                        user.role ===
                        "DEPARTMENT_HEAD"
                ).length,
        };
    };