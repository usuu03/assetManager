from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)

from .models import Device
from .serializers import DeviceSerializer

# Create your views here.
class DeviceView(APIView):
    """
    Handles viewing all Devices as well as adding a new Device.
    Ensures only users belonging to the same organization can view or add a Device.
    """
    
    permission_classes = [IsAuthenticated, ]
    
    def get(self, request):
        """
        Fetches all the devices associated with the organization 
        the user belongs to
        """
        user_organization = request.user.organization
        devices = Device.objects.filter(owned_by=user_organization)
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    def post(self, request):
        """
        Create a new device, automatically assigning it to 
        the user's organization.
        """
        user_organization = request.user.organization
        if not user_organization:
            return Response(
                {"detail": "You do not belong to an organization."},
                status=HTTP_403_FORBIDDEN,
            )
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owned_by=user_organization)  # Set the organization automatically
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    
    
class DeviceDetailView(APIView):
    """
    Handles Reading, Updating and Deleting a Device.
    Ensures only users belonging to the same organization perform these actions to the Device.
    """
    def get(self, request, device_id):
        """
        Retrieve a single device for the user's organization.
        """
        user_organization = request.user.organization
        if not user_organization:
            return Response(
                {"detail": "You do not belong to an organization."},
                status=HTTP_403_FORBIDDEN,
            )
        
        try:
            # Getting device within the user's organization
            device = Device.objects.get(id=device_id, owned_by=user_organization)
        except Device.DoesNotExist:
            return Response({"detail": "Device not found."}, status=HTTP_404_NOT_FOUND)
        
        serializer = DeviceSerializer(device)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    def put(self, request, device_id):
        """ 
        Update a device for the user's organization
        """
        user_organization = request.user.organization
        
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."},
                status=HTTP_403_FORBIDDEN,
            )
            
        try:
            #Get device within the user's organization
            device = Device.objects.get(id=device_id, owned_by=user_organization)
        except Device.DoesNotExist:
            return Response(
               {"detail": "Device not found."},
                 status=HTTP_404_NOT_FOUND
           )
            
        serializer = DeviceSerializer(device, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, device_id):
        """ 
        Delete a device for the user's organization
        """
        user_organization = request.user.organization
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."}, status=HTTP_403_FORBIDDEN,
            )
        
        try:
            #Getting device within the organization
            device = Device.objects.get(id=device_id, owned_by=user_organization)
        except Device.DoesNotExist:
            return Response(
                {"detail": "Device not found."}, status=HTTP_404_NOT_FOUND
            )
            
        device.delete()
        return Response(
            {"detail": "Device deleted successfully."},
            status=HTTP_204_NO_CONTENT
        )
