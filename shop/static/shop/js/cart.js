
function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

    } catch (error) {

        console.error(
            "خطا در خواندن سبد خرید:",
            error
        );

        return [];

    }
}


// ==========================================
// ذخیره سبد خرید
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==========================================
// فرمت قیمت
// ==========================================

function formatPrice(price) {

    return Number(price).toLocaleString("fa-IR") + " تومان";

}


// ==========================================
// تبدیل عدد به فارسی
// ==========================================

function toPersianNumber(number) {

    return String(number).replace(
        /\d/g,
        function (digit) {

            return "۰۱۲۳۴۵۶۷۸۹"[digit];

        }
    );

}


// ==========================================
// نمایش سبد خرید
// ==========================================

function renderCart() {

    const cartProducts =
        document.getElementById("cart-products");

    const cartCount =
        document.getElementById("cart-count");

    const cartSubtotal =
        document.getElementById("cart-subtotal");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartProducts) {

        return;

    }


    const cart = getCart();


    // ======================================
    // سبد خالی
    // ======================================

    if (cart.length === 0) {

        cartProducts.innerHTML = `

            <div class="empty-cart">

                <i class="fas fa-shopping-cart"></i>

                <h2>
                    سبد خرید شما خالی است
                </h2>

                <p>
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>

                <a href="/">
                    مشاهده محصولات
                </a>

            </div>

        `;


        cartCount.textContent = "۰ کالا";

        cartSubtotal.textContent = "۰ تومان";

        cartTotal.textContent = "۰ تومان";


        return;

    }


    // ======================================
    // پاک کردن محتوای قبلی
    // ======================================

    cartProducts.innerHTML = "";


    let totalQuantity = 0;

    let subtotal = 0;


    // ======================================
    // ساخت محصولات
    // ======================================

    cart.forEach(
        function (item, index) {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;


            const itemTotal =
                price * quantity;


            totalQuantity += quantity;

            subtotal += itemTotal;


            const productHTML = `

                <div
                    class="cart-item"
                    data-index="${index}"
                >


                    <!-- تصویر محصول -->

                    <img
                        src="${item.image || ''}"
                        alt="${item.name || 'محصول'}"
                    >


                    <!-- اطلاعات محصول -->

                    <div class="item-info">

                        <h2>
                            ${item.name || 'محصول'}
                        </h2>


                        <p>
                            محصول فروشگاه
                        </p>


                        <div class="item-price">

                            ${formatPrice(price)}

                        </div>


                        <!-- تعداد -->

                        <div class="quantity">


                            <!-- کاهش -->

                            <button
                                type="button"
                                class="quantity-minus"
                                data-index="${index}"
                            >
                                −
                            </button>


                            <!-- تعداد -->

                            <span>
                                ${toPersianNumber(quantity)}
                            </span>


                            <!-- افزایش -->

                            <button
                                type="button"
                                class="quantity-plus"
                                data-index="${index}"
                            >
                                +
                            </button>


                        </div>


                    </div>


                    <!-- مبلغ کل محصول -->

                    <div class="item-price">

                        ${formatPrice(itemTotal)}

                    </div>


                    <!-- حذف -->

                    <button
                        type="button"
                        class="delete"
                        data-index="${index}"
                        title="حذف محصول"
                    >

                        <i class="fas fa-trash"></i>

                    </button>


                </div>

            `;


            cartProducts.insertAdjacentHTML(
                "beforeend",
                productHTML
            );

        }
    );


    // ======================================
    // خلاصه سفارش
    // ======================================

    cartCount.textContent =
        toPersianNumber(totalQuantity)
        + " کالا";


    cartSubtotal.textContent =
        formatPrice(subtotal);


    cartTotal.textContent =
        formatPrice(subtotal);


    // ======================================
    // دکمه افزایش
    // ======================================

    document
        .querySelectorAll(".quantity-plus")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        increaseQuantity(index);

                    }
                );

            }
        );


    // ======================================
    // دکمه کاهش
    // ======================================

    document
        .querySelectorAll(".quantity-minus")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        decreaseQuantity(index);

                    }
                );

            }
        );


    // ======================================
    // دکمه حذف
    // ======================================

    document
        .querySelectorAll(".delete")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        deleteItem(index);

                    }
                );

            }
        );

}


