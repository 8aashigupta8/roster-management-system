from django.contrib import admin

from .models import (
    MajorDepartment,
    SubDepartment,
    EmployeeProfile
)

admin.site.register(MajorDepartment)
admin.site.register(SubDepartment)
admin.site.register(EmployeeProfile)
