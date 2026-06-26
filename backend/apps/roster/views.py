from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .services import RosterService
from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer

from .models import (
    Shift,
    Roster,
    RosterEntry
)

from .serializers import (
    ShiftSerializer,
    RosterSerializer,
    RosterEntrySerializer
)

class ShiftViewSet(viewsets.ModelViewSet):

    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [IsAuthenticated]

class RosterViewSet(viewsets.ModelViewSet):

    serializer_class = RosterSerializer
    queryset = Roster.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # Super admin sees everything
        if user.role == 'SUPER_ADMIN':
            return Roster.objects.all()

        # Department head
        elif user.role == 'DEPARTMENT_HEAD':

            return Roster.objects.filter(
                sub_department__major_department__department_head=user
            )

        # Team leader
        elif user.role == 'TEAM_LEADER':
            return Roster.objects.filter(
                sub_department__team_leader=user
            )

        #Employee
        elif user.role == 'EMPLOYEE':
            return Roster.objects.filter(
                entries__employee=user,
                status__in=[
                    "PUBLISHED",
                    "LOCKED"
                ]
            ).distinct()
    
    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user
        )

    @action(detail=True, methods=['POST'])
    def publish(self, request, pk=None):

        roster = self.get_object()

        if roster.status == 'PUBLISHED':
            return Response(
                {'error': 'Roster is already published.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        roster.status = 'PUBLISHED'
        roster.save()

        return Response({
            'message': 'Roster published successfully.'
        })
    
    @action(detail=True, methods=['POST'])
    def lock(self, request, pk=None):
        roster = self.get_object()

        if roster.status == 'LOCKED':
            return Response(
                {'error': 'Roster is already locked.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        roster.status = 'LOCKED'
        roster.save()

        return Response({
            'message': 'Roster locked successfully.'
        })
    
    @action(detail=True, methods=['POST'])
    def bulk_assign(self, request, pk=None):

        roster = self.get_object()
        shift_id = request.data.get('shift')
        employee_ids = request.data.get('employees', [])
        dates = request.data.get('dates', [])
        shift = Shift.objects.get(id=shift_id)
        employees = User.objects.filter(
            id__in=employee_ids
        )

        created_entries = RosterService.bulk_assign_shift(
            roster=roster,
            shift=shift,
            employees=employees,
            dates=dates
        )

        return Response({
            'message': 'Bulk assignment completed.',
            'entries_created': len(created_entries)
        })
    
    @action(detail=False, methods=["GET"], url_path="my-rosters")
    def my_rosters(self, request):
        user = request.user
        rosters = Roster.objects.filter(
            entries__employee=user,
            status__in=[
                "PUBLISHED",
                "LOCKED"
            ]
        ).distinct()

        serializer = RosterSerializer(
            rosters,
            many=True
        )

        return Response(
            serializer.data
        )
    
    @action(detail=True, methods=["POST"])
    def assign_single(self, request, pk=None):
        roster = self.get_object()
        employee_id = request.data.get(
            "employee"
        )
        shift_id = request.data.get(
            "shift"
        )
        date = request.data.get(
            "date"
        )

        if not all([
            employee_id,
            shift_id,
            date
        ]):
            return Response(
                {
                    "error":
                    "employee, shift and date are required."
                },
                status=400
            )

        employee = User.objects.get(
            id=employee_id
        )
        shift = Shift.objects.get(
            id=shift_id
        )

        entry, created = RosterEntry.objects.update_or_create(
                roster=roster,
                employee=employee,
                date=date,
                defaults={
                    "shift": shift
                }
            )

        return Response({
            "message":
                "Shift assigned successfully."
        })

    @action(detail=True, methods=["GET"])
    def team_members(self, request, pk=None):

        roster = self.get_object()

        employees = User.objects.filter(
            employee_profile__sub_department=
                roster.sub_department,
            role="EMPLOYEE"
        )

        serializer = UserSerializer(
            employees,
            many=True
        )

        return Response(serializer.data)

class RosterEntryViewSet(viewsets.ModelViewSet):

    serializer_class = RosterEntrySerializer
    permission_classes = [IsAuthenticated]
    queryset = RosterEntry.objects.select_related(
        'employee',
        'shift',
        'roster'
    )
