/* ==========================================
   RANGINEH
   MAIN APPLICATION
========================================== */


/* ==========================================
   GLOBAL HELPERS
========================================== */

function getStoredUser() {

    try {

        return JSON.parse(
            localStorage.getItem("rangineh_user")
        );

    } catch {

        return null;

    }

}


function isAdmin() {

    const user = getStoredUser();

    return !!(
        user &&
        (
            user.role === "admin" ||
            user.isAdmin === true
        )
    );

}


/* ==========================================
   CART
========================================== */

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    "rangineh_cart"
                )
            );

        return Array.isArray(cart)
            ? cart
            : [];

    } catch {

        return [];

    }

}


function saveCart(cart) {

    if (!Array.isArray(cart)) {

        return;

    }

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

    const cart =
        getCart();

    const count =
        cart.reduce(
            (total, item) => {

                const quantity =
                    Number(item.quantity) || 0;

                return total + quantity;

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

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        getProductById(productId);

    if (!product) {

        showToast(
            "محصول پیدا نشد."
        );

        return false;

    }


    const requestedQuantity =
        Math.max(
            1,
            Number(quantity) || 1
        );


    /* --------------------------------------
       STOCK CHECK
    -------------------------------------- */

    if (
        product.stock !== undefined &&
        product.stock <= 0
    ) {

        showToast(
            "این محصول در حال حاضر موجود نیست."
        );

        return false;

    }


    const cart =
        getCart();


    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (existing) {

        const newQuantity =
            existing.quantity +
            requestedQuantity;


        if (
            product.stock !== undefined &&
            newQuantity > product.stock
        ) {

            existing.quantity =
                product.stock;

            showToast(
                "بیشترین تعداد موجود به سبد اضافه شد."
            );

        } else {

            existing.quantity =
                newQuantity;

            showToast(
                "تعداد محصول افزایش یافت ✓"
            );

        }

    } else {

        cart.push({

            id: product.id,

            quantity:
                Math.min(
                    requestedQuantity,
                    product.stock ??
                    requestedQuantity
                )

        });


        showToast(
            "محصول به سبد خرید اضافه شد ✓"
        );

    }


    saveCart(cart);

    return true;

}


/* ==========================================
   REMOVE FROM CART
========================================== */

function removeFromCart(productId) {

    const cart =
        getCart();


    const newCart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveCart(newCart);

}


/* ==========================================
   UPDATE CART ITEM
========================================== */

function updateCartItem(
    productId,
    quantity
) {

    const cart =
        getCart();


    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(productId)
        );


    if (!item) {

        return false;

    }


    const product =
        getProductById(productId);


    let newQuantity =
        Math.max(
            0,
            Number(quantity) || 0
        );


    if (
        product &&
        product.stock !== undefined
    ) {

        newQuantity =
            Math.min(
                newQuantity,
                product.stock
            );

    }


    if (newQuantity <= 0) {

        removeFromCart(productId);

        return true;

    }


    item.quantity =
        newQuantity;


    saveCart(cart);

    return true;

}


/* ==========================================
   CLEAR CART
========================================== */

function clearCart() {

    localStorage.removeItem(
        "rangineh_cart"
    );

    updateCartCount();

}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    let toast =
        document.querySelector(
            ".toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.className =
            "toast";

        toast.setAttribute(
            "role",
            "status"
        );

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

    const number =
        Number(price) || 0;


    return (
        number.toLocaleString(
            "fa-IR"
        ) +
        " تومان"
    );

}


/* ==========================================
   CREATE PRODUCT CARD
========================================== */

function createProductCard(product) {

    if (!product) {

        return "";

    }


    const stock =
        Number(product.stock);


    const outOfStock =
        !Number.isNaN(stock) &&
        stock <= 0;


    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <a
                href="product.html?id=${encodeURIComponent(product.id)}"
                class="product-image"
                style="--paint:${product.color || "#b85c38"}"
                aria-label="${product.name || "محصول"}"
            >

                <span>
                    ${product.colorName || ""}
                </span>

            </a>


            <div class="product-body">

                <span class="product-brand">
                    ${product.brand || "رنگینه"}
                </span>


                <h3>
                    ${product.name || "محصول بدون نام"}
                </h3>


                <div class="product-meta">

                    ${
                        product.usage
                            ? `<span>${product.usage}</span>`
                            : ""
                    }

                    ${
                        product.volume
                            ? `<span>${product.volume}</span>`
                            : ""
                    }

                    ${
                        product.package
                            ? `<span>${product.package}</span>`
                            : ""
                    }

                </div>


                <div class="product-bottom">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>


                    ${
                        outOfStock

                        ? `

                            <button
                                class="add-button disabled"
                                type="button"
                                disabled
                                aria-label="ناموجود"
                            >
                                ×
                            </button>

                        `

                        : `

                            <button
                                class="add-button"
                                type="button"
                                data-add-product="${product.id}"
                                aria-label="افزودن ${product.name} به سبد"
                            >
                                +
                            </button>

                        `
                    }

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
            products
                .map(
                    product =>
                        product[key]
                )
                .filter(Boolean)
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


    if (!container) {

        return;

    }


    container.innerHTML =
        values
            .map(
                value => `

                    <label>

                        <input
                            type="checkbox"
                            name="${name}"
                            value="${String(value)
                                .replace(/"/g, "&quot;")}"
                        >

                        <span>
                            ${value}
                        </span>

                    </label>

                `
            )
            .join("");

}


/* ==========================================
   GET SELECTED FILTERS
========================================== */

function getSelectedFilters(
    name
) {

    return [
        ...document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ]
        .map(
            input =>
                input.value
        );

}


/* ==========================================
   HOME PAGE
========================================== */

function initializeHome() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) {

        return;

    }


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


    /* --------------------------------------
       CREATE FILTERS
    -------------------------------------- */

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


    /* --------------------------------------
       RENDER
    -------------------------------------- */

    function render() {

        /*
         * دوباره محصولات را از storage می‌خوانیم
         * تا اگر پنل مدیریت محصولی اضافه/حذف کرد،
         * صفحه اطلاعات جدید را داشته باشد.
         */

        products =
            getProducts();


        let result =
            [...products];


        const search =
            searchInput
                ?.value
                .trim()
                .toLowerCase() || "";


        const colorCode =
            colorCodeFilter
                ?.value
                .trim()
                .toLowerCase() || "";


        const colorName =
            colorNameFilter
                ?.value
                .trim()
                .toLowerCase() || "";


        const maxPrice =
            Number(
                priceRange?.value ||
                5000000
            );


        const usages =
            getSelectedFilters(
                "usage"
            );


        const volumes =
            getSelectedFilters(
                "volume"
            );


        const packages =
            getSelectedFilters(
                "package"
            );


        const features =
            getSelectedFilters(
                "feature"
            );


        /* ----------------------------------
           FILTER
        ---------------------------------- */

        result =
            result.filter(
                product => {

                    const name =
                        String(
                            product.name || ""
                        )
                            .toLowerCase();


                    const brand =
                        String(
                            product.brand || ""
                        )
                            .toLowerCase();


                    const colorNameValue =
                        String(
                            product.colorName || ""
                        )
                            .toLowerCase();


                    const color =
                        String(
                            product.color || ""
                        )
                            .toLowerCase();


                    const searchMatch =
                        !search ||
                        name.includes(search) ||
                        brand.includes(search) ||
                        colorNameValue.includes(search) ||
                        color.includes(search);


                    const codeMatch =
                        !colorCode ||
                        color.includes(
                            colorCode
                        );


                    const nameMatch =
                        !colorName ||
                        colorNameValue.includes(
                            colorName
                        );


                    const priceMatch =
                        Number(
                            product.price
                        ) <= maxPrice;


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


        /* ----------------------------------
           SORT
        ---------------------------------- */

        const sort =
            sortSelect?.value ||
            "newest";


        if (sort === "cheap") {

            result.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        else if (
            sort === "expensive"
        ) {

            result.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        else if (
            sort === "popular"
        ) {

            result.sort(
                (a, b) =>
                    Number(b.sold || 0) -
                    Number(a.sold || 0)
            );

        }


        else {

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


        /* ----------------------------------
           DISPLAY
        ---------------------------------- */

        grid.innerHTML =
            result
                .map(
                    createProductCard
                )
                .join("");


        const count =
            document.getElementById(
                "resultCount"
            );


        if (count) {

            count.textContent =
                `${result.length.toLocaleString("fa-IR")} محصول`;

        }


        const empty =
            document.getElementById(
                "emptyState"
            );


        if (empty) {

            empty.classList.toggle(
                "hidden",
                result.length > 0
            );

        }

    }


    /* --------------------------------------
       EVENTS
    -------------------------------------- */

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

                            }

                            else {

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
                            priceRange?.max ||
                            5000000
                        );

                }


                render();

            }
        );


    render();

}


