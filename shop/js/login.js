
// ورود

const loginTab =
    document.getElementById("login-tab");

const registerTab =
    document.getElementById("register-tab");

const loginForm =
    document.getElementById("login-form");

const registerForm =
    document.getElementById("register-form");

const formTitle =
    document.getElementById("form-title");

const message =
    document.getElementById("message");



// ورود

loginTab.addEventListener("click", function () {

    loginForm.classList.add("active-form");

    registerForm.classList.remove("active-form");


    loginTab.classList.add("active");

    registerTab.classList.remove("active");


    formTitle.textContent =
        "ورود به حساب کاربری";


    clearMessage();

});



// ثبت نام

registerTab.addEventListener("click", function () {

    registerForm.classList.add("active-form");

    loginForm.classList.remove("active-form");


    registerTab.classList.add("active");

    loginTab.classList.remove("active");


    formTitle.textContent =
        "ساخت حساب کاربری";


    clearMessage();

});



// پیام

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "message " + type;

}


function clearMessage() {

    message.textContent = "";

    message.className = "message";

}



// اعتبارسنجی شماره

function isValidPhone(phone) {

    return /^09\d{9}$/.test(phone);

}



// ثبت نام

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const firstName =
        document.getElementById("first-name")
        .value.trim();


    const lastName =
        document.getElementById("last-name")
        .value.trim();


    const phone =
        document.getElementById("register-phone")
        .value.trim();


    const address =
        document.getElementById("register-address")
        .value.trim();


    const password =
        document.getElementById("register-password")
        .value;


    const confirmPassword =
        document.getElementById("confirm-password")
        .value;



    // اعتبارسنجی

    if (
        firstName === "" ||
        lastName === "" ||
        phone === "" ||
        address === "" ||
        password === "" ||
        confirmPassword === ""
    ){

        showMessage(
            "لطفاً تمام فیلدها را پر کنید.",
            "error"
        );

        return;
    }



    if (!isValidPhone(phone)) {

        showMessage(
            "شماره تلفن باید به صورت 09123456789 باشد.",
            "error"
        );

        return;
    }



    if (password.length < 4) {

        showMessage(
            "رمز عبور باید حداقل ۴ کاراکتر باشد.",
            "error"
        );

        return;
    }



    if (password !== confirmPassword) {

        showMessage(
            "رمز عبور و تکرار آن یکسان نیستند.",
            "error"
        );

        return;
    }



    // بررسی کاربر

    const existingUser =
        localStorage.getItem("user");


    if (existingUser) {

        const user =
            JSON.parse(existingUser);


        if (user.phone === phone) {

            showMessage(
                "این شماره تلفن قبلاً ثبت نام کرده است.",
                "error"
            );

            return;
        }

    }



    // ساخت کاربر

    const user = {

        firstName: firstName,

        lastName: lastName,

        phone: phone,

        address: address,

        password: password

    };



    // ذخیره کاربر

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );



    // ورود کاربر

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );



    // موفقیت

    showMessage(
        "ثبت نام با موفقیت انجام شد.",
        "success"
    );


    registerForm.reset();



    // انتقال به حساب

    setTimeout(function () {

        window.location.href =
            "account.html";

    }, 1000);

});



// ورود

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const phone =
        document.getElementById("login-phone")
        .value.trim();


    const password =
        document.getElementById("login-password")
        .value;



    // اعتبارسنجی

    if (phone === "" || password === "") {

        showMessage(
            "شماره تلفن و رمز عبور را وارد کنید.",
            "error"
        );

        return;
    }



    if (!isValidPhone(phone)) {

        showMessage(
            "شماره تلفن وارد شده صحیح نیست.",
            "error"
        );

        return;
    }



    // دریافت کاربر

    const savedUser =
        localStorage.getItem("user");


    if (!savedUser) {

        showMessage(
            "کاربری با این مشخصات پیدا نشد. ابتدا ثبت نام کنید.",
            "error"
        );

        return;
    }



    const user =
        JSON.parse(savedUser);



    // بررسی اطلاعات

    if (
        user.phone !== phone ||
        user.password !== password
    ) {

        showMessage(
            "شماره تلفن یا رمز عبور اشتباه است.",
            "error"
        );

        return;
    }



    // ورود موفق

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );



    // به خاطر سپاری

    const remember =
        document.getElementById("remember").checked;


    if (remember) {

        localStorage.setItem(
            "rememberLogin",
            "true"
        );

    } else {

        localStorage.removeItem(
            "rememberLogin"
        );

    }



    // موفقیت

    showMessage(
        "ورود با موفقیت انجام شد.",
        "success"
    );



    // انتقال به حساب

    setTimeout(function () {

        window.location.href =
            "account.html";

    }, 700);

});

