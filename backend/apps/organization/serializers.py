from rest_framework import serializers
from .models import MajorDepartment, SubDepartment

class MajorDepartmentSerializer(serializers.ModelSerializer):
    department_head_email = serializers.CharField(
        source= "department_head.email",
        read_only=True
    )

    class Meta:
        model = MajorDepartment

        fields = (
            "id",
            "name",
            "department_head",
            "department_head_email",
        )

class SubDepartmentSerializer(
    serializers.ModelSerializer
):

    major_department_name = serializers.CharField(
        source="major_department.name",
        read_only=True
    )

    team_leader_email = serializers.CharField(
        source="team_leader.email",
        read_only=True
    )

    class Meta:

        model = SubDepartment

        fields = (
            "id",
            "name",
            "major_department",
            "major_department_name",
            "team_leader",
            "team_leader_email",
        )