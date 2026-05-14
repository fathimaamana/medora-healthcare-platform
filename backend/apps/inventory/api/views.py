from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import Medicine
from .serializers import MedicineSerializer


class MedicineListCreateView(generics.ListCreateAPIView):

    queryset = Medicine.objects.all().order_by('-created_at')

    serializer_class = MedicineSerializer

    permission_classes = [IsAuthenticated]


class MedicineDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Medicine.objects.all()

    serializer_class = MedicineSerializer

    permission_classes = [IsAuthenticated]