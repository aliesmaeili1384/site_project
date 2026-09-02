import json

from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout
from django.contrib.auth.models import User

from django.shortcuts import (
    render,
    get_object_or_404,
    redirect
)

from django.http import JsonResponse

from django.views.decorators.http import require_POST

from django.db import transaction

from .models import (
    Product,
    Profile,
    Order,
    OrderItem
)


# ==========================================
# صفحه اصلی فروشگاه
# ==========================================

def shop_home(request):

    products = Product.objects.all()

    return render(
        request,
        'shop/shop.html',
        {
            'products': products
        }
    )


# ==========================================
# سبد خرید
# ==========================================

def cart(request):

    return render(
        request,
        'shop/cart.html'
    )


# ==========================================
# ورود
# ==========================================

def login(request):

    if request.method == 'POST':

        phone = request.POST.get(
            'phone',
            ''
        ).strip()

        password = request.POST.get(
            'password',
            ''
        )

        user = authenticate(
            request,
            username=phone,
            password=password
        )

        if user is not None:

            auth_login(
                request,
                user
            )

            return redirect(
                'account'
            )

        return render(
            request,
            'shop/login.html',
            {
                'error':
                    'شماره تلفن یا رمز عبور اشتباه است.',

                'active_tab':
                    'login'
            }
        )

    return render(
        request,
        'shop/login.html',
        {
            'active_tab': 'login'
        }
    )


# ==========================================
# ثبت نام
# ==========================================

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
                    'error':
                        'این شماره تلفن قبلاً ثبت نام کرده است.',

                    'active_tab':
                        'register'
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


        # ورود خودکار

        auth_login(
            request,
            user
        )


        return redirect(
            'account'
        )


    return render(
        request,
        'shop/login.html',
        {
            'active_tab':
                'register'
        }
    )


# ==========================================
# حساب کاربری
# ==========================================

def account(request):

    if not request.user.is_authenticated:

        return redirect(
            'login'
        )


    profile = get_object_or_404(
        Profile,
        user=request.user
    )


    # ======================================
    # ویرایش اطلاعات
    # ======================================

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
                    'user':
                        request.user,

                    'profile':
                        profile,

                    'error':
                        'این شماره تلفن قبلاً استفاده شده است.'
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
                'user':
                    request.user,

                'profile':
                    profile,

                'message':
                    'اطلاعات با موفقیت ویرایش شد.'
            }
        )


    return render(
        request,
        'shop/account.html',
        {
            'user':
                request.user,

            'profile':
                profile
        }
    )


# ==========================================
# خروج
# ==========================================

def logout_view(request):

    logout(request)

    return redirect(
        'login'
    )


# ==========================================
# جزئیات محصول
# ==========================================

def product_detail(request, id):

    product = get_object_or_404(
        Product,
        id=id
    )

    return render(
        request,
        'shop/product_detail.html',
        {
            'product':
                product
        }
    )


# ==========================================
# سفارش های من
# ==========================================

def orders(request):

    # --------------------------------------
    # بررسی ورود کاربر
    # --------------------------------------

    if not request.user.is_authenticated:

        return redirect(
            'login'
        )


    # --------------------------------------
    # دریافت سفارش های کاربر
    # جدیدترین سفارش اول نمایش داده می شود
    # --------------------------------------

    user_orders = (
        Order.objects
        .filter(
            user=request.user
        )
        .prefetch_related(
            'items'
        )
        .order_by(
            '-created_at'
        )
    )


    # --------------------------------------
    # ارسال سفارش ها به صفحه
    # --------------------------------------

    return render(
        request,
        'shop/orders.html',
        {
            'orders':
                user_orders
        }
    )

# ==========================================
# ثبت نهایی سفارش
# ==========================================

@require_POST
def checkout(request):

    # --------------------------------------
    # بررسی ورود کاربر
    # --------------------------------------

    if not request.user.is_authenticated:

        return JsonResponse(
            {
                'success':
                    False,

                'redirect':
                    '/login/'
            },
            status=401
        )


    # --------------------------------------
    # دریافت اطلاعات سبد
    # --------------------------------------

    try:

        data = json.loads(
            request.body
        )

        cart_items = data.get(
            'cart',
            []
        )

    except (
        json.JSONDecodeError,
        TypeError
    ):

        return JsonResponse(
            {
                'success':
                    False,

                'message':
                    'داده ارسالی نامعتبر است.'
            },
            status=400
        )


    # --------------------------------------
    # بررسی خالی نبودن سبد
    # --------------------------------------

    if not cart_items:

        return JsonResponse(
            {
                'success':
                    False,

                'message':
                    'سبد خرید خالی است.'
            },
            status=400
        )


    try:

        with transaction.atomic():

            # ----------------------------------
            # ساخت سفارش
            # ----------------------------------

            order = Order.objects.create(
                user=request.user
            )


            valid_items = 0


            # ----------------------------------
            # ذخیره محصولات
            # ----------------------------------

            for item in cart_items:

                product_id = item.get(
                    'id'
                )

                try:

                    quantity = int(
                        item.get(
                            'quantity',
                            1
                        )
                    )

                except (
                    ValueError,
                    TypeError
                ):

                    continue


                if not product_id:
                    continue


                if quantity <= 0:
                    continue


                # ----------------------------------
                # گرفتن محصول از دیتابیس
                # ----------------------------------

                try:

                    product = Product.objects.get(
                        id=product_id
                    )

                except Product.DoesNotExist:

                    continue


                # ----------------------------------
                # تصویر محصول
                # ----------------------------------

                image_url = ''

                if product.image:

                    image_url = product.image.url


                # ----------------------------------
                # ذخیره OrderItem
                # ----------------------------------

                OrderItem.objects.create(

                    order=order,

                    product_id=str(
                        product.id
                    ),

                    product_name=product.name,

                    price=product.price,

                    quantity=quantity,

                    image=image_url
                )


                valid_items += 1


            # ----------------------------------
            # اگر هیچ محصول معتبری نبود
            # ----------------------------------

            if valid_items == 0:

                order.delete()

                return JsonResponse(
                    {
                        'success':
                            False,

                        'message':
                            'هیچ محصول معتبری در سبد خرید وجود ندارد.'
                    },
                    status=400
                )


        # --------------------------------------
        # موفقیت
        # --------------------------------------

        return JsonResponse(
            {
                'success':
                    True,

                'order_id':
                    order.id,

                'total_price':
                    order.total_price()
            }
        )


    except Exception as e:

        print(
            'CHECKOUT ERROR:',
            e
        )

        return JsonResponse(
            {
                'success':
                    False,

                'message':
                    'خطایی هنگام ثبت سفارش رخ داد.'
            },
            status=500
        )