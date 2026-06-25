from django.conf import settings
from django.db import models

from apps.common.models import BaseModel
from apps.organization.models import SubDepartment

class Shift(BaseModel):

    SHIFT_TYPES = (
        ('MORNING', 'Morning'),
        ('EVENING', 'Evening'),
        ('NIGHT', 'Night'),
        ('OFF', 'Off'),
    )

    name = models.CharField(
        max_length=100,
        unique=True
    )

    shift_type = models.CharField(
        max_length=20,
        choices=SHIFT_TYPES
    )

    start_time = models.TimeField()

    end_time = models.TimeField()

    color_code = models.CharField(
        max_length=20,
        default='#FFFFFF'
    )

    is_weekoff = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.name
    
class Roster(BaseModel):

    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('LOCKED', 'Locked'),
    )

    sub_department = models.ForeignKey(
        SubDepartment,
        on_delete=models.CASCADE,
        related_name='rosters'
    )

    month = models.PositiveIntegerField()

    year = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='DRAFT'
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_rosters'
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.sub_department.name} - {self.month}/{self.year}"
    
    class Meta:
        unique_together = (
            'sub_department',
            'month',
            'year'
        )
    
class RosterEntry(BaseModel):

    roster = models.ForeignKey(
        Roster,
        on_delete=models.CASCADE,
        related_name='entries'
    )

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='roster_entries'
    )

    shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name='roster_entries'
    )

    date = models.DateField()

    remarks = models.TextField(
        blank=True
    )

    class Meta:
        unique_together = ('employee', 'date')

        indexes = [
            models.Index(fields=['employee', 'date']),
            models.Index(fields=['roster', 'date']),
        ]

    def __str__(self):
        return f"{self.employee.email} - {self.date}"
