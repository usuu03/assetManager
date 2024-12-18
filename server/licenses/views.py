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

from .models import License
from .serializers import LicenseSerializer

# Create your views here.
class LicenseView(APIView):
    """ 
    Handles viewing all the License and creating a new License
    Ensures only users belonging to the same organization can view or add a Device
    """
    permission_classes = [IsAuthenticated, ]
    
    def get(self, request):
        """ 
        Fetches all the Licenses associated within the organization
        the user belongs to
        """
        user_organization = request.user.organization
        license_list = License.objects.filter(owned_by=user_organization)
        serializer = LicenseSerializer(license_list, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    def post(self, request):
        """
        Create a new license, automatically assigning 
        it to the user's organization
        """
        user_organization = request.user.organization
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."},
                status=HTTP_403_FORBIDDEN,
            )
        serializer = LicenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owned_by=user_organization)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    
class LicenseDetailView(APIView):
    """ 
    Handles Reading, Updating and Deleting a License.
    Ensures only users belonging to the same organization
    perform these actions to the License
    """
    def get(self, request, licencia_id):
        """ 
        Retrieves a single license from the user's organization
        """
        user_organization = request.user.organization
        
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."},
                status=HTTP_403_FORBIDDEN,
            )
            
        try:
            #Get license within the user's organization
            licencia = License.objects.get(id=licencia_id, owned_by=user_organization)
        except License.DoesNotExist:
            return Response(
               {"detail": "License not found."},
                 status=HTTP_404_NOT_FOUND
           )
        
        serializer = LicenseSerializer(licencia)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    def put(self, request, licencia_id):
        """ 
        Update a license for the user's organization
        """
        user_organization = request.user.organization
        
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."},
                status=HTTP_403_FORBIDDEN,
            )
            
        try:
            #Get device within the user's organization
            licencia = License.objects.get(id=licencia_id, owned_by=user_organization)
        except License.DoesNotExist:
            return Response(
               {"detail": "Device not found."},
                 status=HTTP_404_NOT_FOUND
           )
            
        serializer = LicenseSerializer(licencia, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
    
    

    def delete(self, request, licencia_id):
        """ 
        Delete a license for the user's organization
        """
        user_organization = request.user.organization
        if not user_organization:
            return Response(
                {"detail": "You do not belong to this organization."}, status=HTTP_403_FORBIDDEN,
            )
        
        try:
            #Getting device within the organization
            licencia = License.objects.get(id=licencia_id, owned_by=user_organization)
        except License.DoesNotExist:
            return Response(
                {"detail": "Device not found."}, status=HTTP_404_NOT_FOUND
            )
            
        licencia.delete()
        return Response(
            {"detail": "Device deleted successfully."},
            status=HTTP_204_NO_CONTENT
        )
