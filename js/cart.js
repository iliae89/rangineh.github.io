/* ==========================================
   RANGINEH CART PAGE
========================================== */


/* ==========================================
   STATE
========================================== */

let appliedDiscount = 0;

const SHIPPING_COST = 0;


/* ==========================================
   ELEMENTS
========================================== */

const cartContainer =
    document.getElementById("cartContainer");


/* ==========================================
   FORMAT
========================================== */

function getCartItems() {

    const cart = getCart();

    const products = getProducts();

    return cart
        .map(item => {

            const product =
                products.find(
                    product =>
                        Number(product.id) ===
                        Number(item.id)
                );

            if (!product) return null;

            return {
                product,
                quantity:
                    Math.max(
                        1,
                        Number(item.quantity) || 1
                    )
            };

        })
        .filter(Boolean);

}


/* ==========================================
   CALCULATIONS
========================================== */

function calculateCart(items) {

    const subtotal =
        items.reduce(
            (total, item) =>
                total +
                item.product.price *
                item.quantity,
            0
        );


    const discount =
        Math.min(
            appliedDiscount,
            subtotal
        );


    const shipping =
        items.length > 0
            ? SHIPPING_COST
            : 0;


    const total =
        subtotal -
        discount +
        shipping;


    return {
        subtotal,
        discount,
        shipping,
        total
    };

}


/* ==========================================
   RENDER EMPTY
========================================== */

function renderEmptyCart() {

    cartContainer.innerHTML = `

        <div class="empty-cart">

            <div class="empty-cart-icon">
                🛒
            </div>

            <h2>
                سبد خرید خالی است
            </h2>

            <p>
                هنوز محصولی انتخاب نکرده‌ای.
            </p>

            <a
                href="index.html"
                class="button button-primary"
            >
                رفتن به فروشگاه
            </a>

        </div>

    `;

}


/* ==========================================
   RENDER CART
========================================== */

function renderCart() {

    const items =
        getCartItems();


    if (items.length === 0) {

        appliedDiscount = 0;

        renderEmptyCart();

        updateCartCount();

        return;

    }


    const totals =
        calculateCart(items);


    const totalQuantity =
        items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const itemsHTML =
        items.map(
            ({ product, quantity }) => {

                const subtotal =
                    product.price *
                    quantity;


                return `

                    <article
                        class="cart-item"
                    >

                        <a
                            href="product.html?id=${product.id}"
                            class="cart-item-image"
                            style="--paint:${product.color}"
                            aria-label="${product.name}"
                        ></a>


                        <div class="cart-item-info">

                            <span class="cart-item-brand">
                                ${product.brand}
                            </span>

                            <h3>
                                ${product.name}
                            </h3>

                            <p>
                                ${product.colorName}
                                ·
                                ${product.volume}
                                ·
                                ${product.package}
                            </p>

                            <div class="cart-item-price">
                                ${formatPrice(product.price)}
                            </div>


                            <div class="cart-quantity">

                                <button
                                    type="button"
                                    data-cart-minus="${product.id}"
                                    aria-label="کاهش تعداد"
                                >
                                    −
                                </button>

                                <span>
                                    ${quantity}
                                </span>

                                <button
                                    type="button"
                                    data-cart-plus="${product.id}"
                                    aria-label="افزایش تعداد"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-item-actions">

                            <strong
                                class="cart-item-subtotal"
                            >
                                ${formatPrice(subtotal)}
                            </strong>


                            <button
                                type="button"
                                class="remove-item"
                                data-cart-remove="${product.id}"
                                aria-label="حذف ${product.name}"
                            >
                                ×
                            </button>

                        </div>

                    </article>

                `;

            }
        ).join("");


    cartContainer.innerHTML = `

        <div class="cart-layout">

            <section>

                <div class="cart-items">

                    ${itemsHTML}

                </div>


                <div class="cart-actions">

                    <button
                        type="button"
                        id="clearCartButton"
                        class="clear-cart-button"
                    >
                        🗑️ خالی کردن سبد خرید
                    </button>

                </div>

            </section>


            <aside class="cart-summary">

                <h2>
                    خلاصه سفارش
                </h2>


                <div class="summary-row">

                    <span>
                        تعداد کالا
                    </span>

                    <strong>
                        ${totalQuantity.toLocaleString("fa-IR")}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        مبلغ کالاها
                    </span>

                    <strong>
                        ${formatPrice(totals.subtotal)}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        تخفیف
                    </span>

                    <strong>
                        ${
                            totals.discount > 0
                                ? "-" + formatPrice(totals.discount)
                                : "۰ تومان"
                        }
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        هزینه ارسال
                    </span>

                    <strong>
                        ${
                            totals.shipping === 0
                                ? "رایگان"
                                : formatPrice(totals.shipping)
                        }
                    </strong>

                </div>


                <div class="discount-box">

                    <input
                        type="text"
                        id="discountCode"
                        class="input"
                        placeholder="کد تخفیف"
                        autocomplete="off"
                    >

                    <button
                        type="button"
                        id="applyDiscount"
                        class="discount-button"
                    >
                        اعمال
                    </button>

                </div>


                <div
                    id="discountMessage"
                    class="discount-message"
                ></div>


                <div class="summary-total">

                    <span>
                        مبلغ نهایی
                    </span>

                    <span>
                        ${formatPrice(totals.total)}
                    </span>

                </div>


                <button
                    type="button"
                    id="checkoutButton"
                    class="button button-primary checkout-button"
                >
                    ادامه سفارش
                </button>


                <a
                    href="index.html"
                    class="continue-shopping"
                >
                    ← ادامه خرید
                </a>

            </aside>

        </div>

    `;

}


