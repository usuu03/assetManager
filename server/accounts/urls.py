from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

urlpatterns = [
   path('login/', TokenObtainPairView.as_view(), name='login'),
   path('register/', RegisterView.as_view(), name='register')
]
