from rest_framework import serializers
from .models import User
from organization.models import Organization

class RegisterSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(write_only=True)  # Accept organization name

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'organization_name']  # Include organization_name
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract the organization name from validated_data
        organization_name = validated_data.pop('organization_name', None)
        
        # Find or create the organization
        organization = Organization.objects.filter(name=organization_name).first()
        if not organization:
            raise serializers.ValidationError({"organization_name": "Organization not found."})

        # Create the user
        user = User.objects.create_user(
            **validated_data,
            organization=organization  # Set the organization
        )
        return user