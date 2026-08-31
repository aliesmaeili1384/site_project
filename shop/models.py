from django.db import models
from django.contrib.auth.models import User


# ==========================================
# محصولات
# ==========================================

class Product(models.Model):

    name = models.CharField(
        max_length=100
    )

    price = models.PositiveIntegerField()

    description = models.TextField()

    image = models.ImageField(
        upload_to='products/'
    )

    def __str__(self):

        return self.name


# ==========================================
# پروفایل کاربر
# ==========================================

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


# ==========================================
# سفارش
# ==========================================

class Order(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='orders'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def total_price(self):

        return sum(
            item.price * item.quantity
            for item in self.items.all()
        )

    def __str__(self):

        return (
            f"سفارش #{self.id} - "
            f"{self.user.username}"
        )


# ==========================================
# کالاهای داخل سفارش
# ==========================================

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product_id = models.CharField(
        max_length=50
    )

    product_name = models.CharField(
        max_length=255
    )

    price = models.PositiveIntegerField()

    quantity = models.PositiveIntegerField(
        default=1
    )

    image = models.CharField(
        max_length=500,
        blank=True
    )

    def total_price(self):

        return self.price * self.quantity

    def __str__(self):

        return (
            f"{self.product_name} "
            f"x {self.quantity}"
        )