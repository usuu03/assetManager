from django.contrib import admin
from django.urls import path, include
from .views import OrganizationView

urlpatterns = [
    path('', OrganizationView.as_view(), name='create-organization')
]
