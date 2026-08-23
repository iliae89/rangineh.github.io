/* ==========================================
   CART PAGE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "cartContainer"
            );

        if (!container) return;


        /* ==========================================
           GET CART ITEMS
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
                            Number(item.quantity) || 1
                    };

                })
                .filter(Boolean);

        }


        /* ==========================================
           CALCULATE TOTAL
        ========================================== */

        function calculateTotal(items) {

            return items.reduce(
                (total, item) => {

                    return total +
                        (
                            item.product.price *
                            item.quantity
                        );

                },
                0
            );

        }


        /* ==========================================
           RENDER CART
        ========================================== */

        function renderCart() {

            const items =
                getCartItems();


            /* EMPTY */

            if (items.length === 0) {

                container.innerHTML = `

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

                updateCartCount();

                return;

            }


            const total =
                calculateTotal(items);


            const totalQuantity =
                items.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                );


            /* ==========================================
               ITEMS
            ========================================== */

            const itemsHTML =
                items
                    .map(item => {

                        const product =
                            item.product;

                        const subtotal =
                            product.price *
                            item.quantity;


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

                                    <h3>
                                        ${product.name}
                                    </h3>


                                    <p>
                                        ${product.brand}
                                        ·
                                        ${product.volume}
                                        ·
                                        ${product.package}
                                    </p>


                                    <div class="cart-item-price">
                                        ${formatPrice(product.price)}
                                    </div>


                                    <div
                                        class="cart-quantity"
                                        aria-label="تعداد محصول"
                                    >

                                        <button
                                            type="button"
                                            data-cart-minus="${product.id}"
                                            aria-label="کم کردن تعداد"
                                        >
                                            −
                                        </button>


                                        <span>
                                            ${item.quantity.toLocaleString("fa-IR")}
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

                                    <strong>
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

                    })
                    .join("");


            /* ==========================================
               CART HTML
            ========================================== */

            container.innerHTML = `

                <div class="cart-layout">


                    <section class="cart-items">

                        ${itemsHTML}

                    </section>


                    <aside class="cart-summary">

                        <h2>
                            خلاصه سفارش
                        </h2>


                        <div class="summary-row">

                            <span>
                                تعداد کالا
                            </span>

                            <span>
                                ${totalQuantity.toLocaleString("fa-IR")}
                            </span>

                        </div>


                        <div class="summary-row">

                            <span>
                                مبلغ کالاها
                            </span>

                            <span>
                                ${formatPrice(total)}
                            </span>

                        </div>


                        <div class="summary-row">

                            <span>
                                هزینه ارسال
                            </span>

                            <span>
                                در مرحله بعد
                            </span>

                        </div>


                        <div class="summary-total">

                            <span>
                                مجموع
                            </span>

                            <span>
                                ${formatPrice(total)}
                            </span>

                        </div>


                        <a
                            href="checkout.html"
                            class="button button-primary checkout-button"
                        >
                            ادامه سفارش
                        </a>


                        <a
                            href="index.html"
                            class="cart-continue-shopping"
                        >
                            ← ادامه خرید
                        </a>

                    </aside>


                </div>

            `;


            updateCartCount();

        }


        /* ==========================================
           CART ACTIONS
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


                if (
                    !plus &&
                    !minus &&
                    !remove
                ) {
                    return;
                }


                const button =
                    plus ||
                    minus ||
                    remove;


                const id =
                    Number(
                        button.dataset.cartPlus ||
                        button.dataset.cartMinus ||
                        button.dataset.cartRemove
                    );


                if (!id) return;


                const cart =
                    getCart();


                const item =
                    cart.find(
                        item =>
                            Number(item.id) === id
                    );


                if (!item) return;


                /* PLUS */

                if (plus) {

                    item.quantity =
                        Number(item.quantity) + 1;

                }


                /* MINUS */

                if (minus) {

                    item.quantity =
                        Number(item.quantity) - 1;


                    if (
                        item.quantity <= 0
                    ) {

                        const index =
                            cart.indexOf(item);

                        cart.splice(
                            index,
                            1
                        );

                    }

                }


                /* REMOVE */

                if (remove) {

                    const index =
                        cart.indexOf(item);

                    cart.splice(
                        index,
                        1
                    );

                }


                saveCart(cart);

                renderCart();

            }
        );


        /* ==========================================
           INITIAL RENDER
        ========================================== */

        renderCart();

    }
);