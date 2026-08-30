from django.urls import path

from . import views


urlpatterns = [

    # صفحه اصلی
    path(
        '',
        views.shop_home,
        name='shop_home'
    ),


    # سبد خرید
    path(
        'cart/',
        views.cart,
        name='cart'
    ),


    # ورود
    path(
        'login/',
        views.login,
        name='login'
    ),


    # ثبت نام
    path(
        'register/',
        views.register,
        name='register'
    ),


    # حساب کاربری
    path(
        'account/',
        views.account,
        name='account'
    ),


    # خروج
    path(
        'logout/',
        views.logout_view,
        name='logout'
    ),


    # جزئیات محصول
    path(
        'product/<int:id>/',
        views.product_detail,
        name='product_detail'
    ),

]