from rest_framework import serializers

from .models import (
    Shift,
    Roster,
    RosterEntry
)

class ShiftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shift

        fields = '__all__'

class RosterEntrySerializer(serializers.ModelSerializer):

    employee_email = serializers.CharField(
        source='employee.email',
        read_only=True
    )

    shift_name = serializers.CharField(
        source='shift.name',
        read_only=True
    )

    shift_color_code = serializers.CharField(
        source="shift.color_code",
        read_only=True
    )

    shift_short_code = serializers.SerializerMethodField()

    def get_shift_short_code(self, obj):
        mapping = {
            "MORNING": "M",
            "EVENING": "E",
            "NIGHT": "N",
            "OFF": "O",
        }

        return mapping.get(
            obj.shift.shift_type,
            "-"
        )

    class Meta:
        model = RosterEntry

        fields = (
            'id',
            'roster',
            'employee',
            'employee_email',
            'shift',
            'shift_name',
            'shift_color_code',
            'shift_short_code',
            'date',
            'remarks',
        )

    def validate(self, data):

        employee = data['employee']
        date = data['date']
        roster = data['roster']

        if RosterEntry.objects.filter(
            employee=employee,
            date=date
        ).exists():

            raise serializers.ValidationError(
                "Employee already has shift assigned for this date."
            )
        
        if roster.status == 'LOCKED':
            raise serializers.ValidationError(
                "Locked roster cannot be modified."
            )

        return data

class RosterSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        exists = Roster.objects.filter(
            sub_department=attrs['sub_department'],
            month=attrs['month'],
            year=attrs['year']
        ).exists()

        if exists:
            raise serializers.ValidationError(
                "Roster already exists for this sub-department, month and year."
            )

        return attrs

    entries = RosterEntrySerializer(
        many=True,
        read_only=True
    )

    sub_department_name = serializers.CharField(
        source='sub_department.name',
        read_only=True
    )

    major_department_name = serializers.CharField(
    source='sub_department.major_department.name',
    read_only=True
    )

    class Meta:
        model = Roster

        fields = (
            'id',
            'sub_department',
            'sub_department_name',
            'major_department_name',
            'month',
            'year',
            'status',
            'created_by',
            'published_at',
            'entries',
        )

        read_only_fields = (
            'created_by',
            'published_at',
        )