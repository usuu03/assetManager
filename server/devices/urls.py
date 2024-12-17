from django.contrib import admin
from django.urls import path, include
from .views import DeviceView, DeviceDetailView

urlpatterns = [
    path('', DeviceView.as_view(), name='device'),
    path('<str:device_id>/', DeviceDetailView.as_view(), name='device-detail')
]
