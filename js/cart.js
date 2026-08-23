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


        function renderCart() {

            const cart = getCart();

            const products = getProducts();


            const items =
                cart
                    .map(item => {

                        const product =
                            products.find(
                                p =>
                                    Number(p.id) ===
                                    Number(item.id)
                            );

                        if (!product) return null;

                        return {
                            product,
                            quantity:
                                item.quantity
                        };

                    })
                    .filter(Boolean);


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

                return;

            }


            let total = 0;


            const itemsHTML =
                items.map(item => {

                    const product =
                        item.product;

                    const subtotal =
                        product.price *
                        item.quantity;


                    total += subtotal;


                    return `

                        <article
                            class="cart-item"
                        >

                            <a
                                href="product.html?id=${product.id}"
                                class="cart-item-image"
                                style="--paint:${product.color}"
                            ></a>


                            <div class="cart-item-info">

                                <h3>
                                    ${product.name}
                                </h3>

                                <p>
                                    ${product.volume}
                                    ·
                                    ${product.package}
                                </p>

                                <div class="cart-item-price">
                                    ${formatPrice(product.price)}
                                </div>


                                <div class="cart-quantity">

                                    <button
                                        data-cart-minus="${product.id}"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${item.quantity}
                                    </span>

                                    <button
                                        data-cart-plus="${product.id}"
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
                                    class="remove-item"
                                    data-cart-remove="${product.id}"
                                    aria-label="حذف محصول"
                                >
                                    ×
                                </button>

                            </div>

                        </article>

                    `;

                }).join("");


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
                                ${items.reduce(
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                ).toLocaleString("fa-IR")}
                            </span>

                        </div>


                        <div class="summary-row">

                            <span>
                                هزینه ارسال
                            </span>

                            <span>
                                فعلاً رایگان
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


                        <button
                            class="button button-primary checkout-button"
                            onclick="showToast('پرداخت در نسخه فعلی فعال نیست.')"
                        >
                            ادامه سفارش
                        </button>

                    </aside>

                </div>

            `;

        }


        /* EVENTS */

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
                    plus ||
                    minus ||
                    remove
                ) {

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


                    const cart =
                        getCart();


                    const item =
                        cart.find(
                            item =>
                                Number(item.id) === id
                        );


                    if (!item) return;


                    if (plus) {

                        item.quantity++;

                    }


                    if (minus) {

                        item.quantity--;

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

            }
        );


        renderCart();

    }
);