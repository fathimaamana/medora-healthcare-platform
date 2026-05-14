from django.db import models


class Medicine(models.Model):

    name = models.CharField(
        max_length=255
    )

    manufacturer = models.CharField(
        max_length=255
    )

    batch_number = models.CharField(
        max_length=100,
        unique=True
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    expiry_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name