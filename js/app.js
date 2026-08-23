/* ==========================================
   RANGINEH MAIN APP
========================================== */


/* ==========================================
   CART
========================================== */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("rangineh_cart")
        ) || [];

    } catch {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "rangineh_cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* ==========================================
   CART COUNT
========================================== */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => {
            return total + Number(item.quantity || 0);
        },
        0
    );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                count.toLocaleString("fa-IR");

        });

}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(productId, quantity = 1) {

    const product =
        getProductById(productId);


    if (!product) {

        showToast(
            "محصول پیدا نشد."
        );

        return;

    }


    const cart = getCart();


    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (existing) {

        existing.quantity += Number(quantity);

    } else {

        cart.push({

            id: product.id,

            quantity: Number(quantity)

        });

    }


    saveCart(cart);


    showToast(
        "محصول به سبد خرید اضافه شد ✓"
    );

}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    let toast =
        document.querySelector(".toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.ranginehToast
    );


    window.ranginehToast =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return Number(price).toLocaleString(
        "fa-IR"
    ) + " تومان";

}


/* ==========================================
   ACCOUNT MENU
========================================== */

function initializeAccountMenu() {

    const button =
        document.getElementById(
            "accountButton"
        );


    const menu =
        document.getElementById(
            "accountMenu"
        );


    if (!button || !menu) return;


    const guestMenu =
        document.getElementById(
            "guestAccountMenu"
        );


    const userMenu =
        document.getElementById(
            "userAccountMenu"
        );


    const userName =
        document.getElementById(
            "accountUserName"
        );


    const userEmail =
        document.getElementById(
            "accountUserEmail"
        );


    const adminLink =
        document.getElementById(
            "adminPanelLink"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    /* --------------------------------------
       OPEN / CLOSE
    -------------------------------------- */

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const isOpen =
                menu.classList.contains(
                    "show"
                );


            menu.classList.toggle(
                "show",
                !isOpen
            );


            button.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        }
    );


    /* --------------------------------------
       CLOSE OUTSIDE
    -------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".account-wrapper"
                )
            ) {

                menu.classList.remove(
                    "show"
                );


                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* --------------------------------------
       CURRENT USER
    -------------------------------------- */

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


    /* --------------------------------------
       GUEST
    -------------------------------------- */

    if (!user) {

        guestMenu?.classList.remove(
            "hidden"
        );


        userMenu?.classList.add(
            "hidden"
        );


        return;

    }


    /* --------------------------------------
       LOGGED IN USER
    -------------------------------------- */

    guestMenu?.classList.add(
        "hidden"
    );


    userMenu?.classList.remove(
        "hidden"
    );


    if (userName) {

        userName.textContent =
            user.name || "کاربر";

    }


    if (userEmail) {

        userEmail.textContent =
            user.email || "";

    }


    /* --------------------------------------
       ADMIN
    -------------------------------------- */

    if (
        user.isAdmin === true
    ) {

        adminLink?.classList.remove(
            "hidden"
        );

    } else {

        adminLink?.classList.add(
            "hidden"
        );

    }


    /* --------------------------------------
       LOGOUT
    -------------------------------------- */

    logoutButton?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "rangineh_user"
            );


            showToast(
                "از حساب خارج شدی."
            );


            setTimeout(
                () => {

                    window.location.reload();

                },
                500
            );

        }
    );

}


/* ==========================================
   PRODUCT CARD
========================================== */

function createProductCard(product) {

    return `

        <article class="product-card">


            <a
                href="product.html?id=${product.id}"
                class="product-image"
                style="--paint:${product.color}"
            >

                <span>
                    ${product.colorName}
                </span>

            </a>


            <div class="product-body">


                <span class="product-brand">
                    ${product.brand}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <div class="product-meta">

                    <span>
                        ${product.usage}
                    </span>

                    <span>
                        ${product.volume}
                    </span>

                    <span>
                        ${product.package}
                    </span>

                </div>


                <div class="product-bottom">


                    <strong>
                        ${formatPrice(product.price)}
                    </strong>


                    <button
                        class="add-button"
                        data-add-product="${product.id}"
                        type="button"
                        aria-label="افزودن به سبد"
                    >
                        +
                    </button>


                </div>


            </div>


        </article>

    `;

}


/* ==========================================
   FILTER HELPERS
========================================== */

function uniqueValues(
    products,
    key
) {

    return [
        ...new Set(
            products.map(
                product =>
                    product[key]
            )
        )
    ];

}


function createCheckboxFilters(
    containerId,
    values,
    name
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) return;


    container.innerHTML =
        values.map(
            value => `

                <label>

                    <input
                        type="checkbox"
                        name="${name}"
                        value="${value}"
                    >

                    <span>
                        ${value}
                    </span>

                </label>

            `
        ).join("");

}


/* ==========================================
   HOME
========================================== */

