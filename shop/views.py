from django.shortcuts import render, get_object_or_404

from .models import Product


def shop_home(request):
    products = Product.objects.all()

    return render(
        request,
        'shop/shop.html',
        {'products': products}
    )


def cart(request):
    return render(request, 'shop/cart.html')


def login(request):
    return render(request, 'shop/login.html')


def account(request):
    return render(request, 'shop/account.html')


def product_detail(request, id):
    product = get_object_or_404(Product, id=id)

    return render(
        request,
        'shop/product_detail.html',
        {'product': product}
    )