// ==========================================
// افزایش تعداد
// ==========================================

function increaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity++;


    cart[index].quantity =
        quantity;


    saveCart(cart);


    renderCart();

}


// ==========================================
// کاهش تعداد
// ==========================================

function decreaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity--;


    // اگر تعداد به صفر رسید
    // محصول حذف شود

    if (quantity <= 0) {

        cart.splice(
            index,
            1
        );

    } else {

        cart[index].quantity =
            quantity;

    }


    saveCart(cart);


    renderCart();

}


// ==========================================
// حذف محصول
// ==========================================

function deleteItem(index) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);


    renderCart();

}


// ==========================================
// دریافت CSRF
// ==========================================

function getCookie(name) {

    let cookieValue = null;


    if (
        document.cookie &&
        document.cookie !== ""
    ) {

        const cookies =
            document.cookie.split(";");


        for (
            let cookie of cookies
        ) {

            cookie = cookie.trim();


            if (
                cookie.substring(
                    0,
                    name.length + 1
                )
                ===
                name + "="
            ) {

                cookieValue =
                    decodeURIComponent(
                        cookie.substring(
                            name.length + 1
                        )
                    );

                break;

            }

        }

    }


    return cookieValue;

}


// ==========================================
// ادامه فرآیند خرید
// ==========================================

function checkout() {

    const cart = getCart();


    // ======================================
    // بررسی خالی بودن سبد
    // ======================================

    if (cart.length === 0) {

        alert(
            "سبد خرید شما خالی است."
        );

        return;

    }


    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );


    if (!checkoutButton) {

        return;

    }


    // جلوگیری از چند بار کلیک

    checkoutButton.disabled = true;


    checkoutButton.innerHTML = `

        <i class="fas fa-spinner fa-spin"></i>

        در حال ثبت سفارش...

    `;


    // ======================================
    // فقط ID و تعداد ارسال می‌شود
    // ======================================

    const orderCart =
        cart.map(
            function (item) {

                return {

                    id:
                        item.id,

                    quantity:
                        Number(
                            item.quantity
                        ) || 1

                };

            }
        );


    // ======================================
    // ارسال به Django
    // ======================================

    fetch(
        "/checkout/",
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json",

                "X-CSRFToken":
                    getCookie(
                        "csrftoken"
                    )

            },

            body: JSON.stringify({

                cart:
                    orderCart

            })

        }
    )


    // ======================================
    // دریافت پاسخ
    // ======================================

    .then(
        function (response) {

            return response.json()
                .then(
                    function (data) {

                        return {

                            status:
                                response.status,

                            data:
                                data

                        };

                    }
                );

        }
    )


    .then(
        function (result) {

            const data =
                result.data;


            // ==================================
            // کاربر وارد نشده
            // ==================================

            if (
                result.status === 401 &&
                data.redirect
            ) {

                alert(
                    "برای تکمیل خرید ابتدا وارد حساب کاربری شوید."
                );


                window.location.href =
                    data.redirect;


                return;

            }


            // ==================================
            // خرید موفق
            // ==================================

            if (data.success) {

                alert(

                    "خرید شما با موفقیت ثبت شد.\n\n"
                    +
                    "شماره سفارش: "
                    +
                    toPersianNumber(
                        data.order_id
                    )

                );


                // خالی کردن سبد

                localStorage.removeItem(
                    "cart"
                );


                // رفتن به فروشگاه

                window.location.href =
                    "/";


                return;

            }


            // ==================================
            // خطا
            // ==================================

            alert(
                data.message ||
                "خطایی هنگام ثبت سفارش رخ داد."
            );


            checkoutButton.disabled =
                false;


            checkoutButton.innerHTML = `

                <i class="fas fa-credit-card"></i>

                ادامه فرایند خرید

            `;

        }
    )


    // ======================================
    // خطای ارتباط
    // ======================================

    .catch(
        function (error) {

            console.error(
                "Checkout error:",
                error
            );


            alert(
                "ارتباط با سرور برقرار نشد."
            );


            checkoutButton.disabled =
                false;


            checkoutButton.innerHTML = `

                <i class="fas fa-credit-card"></i>

                ادامه فرایند خرید

            `;

        }
    );

}


// ==========================================
// شروع
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }

    }
);

