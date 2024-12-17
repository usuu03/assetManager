from rest_framework import serializers
from .models import Device

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'description', 'location', 'owned_by', 
                  'assigned_to', 'warranty_date', 'status']  # Exclude asset_tag and serial_number
        read_only_fields = ['asset_tag', 'serial_number', 'owned_by']
