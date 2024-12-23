from django.contrib import admin
from django.urls import path, include
from .views import LicenseView, LicenseDetailView

urlpatterns = [
    path('', LicenseView.as_view(), name='device'),
    path('<str:license_id>/', LicenseDetailView.as_view(), name='device-detail')
]
