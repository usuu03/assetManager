from django.db import models

# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField(null=True, blank=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    logo = models.ImageField(upload_to='organization_logos/', null=True, blank=True)
    phone_number = models.CharField(max_length=25, null=True, blank=True)
    website = models.URLField(unique=True, null=True, blank=True)
    industry = models.CharField(max_length=100, null=False, blank=False)
   
    
    def __str__(self):
        return self.name