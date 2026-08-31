from django.contrib import admin

from .models import (
    Product,
    Profile,
    Order,
    OrderItem
)


# ==========================================
# مدیریت محصولات
# ==========================================

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'price',
        'description',
        'image',
    )

    search_fields = (
        'name',
        'description',
    )

    list_filter = (
        'price',
    )


# ==========================================
# مدیریت کاربران
# ==========================================

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        'first_name',
        'last_name',
        'phone',
        'address',
        'username',
    )

    search_fields = (
        'user__first_name',
        'user__last_name',
        'user__username',
        'phone',
        'address',
    )

    list_display_links = (
        'phone',
    )


    @admin.display(
        description='نام'
    )
    def first_name(self, obj):

        return obj.user.first_name


    @admin.display(
        description='نام خانوادگی'
    )
    def last_name(self, obj):

        return obj.user.last_name


    @admin.display(
        description='نام کاربری'
    )
    def username(self, obj):

        return obj.user.username


# ==========================================
# مدیریت سفارش‌ها
# ==========================================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'total_price_admin',
        'created_at',
    )

    search_fields = (
        'user__username',
        'user__first_name',
        'user__last_name',
    )

    list_filter = (
        'created_at',
    )

    ordering = (
        '-created_at',
    )


    @admin.display(
        description='مبلغ کل'
    )
    def total_price_admin(self, obj):

        return (
            f"{obj.total_price():,} تومان"
        )


# ==========================================
# مدیریت کالاهای سفارش
# ==========================================

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        'order',
        'product_name',
        'price',
        'quantity',
        'total_price_admin',
    )

    search_fields = (
        'product_name',
    )

    list_filter = (
        'quantity',
    )


    @admin.display(
        description='مبلغ کل'
    )
    def total_price_admin(self, obj):

        return (
            f"{obj.price * obj.quantity:,} تومان"
        )