/* ==========================================
   ADD TO CART EVENT DELEGATION
========================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-add-product]"
            );


        if (!button) {

            return;

        }


        event.preventDefault();


        const id =
            Number(
                button.dataset.addProduct
            );


        addToCart(id);

    }
);


/* ==========================================
   ACCOUNT DROPDOWN
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


    if (!button || !menu) {

        return;

    }


    const guestMenu =
        document.getElementById(
            "guestAccountMenu"
        );


    const userMenu =
        document.getElementById(
            "userAccountMenu"
        );


    const adminPanelLink =
        document.getElementById(
            "adminPanelLink"
        );


    const adminHeaderButton =
        document.getElementById(
            "adminHeaderButton"
        );


    const accountUserName =
        document.getElementById(
            "accountUserName"
        );


    const accountUserEmail =
        document.getElementById(
            "accountUserEmail"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    /* --------------------------------------
       USER STATE
    -------------------------------------- */

    function updateAccountUI() {

        const user =
            getStoredUser();


        if (!user) {

            guestMenu
                ?.classList
                .remove("hidden");


            userMenu
                ?.classList
                .add("hidden");


            adminPanelLink
                ?.classList
                .add("hidden");


            adminHeaderButton
                ?.classList
                .add("hidden");


            return;

        }


        guestMenu
            ?.classList
            .add("hidden");


        userMenu
            ?.classList
            .remove("hidden");


        if (accountUserName) {

            accountUserName.textContent =
                user.name ||
                "کاربر";

        }


        if (accountUserEmail) {

            accountUserEmail.textContent =
                user.email ||
                "";

        }


        if (isAdmin()) {

            adminPanelLink
                ?.classList
                .remove("hidden");


            adminHeaderButton
                ?.classList
                .remove("hidden");

        }

        else {

            adminPanelLink
                ?.classList
                .add("hidden");


            adminHeaderButton
                ?.classList
                .add("hidden");

        }

    }


    /* --------------------------------------
       OPEN / CLOSE
    -------------------------------------- */

    function openMenu() {

        menu.classList.add(
            "show"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu() {

        menu.classList.remove(
            "show"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleMenu() {

        const isOpen =
            menu.classList.contains(
                "show"
            );


        if (isOpen) {

            closeMenu();

        }

        else {

            openMenu();

        }

    }


    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleMenu();

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* --------------------------------------
       LOGOUT
    -------------------------------------- */

    logoutButton
        ?.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "rangineh_user"
                );


                closeMenu();


                updateAccountUI();


                showToast(
                    "با موفقیت از حساب خارج شدی."
                );


                setTimeout(
                    () => {

                        location.reload();

                    },
                    500
                );

            }
        );


    updateAccountUI();

}


