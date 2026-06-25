from django.db import transaction

from .models import RosterEntry
from datetime import datetime

class RosterService:

    @staticmethod
    @transaction.atomic
    def bulk_assign_shift(
        roster,
        shift,
        employees,
        dates
    ):
        
        if roster.status == 'LOCKED':
            raise ValueError(
                "Locked roster cannot be modified."
            )
        
        # ✅ Convert date strings to date objects first
        parsed_dates = [
            datetime.strptime(d, '%Y-%m-%d').date() 
            if isinstance(d, str) else d 
            for d in dates
        ]

        roster_entries = []

        existing = set(
            RosterEntry.objects.filter(
                employee__in=employees,
                date__in=parsed_dates
            ).values_list('employee_id', 'date')
        )

        for employee in employees:
            for date in parsed_dates:
                if (employee.id, date) in existing:   # simple set lookup, no DB query
                    continue
                roster_entries.append(
                    RosterEntry(
                        roster=roster,
                        employee=employee,
                        shift=shift,
                        date=date
                    ))

        RosterEntry.objects.bulk_create(
            roster_entries
        )

        return roster_entries