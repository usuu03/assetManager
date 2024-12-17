from django.db import models
from django.contrib.auth.models import AbstractUser
from organization.models import Organization

# Create your models here.
class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.username