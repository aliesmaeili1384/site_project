document.addEventListener("DOMContentLoaded", function () {

    // اطلاعات محصول که از Django به HTML فرستاده شده
    const productId = window.productId;
    const productName = window.productName;
    const productPrice = Number(window.productPrice);
    const productImage = window.productImage;

    // عناصر صفحه
    const quantityDisplay = document.getElementById("quantity");
    const increaseButton = document.getElementById("increase");
    const decreaseButton = document.getElementById("decrease");
    const addCartButton = document.getElementById("add-cart-button");
    const message = document.getElementById("product-message");
    const cartBadge = document.getElementById("cartBadge");


    // =========================
    // تعداد اولیه
    // =========================

    let quantity = 1;

    quantityDisplay.textContent = quantity;


    // =========================
    // افزایش تعداد
    // =========================

    increaseButton.addEventListener("click", function () {

        if (quantity < 99) {

            quantity++;

            quantityDisplay.textContent = quantity;
        }

    });


    // =========================
    // کاهش تعداد
    // =========================

    decreaseButton.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;
        }

    });


    // =========================
    // خواندن سبد خرید
    // =========================

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        } catch (error) {

            return [];

        }

    }


    // =========================
    // ذخیره سبد خرید
    // =========================

    function saveCart(cart) {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }


    // =========================
    // بروزرسانی عدد سبد
    // =========================

    function updateCartBadge() {

        const cart = getCart();

        let totalQuantity = 0;

        cart.forEach(function (item) {

            totalQuantity += Number(item.quantity) || 0;

        });


        if (cartBadge) {

            cartBadge.textContent =
                totalQuantity.toLocaleString("fa-IR");

        }

    }


    // =========================
    // افزودن به سبد خرید
    // (با جلوگیری از کلیک تکراری)
    // =========================

    let isAdding = false;

    addCartButton.addEventListener("click", function () {

        if (isAdding) {

            return;

        }

        isAdding = true;

        addCartButton.disabled = true;


        if (!productId) {

            isAdding = false;

            addCartButton.disabled = false;

            return;

        }


        let cart = getCart();


        // پیدا کردن محصول موجود
        const existingProduct = cart.find(function (item) {

            return String(item.id) === String(productId);

        });


        if (existingProduct) {

            existingProduct.quantity =
                Number(existingProduct.quantity) + quantity;

        } else {

            cart.push({

                id: String(productId),

                name: productName,

                price: productPrice,

                image: productImage,

                quantity: quantity

            });

        }


        // ذخیره
        saveCart(cart);


        // نمایش پیام
        message.textContent =
            "محصول با موفقیت به سبد خرید اضافه شد.";


        message.style.opacity = "1";


        // بروزرسانی تعداد سبد
        updateCartBadge();


        // بعد از 3 ثانیه پیام حذف شود
        setTimeout(function () {

            message.textContent = "";

        }, 3000);


        // بعد از یک ثانیه دوباره دکمه فعال شود
        setTimeout(function () {

            isAdding = false;

            addCartButton.disabled = false;

        }, 1000);

    });


    // =========================
    // اجرای اولیه
    // =========================

    updateCartBadge();

});