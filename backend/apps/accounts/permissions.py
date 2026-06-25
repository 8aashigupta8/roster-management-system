from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSuperAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'SUPER_ADMIN'
    
class IsDepartmentHead(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'DEPARTMENT_HEAD'
    
class IsTeamLeader(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'TEAM_LEADER'
    
class IsSuperAdminOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return request.user.role == 'SUPER_ADMIN'