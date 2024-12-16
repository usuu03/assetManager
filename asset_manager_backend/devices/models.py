from django.db import models
from organization.models import Organization
import uuid

class Device(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    asset_tag = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    owned_by = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)
    assigned_to = models.CharField(max_length=255, blank=True, null=True)
    serial_number = models.CharField(max_length=255, blank=False, null=False, unique=True)
    warranty_date = models.DateField()
    status = models.CharField(max_length=50, choices=[('Active', 'Active'), ('Maintenance', 'Maintenance'), ('Retired', 'Retired')])

    def save(self, *args, **kwargs):
        if not self.serial_number:  # Generate only if serial_number is empty
            self.serial_number = self.generate_serial_number()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_serial_number():
        # Customize the serial number format as needed
        return f"SN-{uuid.uuid4().hex[:8].upper()}"

    def __str__(self):
        return self.name
