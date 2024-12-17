from django.db import models
from organization.models import Organization
import uuid

class Device(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    asset_tag = models.CharField(max_length=255, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    owned_by = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)
    assigned_to = models.CharField(max_length=255, blank=True, null=True)
    serial_number = models.CharField(max_length=255, blank=False, null=False, unique=True)
    warranty_date = models.DateField()
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Maintenance', 'Maintenance'), ('Retired', 'Retired')],
        default='Active'
    )

    def save(self, *args, **kwargs):
        """
        Auto-generate the asset_tag and serial_number if they are not provided.
        """
        # Generate asset_tag if not provided
        if not self.asset_tag:
            self.asset_tag = self.generate_asset_tag()
        
        # Generate serial_number if not provided
        if not self.serial_number:
            self.serial_number = self.generate_serial_number()
        
        super().save(*args, **kwargs)

    @staticmethod
    def generate_asset_tag():
        """
        Generate a unique asset tag.
        Format: "AT-<8-character-UUID>"
        """
        return f"AT-{uuid.uuid4().hex[:8].upper()}"

    @staticmethod
    def generate_serial_number():
        """
        Generate a unique serial number.
        Format: "SN-<8-character-UUID>"
        """
        return f"SN-{uuid.uuid4().hex[:8].upper()}"

    def __str__(self):
        return f"{self.name} ({self.asset_tag})"
