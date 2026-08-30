
from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    phone = models.CharField(
        max_length=11,
        unique=True
    )

    address = models.CharField(
        max_length=200
    )

    def __str__(self):
        return self.user.username

