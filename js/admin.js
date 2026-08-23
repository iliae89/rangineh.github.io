/* ==========================================
   RANGINEH ADMIN PANEL
========================================== */


/* ==========================================
   ADMIN ACCESS CHECK
========================================== */

function checkAdminAccess() {

    let user = null;


    try {

        user =
            JSON.parse(
                localStorage.getItem(
                    "rangineh_user"
                )
            );

    } catch {

        user = null;

    }


    if (
        !user ||
        user.isAdmin !== true
    ) {

        document.body.innerHTML = `

            <main
                style="
                    min-height:100vh;
                    display:grid;
                    place-items:center;
                    padding:30px;
                    background:#f8eee5;
                    direction:rtl;
                    font-family:Tahoma, sans-serif;
                "
            >

                <div
                    style="
                        max-width:500px;
                        width:100%;
                        text-align:center;
                        background:#fffaf5;
                        padding:40px 25px;
                        border-radius:24px;
                        box-shadow:0 15px 50px rgba(70,40,25,.12);
                    "
                >

                    <div
                        style="
                            font-size:60px;
                            margin-bottom:15px;
                        "
                    >
                        🔒
                    </div>


                    <h1>
                        دسترسی غیرمجاز
                    </h1>


                    <p
                        style="
                            color:#8c7769;
                            line-height:2;
                        "
                    >
                        برای ورود به پنل مدیریت
                        باید با حساب ادمین وارد شوید.
                    </p>


                    <a
                        href="index.html"
                        style="
                            display:inline-block;
                            margin-top:15px;
                            padding:12px 22px;
                            border-radius:12px;
                            background:#b95635;
                            color:white;
                            text-decoration:none;
                        "
                    >
                        بازگشت به سایت
                    </a>

                </div>

            </main>

        `;


        return false;

    }


    return true;

}


/* ==========================================
   STOP IF NOT ADMIN
========================================== */

if (
    !checkAdminAccess()
) {

    throw new Error(
        "Admin access denied."
    );

}


/* ==========================================
   TABS
========================================== */

const adminTabs =
    document.querySelectorAll(
        ".admin-tab"
    );


const adminPanels =
    document.querySelectorAll(
        ".admin-panel"
    );


adminTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.dataset.tab;


                adminTabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                adminPanels.forEach(
                    panel => {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        target
                    )
                    ?.classList.add(
                        "active"
                    );

            }
        );

    }
);


/* ==========================================
   PRODUCTS
========================================== */

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProductsList"
        );


    if (!container) return;


    const products =
        getProducts();


    const count =
        document.getElementById(
            "productCount"
        );


    if (count) {

        count.textContent =
            products.length.toLocaleString(
                "fa-IR"
            );

    }


    if (
        products.length === 0
    ) {

        container.innerHTML = `

            <p>
                هنوز محصولی ثبت نشده است.
            </p>

        `;

        return;

    }


    container.innerHTML =
        products
            .map(
                product => `

                    <div
                        class="admin-product"
                    >

                        <div
                            class="admin-product-info"
                        >

                            <span
                                class="admin-color"
                                style="
                                    background:${product.color}
                                "
                            ></span>


                            <div>

                                <strong>
                                    ${product.name}
                                </strong>

                                <small>
                                    ${formatPrice(product.price)}
                                </small>

                            </div>

                        </div>


                        <button
                            class="delete-product"
                            data-delete-product="${product.id}"
                            type="button"
                        >
                            حذف
                        </button>

                    </div>

                `
            )
            .join("");

}


/* ==========================================
   MODAL
========================================== */

const modal =
    document.getElementById(
        "productModal"
    );


const openModal =
    document.getElementById(
        "openProductModal"
    );


const closeModal =
    document.getElementById(
        "closeProductModal"
    );


openModal?.addEventListener(
    "click",
    () => {

        modal?.classList.remove(
            "hidden"
        );

    }
);


closeModal?.addEventListener(
    "click",
    () => {

        modal?.classList.add(
            "hidden"
        );

    }
);


modal?.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);


/* ==========================================
   ADD PRODUCT
========================================== */

const productForm =
    document.getElementById(
        "productForm"
    );


productForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const products =
            getProducts();


        const newProduct = {

            id:
                Date.now(),

            name:
                document.getElementById(
                    "productName"
                ).value.trim(),

            brand:
                "رنگینه",

            price:
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                ),

            color:
                document.getElementById(
                    "productColor"
                ).value.trim(),

            colorName:
                document.getElementById(
                    "productColorName"
                ).value.trim(),

            usage:
                document.getElementById(
                    "productUsage"
                ).value.trim(),

            volume:
                document.getElementById(
                    "productVolume"
                ).value.trim(),

            package:
                document.getElementById(
                    "productPackage"
                ).value.trim(),

            feature:
                document.getElementById(
                    "productFeature"
                ).value.trim(),

            description:
                document.getElementById(
                    "productDescription"
                ).value.trim(),

            rating:
                0,

            reviews:
                0,

            sold:
                0,

            createdAt:
                new Date()
                    .toISOString()
                    .slice(0, 10)

        };


        products.push(
            newProduct
        );


        saveProducts(
            products
        );


        productForm.reset();


        modal?.classList.add(
            "hidden"
        );


        renderAdminProducts();


        showToast(
            "محصول با موفقیت اضافه شد ✓"
        );

    }
);


/* ==========================================
   DELETE PRODUCT
========================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-delete-product]"
            );


        if (!button) return;


        const id =
            Number(
                button.dataset.deleteProduct
            );


        const confirmed =
            confirm(
                "آیا از حذف این محصول مطمئن هستید؟"
            );


        if (!confirmed) return;


        const products =
            getProducts().filter(
                product =>
                    Number(product.id) !== id
            );


        saveProducts(
            products
        );


        renderAdminProducts();


        showToast(
            "محصول حذف شد."
        );

    }
);


/* ==========================================
   ADMIN LOGOUT
========================================== */

document
    .getElementById(
        "adminLogout"
    )
    ?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "rangineh_user"
            );


            window.location.href =
                "index.html";

        }
    );


/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAdminProducts();

    }
);