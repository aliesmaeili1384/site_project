// ======================================
// گرفتن عناصر صفحه
// ======================================

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


// ======================================
// نمایش پیام
// ======================================

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "message " + type;
}


// ======================================
// پاک کردن پیام
// ======================================

function clearMessage() {

    message.textContent = "";

    message.className = "message";
}


// ======================================
// تغییر تب به ورود
// ======================================

function showLoginForm() {

    loginForm.classList.add(
        "active-form"
    );

    registerForm.classList.remove(
        "active-form"
    );


    loginTab.classList.add(
        "active"
    );

    registerTab.classList.remove(
        "active"
    );


    formTitle.textContent =
        "ورود به حساب کاربری";


    clearMessage();
}


// ======================================
// تغییر تب به ثبت نام
// ======================================

function showRegisterForm() {

    registerForm.classList.add(
        "active-form"
    );

    loginForm.classList.remove(
        "active-form"
    );


    registerTab.classList.add(
        "active"
    );

    loginTab.classList.remove(
        "active"
    );


    formTitle.textContent =
        "ساخت حساب کاربری";


    clearMessage();
}


// ======================================
// کلیک روی تب ورود
// ======================================

loginTab.addEventListener(
    "click",
    function () {

        showLoginForm();

    }
);


// ======================================
// کلیک روی تب ثبت نام
// ======================================

registerTab.addEventListener(
    "click",
    function () {

        showRegisterForm();

    }
);


// ======================================
// بررسی شماره تلفن
// ======================================

function isValidPhone(phone) {

    return /^09\d{9}$/.test(phone);

}


// ======================================
// فرم ثبت نام
// ======================================

registerForm.addEventListener(
    "submit",
    function (event) {


        const firstName =
            document
                .getElementById("first-name")
                .value
                .trim();


        const lastName =
            document
                .getElementById("last-name")
                .value
                .trim();


        const phone =
            document
                .getElementById("register-phone")
                .value
                .trim();


        const address =
            document
                .getElementById("register-address")
                .value
                .trim();


        const password =
            document
                .getElementById("register-password")
                .value;


        const confirmPassword =
            document
                .getElementById("confirm-password")
                .value;



        // -------------------------------
        // بررسی خالی بودن فیلدها
        // -------------------------------

        if (
            firstName === "" ||
            lastName === "" ||
            phone === "" ||
            address === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            event.preventDefault();

            showMessage(
                "لطفاً تمام فیلدها را پر کنید.",
                "error"
            );

            return;
        }



        // -------------------------------
        // بررسی شماره تلفن
        // -------------------------------

        if (!isValidPhone(phone)) {

            event.preventDefault();

            showMessage(
                "شماره تلفن باید به صورت 09123456789 باشد.",
                "error"
            );

            return;
        }



        // -------------------------------
        // بررسی طول رمز
        // -------------------------------

        if (password.length < 4) {

            event.preventDefault();

            showMessage(
                "رمز عبور باید حداقل ۴ کاراکتر باشد.",
                "error"
            );

            return;
        }



        // -------------------------------
        // بررسی تکرار رمز
        // -------------------------------

        if (password !== confirmPassword) {

            event.preventDefault();

            showMessage(
                "رمز عبور و تکرار آن یکسان نیستند.",
                "error"
            );

            return;
        }


        // اگر همه چیز درست باشد
        // فرم به Django ارسال می‌شود

    }
);


// ======================================
// فرم ورود
// ======================================

loginForm.addEventListener(
    "submit",
    function (event) {


        const phone =
            document
                .getElementById("login-phone")
                .value
                .trim();


        const password =
            document
                .getElementById("login-password")
                .value;



        // -------------------------------
        // بررسی خالی بودن
        // -------------------------------

        if (
            phone === "" ||
            password === ""
        ) {

            event.preventDefault();

            showMessage(
                "شماره تلفن و رمز عبور را وارد کنید.",
                "error"
            );

            return;
        }



        // -------------------------------
        // بررسی شماره تلفن
        // -------------------------------

        if (!isValidPhone(phone)) {

            event.preventDefault();

            showMessage(
                "شماره تلفن وارد شده صحیح نیست.",
                "error"
            );

            return;
        }


        // اگر درست باشد
        // فرم به Django ارسال می‌شود

    }
);


// ======================================
// انتخاب تب هنگام باز شدن صفحه
// ======================================

const activeTab =
    document.body.dataset.activeTab || "login";


// ======================================
// تعیین تب اولیه
// ======================================

if (activeTab === "register") {

    showRegisterForm();

}
else {

    showLoginForm();

}