// دریافت سبد

function getCart() {

    const cart =
        localStorage.getItem("cart");


    if (!cart) {

        return [];

    }


    return JSON.parse(cart);

}


// ذخیره سبد

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// قالب قیمت

function formatPrice(price) {

    return price.toLocaleString("fa-IR")
        + " تومان";

}


// نمایش سبد

function renderCart() {

    const cart =
        getCart();


    const container =
        document.getElementById(
            "cart-products"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        showEmptyCart();

        updateSummary();

        return;

    }


    cart.forEach(function(item) {

        const product =
            document.createElement("div");


        product.className =
            "cart-item";


        product.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="item-info">

                <h2>
                    ${item.name}
                </h2>

                <p>
                    ساعت با طراحی خاص
                </p>

                <span class="item-price">
                    ${formatPrice(item.price)}
                </span>

            </div>


            <div class="quantity">

                <button
                    class="increase"
                    data-id="${item.id}">
                    +
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    class="decrease"
                    data-id="${item.id}">
                    -
                </button>

            </div>


            <button
                class="delete"
                data-id="${item.id}">

                <i class="fas fa-trash"></i>

            </button>

        `;


        container.appendChild(
            product
        );

    });


    addCartEvents();

    updateSummary();

}


// سبد خالی

function showEmptyCart() {

    const container =
        document.getElementById(
            "cart-products"
        );


    container.innerHTML = `

        <div class="empty-cart">

            <i class="fas fa-shopping-cart"></i>

            <h2>
                سبد خرید شما خالی است
            </h2>

            <p>
                هنوز محصولی به سبد خرید اضافه نکرده‌اید.
            </p>

            <a href="index.html">

                مشاهده محصولات

            </a>

        </div>

    `;

}


// رویدادهای سبد

function addCartEvents() {


    // افزایش تعداد

    document
        .querySelectorAll(".increase")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        button.dataset.id;


                    changeQuantity(
                        id,
                        1
                    );

                }
            );

        });




    document
        .querySelectorAll(".decrease")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        button.dataset.id;


                    changeQuantity(
                        id,
                        -1
                    );

                }
            );

        });


    document
        .querySelectorAll(".delete")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        button.dataset.id;


                    removeProduct(id);

                }
            );

        });

}


// تغییر تعداد

function changeQuantity(id, amount) {

    let cart =
        getCart();


    const product =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!product) {

        return;

    }


    product.quantity += amount;


    if (product.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== id;

            });

    }


    saveCart(cart);


    renderCart();

}


// حذف محصول

function removeProduct(id) {

    let cart =
        getCart();


    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    saveCart(cart);


    renderCart();

}


// به روزرسانی خلاصه

function updateSummary() {

    const cart =
        getCart();


    let count = 0;

    let total = 0;


    cart.forEach(function(item) {

        count += item.quantity;

        total +=
            item.price *
            item.quantity;

    });


    document
        .getElementById("cart-count")
        .textContent =
        count.toLocaleString("fa-IR")
        + " کالا";


    document
        .getElementById("cart-subtotal")
        .textContent =
        formatPrice(total);


    document
        .getElementById("cart-total")
        .textContent =
        formatPrice(total);

}


// اجرا

renderCart();