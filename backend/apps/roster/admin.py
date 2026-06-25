from django.contrib import admin

from .models import (
    Shift,
    Roster,
    RosterEntry
)

admin.site.register(Shift)
admin.site.register(Roster)
admin.site.register(RosterEntry)
