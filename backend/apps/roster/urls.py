from rest_framework.routers import DefaultRouter

from .views import (
    ShiftViewSet,
    RosterViewSet,
    RosterEntryViewSet
)

router = DefaultRouter()

router.register('shifts', ShiftViewSet)
router.register('rosters', RosterViewSet)
router.register('roster-entries', RosterEntryViewSet)

urlpatterns = router.urls