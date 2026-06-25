from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from .permissions import IsSuperAdmin

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # Super admin sees all users
        if user.role == 'SUPER_ADMIN':
            return User.objects.all()

        # Department head sees only users in their department
        elif user.role == 'DEPARTMENT_HEAD':

            return User.objects.filter(
                Q(
                employee_profile__sub_department__major_department__department_head=user
                )

                |

                Q(
                led_sub_departments__major_department__department_head=user
                )
            ).distinct()

        # Team leader sees only their team members
        elif user.role == 'TEAM_LEADER':

            return User.objects.filter(
                employee_profile__sub_department__team_leader=user
            )

        # Employee sees only themselves
        return User.objects.filter(id=user.id)
    
    def get_permissions(self):

        if self.action == 'create':
            return [IsSuperAdmin()]

        return [IsAuthenticated()]
    
    def get_serializer_class(self):

        if self.action == 'create':
            return UserCreateSerializer

        return UserSerializer
    
    @action(detail=False, methods=['GET'])
    def me(self, request):

        serializer = self.get_serializer(
            request.user
        )

        return Response(serializer.data)