function initializeHome() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) return;


    let products =
        getProducts();


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const sortSelect =
        document.getElementById(
            "sortSelect"
        );


    const priceRange =
        document.getElementById(
            "priceRange"
        );


    const colorCodeFilter =
        document.getElementById(
            "colorCodeFilter"
        );


    const colorNameFilter =
        document.getElementById(
            "colorNameFilter"
        );


    /* FILTER OPTIONS */

    createCheckboxFilters(
        "usageFilters",
        uniqueValues(
            products,
            "usage"
        ),
        "usage"
    );


    createCheckboxFilters(
        "volumeFilters",
        uniqueValues(
            products,
            "volume"
        ),
        "volume"
    );


    createCheckboxFilters(
        "packageFilters",
        uniqueValues(
            products,
            "package"
        ),
        "package"
    );


    createCheckboxFilters(
        "featureFilters",
        uniqueValues(
            products,
            "feature"
        ),
        "feature"
    );


    function getSelected(
        name
    ) {

        return [
            ...document.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ].map(
            input => input.value
        );

    }


    /* RENDER */

    function render() {

        products =
            getProducts();


        let result =
            [...products];


        const search =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        const colorCode =
            colorCodeFilter?.value
                .trim()
                .toLowerCase() || "";


        const colorName =
            colorNameFilter?.value
                .trim()
                .toLowerCase() || "";


        const maxPrice =
            Number(
                priceRange?.value ||
                5000000
            );


        const usages =
            getSelected("usage");


        const volumes =
            getSelected("volume");


        const packages =
            getSelected("package");


        const features =
            getSelected("feature");


        result =
            result.filter(
                product => {

                    const searchMatch =
                        !search ||
                        product.name
                            .toLowerCase()
                            .includes(search) ||

                        product.brand
                            .toLowerCase()
                            .includes(search) ||

                        product.colorName
                            .toLowerCase()
                            .includes(search) ||

                        product.color
                            .toLowerCase()
                            .includes(search);


                    const codeMatch =
                        !colorCode ||
                        product.color
                            .toLowerCase()
                            .includes(
                                colorCode
                            );


                    const nameMatch =
                        !colorName ||
                        product.colorName
                            .toLowerCase()
                            .includes(
                                colorName
                            );


                    const priceMatch =
                        product.price <=
                        maxPrice;


                    const usageMatch =
                        usages.length === 0 ||
                        usages.includes(
                            product.usage
                        );


                    const volumeMatch =
                        volumes.length === 0 ||
                        volumes.includes(
                            product.volume
                        );


                    const packageMatch =
                        packages.length === 0 ||
                        packages.includes(
                            product.package
                        );


                    const featureMatch =
                        features.length === 0 ||
                        features.includes(
                            product.feature
                        );


                    return (
                        searchMatch &&
                        codeMatch &&
                        nameMatch &&
                        priceMatch &&
                        usageMatch &&
                        volumeMatch &&
                        packageMatch &&
                        featureMatch
                    );

                }
            );


        /* SORT */

        const sort =
            sortSelect?.value;


        if (
            sort === "cheap"
        ) {

            result.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (
            sort === "expensive"
        ) {

            result.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (
            sort === "popular"
        ) {

            result.sort(
                (a, b) =>
                    b.sold - a.sold
            );

        }


        if (
            sort === "newest"
        ) {

            result.sort(
                (a, b) =>
                    new Date(
                        b.createdAt
                    ) -
                    new Date(
                        a.createdAt
                    )
            );

        }


        /* PRODUCTS */

        grid.innerHTML =
            result
                .map(
                    createProductCard
                )
                .join("");


        /* COUNT */

        const count =
            document.getElementById(
                "resultCount"
            );


        if (count) {

            count.textContent =
                `${result.length.toLocaleString("fa-IR")} محصول`;

        }


        /* EMPTY */

        const empty =
            document.getElementById(
                "emptyState"
            );


        if (empty) {

            empty.classList.toggle(
                "hidden",
                result.length !== 0
            );

        }

    }


    /* EVENTS */

    searchInput?.addEventListener(
        "input",
        render
    );


    colorCodeFilter?.addEventListener(
        "input",
        render
    );


    colorNameFilter?.addEventListener(
        "input",
        render
    );


    priceRange?.addEventListener(
        "input",
        () => {

            const maxPrice =
                document.getElementById(
                    "maxPrice"
                );


            if (maxPrice) {

                maxPrice.textContent =
                    formatPrice(
                        priceRange.value
                    );

            }


            render();

        }
    );


    sortSelect?.addEventListener(
        "change",
        render
    );


    document.addEventListener(
        "change",
        event => {

            if (
                event.target.matches(
                    ".filters input[type='checkbox']"
                )
            ) {

                render();

            }

        }
    );


    document
        .getElementById(
            "clearFilters"
        )
        ?.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filters input"
                    )
                    .forEach(
                        input => {

                            if (
                                input.type ===
                                "checkbox"
                            ) {

                                input.checked =
                                    false;

                            } else {

                                input.value =
                                    "";

                            }

                        }
                    );


                if (priceRange) {

                    priceRange.value =
                        priceRange.max;

                }


                const maxPrice =
                    document.getElementById(
                        "maxPrice"
                    );


                if (maxPrice) {

                    maxPrice.textContent =
                        formatPrice(
                            priceRange.max
                        );

                }


                render();

            }
        );


    render();

}


/* ==========================================
   ADD BUTTON
========================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-add-product]"
            );


        if (!button) return;


        const id =
            Number(
                button.dataset.addProduct
            );


        addToCart(id);

    }
);


/* ==========================================
   ACCOUNT PAGE
========================================== */

function initializeAccount() {

    const container =
        document.getElementById(
            "accountContainer"
        );


    if (!container) return;


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


    if (!user) {

        container.innerHTML = `

            <div class="auth-card">

                <span class="section-label">
                    حساب کاربری
                </span>

                <h1>
                    هنوز وارد نشده‌ای
                </h1>

                <p>
                    برای مشاهده حساب کاربری
                    ابتدا وارد شوید.
                </p>

                <a
                    href="login.html"
                    class="button button-primary"
                >
                    ورود
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="about-hero">

            <span class="section-label">
                حساب کاربری
            </span>

            <h1>
                سلام ${user.name} 👋
            </h1>

            <p>
                ${user.email}
            </p>


            ${
                user.isAdmin === true
                ?

                `
                <a
                    href="admin.html"
                    class="button button-primary"
                >
                    ورود به پنل مدیریت
                </a>
                `
                :

                ""
            }

        </div>

    `;

}


/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        initializeAccountMenu();

        initializeHome();

        initializeAccount();

    }
);