// سبد

function getCart() {

    const cart =
        localStorage.getItem("cart");

    if (!cart) {

        return [];

    }

    return JSON.parse(cart);

}


// ذخیره

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// افزودن

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        /*
        جلوگیری از اجرای event خود کارت
        */

        event.stopPropagation();


        const product =
            button.closest(".prod");


        const id =
            product.dataset.id;

        const name =
            product.dataset.name;

        const price =
            Number(product.dataset.price);

        const image =
            product.dataset.image;


        let cart =
            getCart();


        // بررسی

        const existingProduct =
            cart.find(function(item) {

                return item.id === id;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        }

        else {

            cart.push({

                id: id,

                name: name,

                price: price,

                image: image,

                quantity: 1

            });

        }


        saveCart(cart);


        showMessage(
            "محصول به سبد خرید اضافه شد"
        );


        updateCartCount();

    });

});


// شمارش

function updateCartCount() {

    const cart =
        getCart();


    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    const cartButton =
        document.querySelector(
            '.footer-item:nth-child(2)'
        );


    if (!cartButton) {

        return;

    }


    let badge =
        cartButton.querySelector(".cart-badge");


    if (!badge) {

        badge =
            document.createElement("span");

        badge.classList.add(
            "cart-badge"
        );

        cartButton.appendChild(
            badge
        );

    }


    badge.textContent = count;


    if (count === 0) {

        badge.style.display = "none";

    }

    else {

        badge.style.display = "flex";

    }

}


// پیام

function showMessage(text) {

    const message =
        document.createElement("div");


    message.className =
        "cart-message";


    message.textContent =
        text;


    document.body.appendChild(
        message
    );


    setTimeout(function() {

        message.classList.add(
            "show"
        );

    }, 10);


    setTimeout(function() {

        message.classList.remove(
            "show"
        );


        setTimeout(function() {

            message.remove();

        }, 300);

    }, 2000);

}


// دکمه

const footerItems =
    document.querySelectorAll(
        ".footer-item"
    );


footerItems.forEach(function(item) {

    item.addEventListener(
        "click",
        function() {

            const text =
                item
                    .querySelector("span")
                    .textContent
                    .trim();


            if (text === "سبد خرید") {

                window.location.href =
                    "cart.html";

            }


            if (text === "حساب کاربری") {

                window.location.href =
                    "login.html";

            }

        }
    );

});


// آغاز

updateCartCount();