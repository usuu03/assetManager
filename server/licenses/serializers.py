from rest_framework import serializers
from .models import License

class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ['id', 'name', 'purchase_date', 'vendor', 
                  'provider', 'expiration_date', 'quantity']  
        read_only_fields = ['owned_by']