/* ==========================================
   UPDATE ITEM
========================================== */

function updateCartItem(productId, change) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!item) return;


    item.quantity =
        Number(item.quantity) || 1;


    item.quantity += change;


    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);

    }


    saveCart(cart);

    renderCart();

}


/* ==========================================
   REMOVE ITEM
========================================== */

function removeCartItem(productId) {

    const cart =
        getCart();


    const newCart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveCart(newCart);

    renderCart();

    showToast(
        "محصول از سبد خرید حذف شد"
    );

}


/* ==========================================
   CLEAR CART
========================================== */

function clearCart() {

    if (!confirm(
        "آیا مطمئنی می‌خواهی سبد خرید را خالی کنی؟"
    )) {

        return;

    }


    saveCart([]);

    appliedDiscount = 0;

    renderCart();

    showToast(
        "سبد خرید خالی شد"
    );

}


/* ==========================================
   DISCOUNT
========================================== */

function applyDiscountCode() {

    const input =
        document.getElementById(
            "discountCode"
        );


    const message =
        document.getElementById(
            "discountMessage"
        );


    if (!input || !message) return;


    const code =
        input.value
            .trim()
            .toUpperCase();


    const items =
        getCartItems();


    const subtotal =
        items.reduce(
            (total, item) =>
                total +
                item.product.price *
                item.quantity,
            0
        );


    if (!code) {

        message.textContent =
            "کد تخفیف را وارد کن.";

        return;

    }


    /*
        کد آزمایشی مرحله ۳
        فعلاً 10٪ تخفیف
    */

    if (code === "RANG10") {

        appliedDiscount =
            Math.round(
                subtotal * 0.10
            );


        message.textContent =
            "کد تخفیف با موفقیت اعمال شد ✓";


        renderCart();

        return;

    }


    appliedDiscount = 0;


    message.textContent =
        "کد تخفیف معتبر نیست.";

}


/* ==========================================
   CHECKOUT
========================================== */

function startCheckout() {

    const items =
        getCartItems();


    if (items.length === 0) {

        showToast(
            "سبد خرید خالی است."
        );

        return;

    }


    const user =
        localStorage.getItem(
            "rangineh_user"
        );


    if (!user) {

        showToast(
            "برای ادامه سفارش ابتدا وارد حساب شوید."
        );


        setTimeout(
            () => {

                window.location.href =
                    "login.html";

            },
            900
        );


        return;

    }


    /*
        فعلاً صفحه checkout را نداریم.
        در ادامه مرحله ۳ ساخته می‌شود.
    */

    showToast(
        "در حال انتقال به ثبت سفارش..."
    );


    setTimeout(
        () => {

            window.location.href =
                "checkout.html";

        },
        700
    );

}


/* ==========================================
   EVENTS
========================================== */

document.addEventListener(
    "click",
    event => {


        const plus =
            event.target.closest(
                "[data-cart-plus]"
            );


        const minus =
            event.target.closest(
                "[data-cart-minus]"
            );


        const remove =
            event.target.closest(
                "[data-cart-remove]"
            );


        const clear =
            event.target.closest(
                "#clearCartButton"
            );


        const discount =
            event.target.closest(
                "#applyDiscount"
            );


        const checkout =
            event.target.closest(
                "#checkoutButton"
            );


        if (plus) {

            updateCartItem(
                Number(
                    plus.dataset.cartPlus
                ),
                1
            );

            return;

        }


        if (minus) {

            updateCartItem(
                Number(
                    minus.dataset.cartMinus
                ),
                -1
            );

            return;

        }


        if (remove) {

            removeCartItem(
                Number(
                    remove.dataset.cartRemove
                )
            );

            return;

        }


        if (clear) {

            clearCart();

            return;

        }


        if (discount) {

            applyDiscountCode();

            return;

        }


        if (checkout) {

            startCheckout();

        }

    }
);


/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

        updateCartCount();

    }
);