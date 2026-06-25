from django.conf import settings
from django.db import models

from apps.common.models import BaseModel


class MajorDepartment(BaseModel):

    name = models.CharField(
        max_length=255,
        unique=True
    )

    department_head = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='headed_departments'
    )

    def __str__(self):
        return self.name

class SubDepartment(BaseModel):

    name = models.CharField(
        max_length=255
    )

    major_department = models.ForeignKey(
        MajorDepartment,
        on_delete=models.CASCADE,
        related_name='sub_departments'
    )

    team_leader = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='led_sub_departments'
    )

    class Meta:
        unique_together = ('name', 'major_department')

    def __str__(self):
        return f"{self.name} - {self.major_department.name}"
    
class EmployeeProfile(BaseModel):

    EMPLOYMENT_TYPES = (
        ('FULL_TIME', 'Full Time'),
        ('PART_TIME', 'Part Time'),
        ('CONTRACT', 'Contract'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='employee_profile'
    )

    sub_department = models.ForeignKey(
        SubDepartment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees'
    )

    designation = models.CharField(
        max_length=255
    )

    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_TYPES
    )

    joining_date = models.DateField()

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    def __str__(self):
        return f"{self.user.email} - {self.designation}"