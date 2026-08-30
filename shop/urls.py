from django.urls import path

from . import views

urlpatterns = [


path('', views.shop_home, name='shop_home'),

path('cart/', views.cart, name='cart'),

path('login/', views.login, name='login'),

path('account/', views.account, name='account'),

path('product/<int:product_id>/', views.product_detail, name='product_detail'),


]
