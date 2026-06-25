from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.common.models import BaseModel
from .managers import UserManager


class User(BaseModel, AbstractUser):

    ROLE_CHOICES = (
        ('SUPER_ADMIN', 'Super Admin'),
        ('DEPARTMENT_HEAD', 'Department Head'),
        ('TEAM_LEADER', 'Team Leader'),
        ('EMPLOYEE', 'Employee'),
    )

    username = None

    email = models.EmailField(unique=True)
    employee_code = models.CharField(max_length=50, unique=True)

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
