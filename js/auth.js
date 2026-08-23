/* ==========================================
   AUTHENTICATION
   FRONTEND DEMO ONLY
========================================== */


/* ==========================================
   REGISTER
========================================== */

const registerForm =
    document.getElementById(
        "registerForm"
    );


registerForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim()
            .toLowerCase();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        const message =
            document.getElementById(
                "registerMessage"
            );


        const users =
            JSON.parse(
                localStorage.getItem(
                    "rangineh_users"
                )
            ) || [];


        const exists =
            users.some(
                user =>
                    user.email === email
            );


        if (exists) {

            message.innerHTML = `

                <p style="color:#a64c3c">
                    این ایمیل قبلاً ثبت شده است.
                </p>

            `;

            return;

        }


        const user = {

            id:
                Date.now(),

            name,

            email,

            password

        };


        users.push(user);


        localStorage.setItem(
            "rangineh_users",
            JSON.stringify(users)
        );


        localStorage.setItem(
            "rangineh_user",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            })
        );


        message.innerHTML = `

            <p style="color:#4b8058">
                ثبت‌نام با موفقیت انجام شد.
            </p>

        `;


        setTimeout(
            () => {

                location.href =
                    "index.html";

            },
            700
        );

    }
);


/* ==========================================
   LOGIN
========================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


loginForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim()
            .toLowerCase();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const message =
            document.getElementById(
                "loginMessage"
            );


        const users =
            JSON.parse(
                localStorage.getItem(
                    "rangineh_users"
                )
            ) || [];


        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        if (!user) {

            message.innerHTML = `

                <p style="color:#a64c3c">
                    ایمیل یا رمز عبور اشتباه است.
                </p>

            `;

            return;

        }


        localStorage.setItem(
            "rangineh_user",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            })
        );


        message.innerHTML = `

            <p style="color:#4b8058">
                ورود موفق بود ✓
            </p>

        `;


        setTimeout(
            () => {

                location.href =
                    "account.html";

            },
            500
        );

    }
);