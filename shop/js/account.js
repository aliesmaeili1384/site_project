// ورود

const isLoggedIn =
    localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    window.location.href =
        "login.html";

}


// دریافت کاربر

const savedUser =
    localStorage.getItem("user");

if (!savedUser) {

    localStorage.removeItem("isLoggedIn");

    window.location.href =
        "login.html";

}


// اطلاعات کاربر

let user =
    JSON.parse(savedUser);


// عناصر

const firstNameElement =
    document.getElementById("first-name");

const lastNameElement =
    document.getElementById("last-name");

const phoneElement =
    document.getElementById("phone");

const addressElement =
    document.getElementById("address");


const editButton =
    document.getElementById("edit-button");

const editForm =
    document.getElementById("edit-form");

const cancelEdit =
    document.getElementById("cancel-edit");

const editFirstName =
    document.getElementById("edit-first-name");

const editLastName =
    document.getElementById("edit-last-name");

const editPhone =
    document.getElementById("edit-phone");

const editAddress =
    document.getElementById("edit-address");

const logoutButton =
    document.getElementById("logout-button");

const accountMessage =
    document.getElementById("account-message");


// نمایش کاربر

function showUser() {

    firstNameElement.textContent =
        user.firstName;

    lastNameElement.textContent =
        user.lastName;

    phoneElement.textContent =
        user.phone;

    addressElement.textContent =
        user.address || "-";

}


showUser();


// اعتبارسنجی شماره

function isValidPhone(phone) {

    return /^09\d{9}$/.test(phone);

}


// نمایش پیام

function showMessage(text, type) {

    accountMessage.textContent =
        text;

    accountMessage.className =
        "account-message " + type;

}


// پاک کردن پیام

function clearMessage() {

    accountMessage.textContent =
        "";

    accountMessage.className =
        "account-message";

}


// باز کردن ویرایش

editButton.addEventListener(
    "click",
    function () {

        clearMessage();


        editFirstName.value =
            user.firstName;

        editLastName.value =
            user.lastName;

        editPhone.value =
            user.phone;

        editAddress.value =
            user.address || "";


        editForm.classList.add(
            "show"
        );


        editButton.style.display =
            "none";


        editForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


// لغو ویرایش

cancelEdit.addEventListener(
    "click",
    function () {

        editForm.classList.remove(
            "show"
        );


        editButton.style.display =
            "block";


        clearMessage();

    }
);


// ذخیره ویرایش

editForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const firstName =
            editFirstName.value.trim();

        const lastName =
            editLastName.value.trim();

        const phone =
            editPhone.value.trim();

        const address =
            editAddress.value.trim();


        if (
            firstName === "" ||
            lastName === "" ||
            phone === "" ||
            address === ""
        ) {

            showMessage(
                "لطفاً تمام فیلدها را پر کنید.",
                "error"
            );

            return;

        }


        if (!isValidPhone(phone)) {

            showMessage(
                "شماره موبایل باید به صورت 09123456789 باشد.",
                "error"
            );

            return;

        }


        user.firstName =
            firstName;

        user.lastName =
            lastName;

        user.phone =
            phone;

        user.address =
            address;


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        showUser();


        showMessage(
            "اطلاعات با موفقیت ویرایش شد.",
            "success"
        );


        setTimeout(
            function () {

                editForm.classList.remove(
                    "show"
                );


                editButton.style.display =
                    "block";

            },
            1000
        );

    }
);


// خروج

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "isLoggedIn"
        );


        localStorage.removeItem(
            "rememberLogin"
        );


        window.location.href =
            "login.html";

    }
);