from django.shortcuts import render


def shop_home(request):
    return render(request, 'shop/shop.html')


def cart(request):
    return render(request, 'shop/cart.html')

def login(request):
    return render(request, 'shop/login.html')