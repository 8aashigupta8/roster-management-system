from rest_framework.routers import (
    DefaultRouter
)

from .views import (
    MajorDepartmentViewSet, SubDepartmentViewSet
)

router = DefaultRouter()

router.register(
    "major-departments",
    MajorDepartmentViewSet
)
router.register(
    "sub-departments",
    SubDepartmentViewSet
)

urlpatterns = router.urls