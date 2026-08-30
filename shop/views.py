from django.shortcuts import render

def shop_home(request):
 return render(request, 'shop/shop.html')


def cart(request):
 return render(request, 'shop/cart.html')


def login(request):
 return render(request, 'shop/login.html')


def account(request):
 return render(request, 'shop/account.html')


def product_detail(request, product_id):
 return render(
    request,
    'shop/product_detail.html',
    {'product_id': product_id}
)

