from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Organization
from .serializers import OrganizationSerializer

# Create your views here.
class OrganizationView(APIView):
    
    permission_classes = [AllowAny, ]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        """Add a new Organization"""
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)