/* ==========================================
   ACCOUNT PAGE
========================================== */

function initializeAccountPage() {

    const container =
        document.getElementById(
            "accountContainer"
        );


    if (!container) {

        return;

    }


    const user =
        getStoredUser();


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
                    ابتدا وارد حساب خود شوید.
                </p>

                <a
                    href="login.html"
                    class="button button-primary"
                >
                    ورود به حساب
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
                سلام ${user.name || "کاربر"} 👋
            </h1>

            <p>
                ${user.email || ""}
            </p>

            ${
                isAdmin()

                ? `

                    <a
                        href="admin.html"
                        class="button button-primary"
                    >
                        🛠️ ورود به پنل مدیریت
                    </a>

                `

                : ""
            }

            <button
                id="accountPageLogout"
                type="button"
                class="button button-secondary"
            >
                خروج از حساب
            </button>

        </div>

    `;


    document
        .getElementById(
            "accountPageLogout"
        )
        ?.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "rangineh_user"
                );

                location.href =
                    "index.html";

            }
        );

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        initializeHome();

        initializeAccountMenu();

        initializeAccountPage();

    }
);


/* ==========================================
   GLOBAL API
========================================== */

window.RanginehApp = {

    getCart,

    saveCart,

    addToCart,

    removeFromCart,

    updateCartItem,

    clearCart,

    updateCartCount,

    showToast,

    formatPrice,

    isAdmin,

    getStoredUser

};