from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated)
from .models import MajorDepartment, SubDepartment
from .serializers import (MajorDepartmentSerializer, SubDepartmentSerializer)

class MajorDepartmentViewSet(viewsets.ModelViewSet):
    queryset = MajorDepartment.objects.select_related(
            "department_head"
        )

    serializer_class = (
        MajorDepartmentSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

class SubDepartmentViewSet(viewsets.ModelViewSet):
    queryset = (
        SubDepartment.objects
        .select_related(
            "major_department",
            "team_leader"
        )
    )

    serializer_class = (
        SubDepartmentSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        user = self.request.user

        if user.role == "SUPER_ADMIN":
            return self.queryset

        elif user.role == "DEPARTMENT_HEAD":

            return self.queryset.filter(
                major_department__department_head=user
            )

        elif user.role == "TEAM_LEADER":

            return self.queryset.filter(
                team_leader=user
            )

        return self.queryset.none()
