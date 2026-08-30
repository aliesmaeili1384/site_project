const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const products = {
"1": {
name: "ساعت کلاسیک",
price: 250000,
image: "/static/shop/images/1.jpg",
description: "ساعت کلاسیک با طراحی ساده و شیک، مناسب برای استفاده روزمره و استایل رسمی."
},


"2": {
    name: "ساعت اسپرت",
    price: 320000,
    image: "/static/shop/images/2.jpg",
    description: "ساعت اسپرت با طراحی مدرن و جذاب، انتخابی مناسب برای استفاده روزمره و فعالیت‌های مختلف."
},

"3": {
    name: "ساعت لوکس",
    price: 180000,
    image: "/static/shop/images/3.jpg",
    description: "ساعت لوکس با طراحی ظریف و چشم‌نواز، مناسب برای افرادی که به استایل و زیبایی اهمیت می‌دهند."
},

"4": {
    name: "ساعت طلایی",
    price: 450000,
    image: "/static/shop/images/4.jpg",
    description: "ساعت طلایی با ظاهر خاص و جذاب که جلوه‌ای لوکس به استایل شما می‌بخشد."
},

"5": {
    name: "ساعت مردانه",
    price: 520000,
    image: "/static/shop/images/5.jpg",
    description: "ساعت مردانه با طراحی قدرتمند و کلاسیک، مناسب برای استفاده روزانه و موقعیت‌های رسمی."
},

"6": {
    name: "ساعت زنانه",
    price: 380000,
    image: "/static/shop/images/6.jpg",
    description: "ساعت زنانه با طراحی ظریف و زیبا، مناسب برای تکمیل استایل‌های مختلف."
}


};

const product = products[productId];

const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const quantityElement = document.getElementById("quantity");
const message = document.getElementById("message");

let quantity = 1;

if (product) {


productImage.src = product.image;
productImage.alt = product.name;

productName.textContent = product.name;

productPrice.textContent =
    product.price.toLocaleString("fa-IR");

productDescription.textContent =
    product.description;


} else {


productName.textContent = "محصول پیدا نشد";

productDescription.textContent =
    "محصول مورد نظر وجود ندارد.";


}

document.getElementById("increase").addEventListener("click", function () {


quantity++;

quantityElement.textContent =
    quantity.toLocaleString("fa-IR");


});

document.getElementById("decrease").addEventListener("click", function () {


if (quantity > 1) {

    quantity--;

    quantityElement.textContent =
        quantity.toLocaleString("fa-IR");

}


});

document.getElementById("add-to-cart").addEventListener("click", function () {


if (!product) {
    return;
}

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const existingProduct =
    cart.find(item => item.id === productId);

if (existingProduct) {

    existingProduct.quantity += quantity;

} else {

    cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
    });

}

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

message.textContent =
    "محصول با موفقیت به سبد خرید اضافه شد.";


});
