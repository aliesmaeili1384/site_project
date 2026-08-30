from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect

from .models import Product, Profile


# =========================
# صفحه اصلی فروشگاه
# =========================

def shop_home(request):

    products = Product.objects.all()

    return render(
        request,
        'shop/shop.html',
        {
            'products': products
        }
    )


# =========================
# سبد خرید
# =========================

def cart(request):

    return render(
        request,
        'shop/cart.html'
    )


# =========================
# ورود
# =========================

def login(request):

    if request.method == 'POST':

        phone = request.POST.get('phone', '').strip()
        password = request.POST.get('password', '')

        user = authenticate(
            request,
            username=phone,
            password=password
        )

        if user is not None:

            auth_login(request, user)

            return redirect('account')

        return render(
            request,
            'shop/login.html',
            {
                'error': 'شماره تلفن یا رمز عبور اشتباه است.',
                'active_tab': 'login'
            }
        )

    return render(
        request,
        'shop/login.html',
        {
            'active_tab': 'login'
        }
    )


# =========================
# ثبت نام
# =========================

def register(request):

    if request.method == 'POST':

        first_name = request.POST.get(
            'first_name',
            ''
        ).strip()

        last_name = request.POST.get(
            'last_name',
            ''
        ).strip()

        phone = request.POST.get(
            'phone',
            ''
        ).strip()

        address = request.POST.get(
            'address',
            ''
        ).strip()

        password = request.POST.get(
            'password',
            ''
        )


        # بررسی شماره تلفن تکراری

        if User.objects.filter(
            username=phone
        ).exists():

            return render(
                request,
                'shop/login.html',
                {
                    'error': 'این شماره تلفن قبلاً ثبت نام کرده است.',
                    'active_tab': 'register'
                }
            )


        # ساخت کاربر

        user = User.objects.create_user(
            username=phone,
            password=password,
            first_name=first_name,
            last_name=last_name
        )


        # ساخت پروفایل

        Profile.objects.create(
            user=user,
            phone=phone,
            address=address
        )


        # ورود خودکار بعد از ثبت نام

        auth_login(
            request,
            user
        )


        return redirect('account')


    return render(
        request,
        'shop/login.html',
        {
            'active_tab': 'register'
        }
    )


# =========================
# حساب کاربری
# =========================

def account(request):

    if not request.user.is_authenticated:

        return redirect('login')


    profile = get_object_or_404(
        Profile,
        user=request.user
    )


    # ویرایش اطلاعات

    if request.method == 'POST':

        first_name = request.POST.get(
            'first_name',
            ''
        ).strip()

        last_name = request.POST.get(
            'last_name',
            ''
        ).strip()

        phone = request.POST.get(
            'phone',
            ''
        ).strip()

        address = request.POST.get(
            'address',
            ''
        ).strip()


        # بررسی شماره تلفن تکراری

        if User.objects.filter(
            username=phone
        ).exclude(
            id=request.user.id
        ).exists():

            return render(
                request,
                'shop/account.html',
                {
                    'user': request.user,
                    'profile': profile,
                    'error': 'این شماره تلفن قبلاً استفاده شده است.'
                }
            )


        # بروزرسانی User

        request.user.first_name = first_name
        request.user.last_name = last_name
        request.user.username = phone

        request.user.save()


        # بروزرسانی Profile

        profile.phone = phone
        profile.address = address

        profile.save()


        return render(
            request,
            'shop/account.html',
            {
                'user': request.user,
                'profile': profile,
                'message': 'اطلاعات با موفقیت ویرایش شد.'
            }
        )


    return render(
        request,
        'shop/account.html',
        {
            'user': request.user,
            'profile': profile
        }
    )


# =========================
# خروج
# =========================

def logout_view(request):

    logout(request)

    return redirect('login')


# =========================
# جزئیات محصول
# =========================

def product_detail(request, id):

    product = get_object_or_404(
        Product,
        id=id
    )

    return render(
        request,
        'shop/product_detail.html',
        {
            'product': product
        }
    )