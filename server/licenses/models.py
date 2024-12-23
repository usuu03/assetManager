from django.db import models
from organization.models import Organization

# Create your models here.
class License(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    purchase_date = models.DateField()
    vendor = models.CharField(max_length=255, null=True, blank=True)
    provider = models.CharField(max_length=255, null=True, blank=True)
    expiration_date = models.DateField()
    quantity = models.IntegerField(default=1, null=False, blank=False)
    owned_by = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.name
    
    
# name, license type, purchase date, expiration date,
# assigned user, location, actions (delete, edit)