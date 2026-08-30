from django.contrib import admin

from .models import Product, Profile


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
# مدیریت کاربران / پروفایل‌ها
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


    # -------------------------------
    # اطلاعات کاربر
    # -------------------------------

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