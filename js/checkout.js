/* ==========================================
   CHECKOUT PAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("checkoutContainer");

    if (!container) return;


    /* ==========================================
       CART
    ========================================== */

    const cart = getCart();
    const products = getProducts();

    const items = cart
        .map(function (item) {

            const product = products.find(function (p) {
                return Number(p.id) === Number(item.id);
            });

            if (!product) return null;

            return {
                product: product,
                quantity: Number(item.quantity) || 1
            };

        })
        .filter(Boolean);


    /* ==========================================
       EMPTY CART
    ========================================== */

    if (items.length === 0) {

        container.innerHTML = `
        
            <div class="checkout-empty">

                <div class="checkout-empty-icon">
                    🛒
                </div>

                <h2>
                    سبد خرید خالی است
                </h2>

                <p>
                    برای ثبت سفارش ابتدا محصولی
                    به سبد خرید اضافه کنید.
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


    /* ==========================================
       TOTAL
    ========================================== */

    let productsTotal = 0;
    let totalQuantity = 0;

    items.forEach(function (item) {

        productsTotal +=
            item.product.price *
            item.quantity;

        totalQuantity +=
            item.quantity;

    });


    /* ==========================================
       RENDER
    ========================================== */

    container.innerHTML = `

        <div class="checkout-layout">


            <!-- =========================
                 FORM
            ========================= -->

            <div>


                <!-- RECEIVER -->

                <section class="checkout-card">

                    <h2>
                        👤 اطلاعات گیرنده
                    </h2>

                    <form
                        id="checkoutForm"
                        class="checkout-form"
                    >

                        <div class="form-grid">


                            <div class="form-group">

                                <label for="firstName">
                                    نام
                                </label>

                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="نام"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="lastName">
                                    نام خانوادگی
                                </label>

                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="نام خانوادگی"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="phone">
                                    شماره موبایل
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputmode="numeric"
                                    placeholder="09123456789"
                                    maxlength="11"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="postalCode">
                                    کد پستی
                                </label>

                                <input
                                    id="postalCode"
                                    name="postalCode"
                                    type="text"
                                    inputmode="numeric"
                                    placeholder="۱۰ رقم"
                                    maxlength="10"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="province">
                                    استان
                                </label>

                                <input
                                    id="province"
                                    name="province"
                                    type="text"
                                    placeholder="مثلاً تهران"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="city">
                                    شهر
                                </label>

                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="مثلاً تهران"
                                    required
                                >

                            </div>


                            <div class="form-group full">

                                <label for="address">
                                    آدرس کامل
                                </label>

                                <textarea
                                    id="address"
                                    name="address"
                                    placeholder="آدرس دقیق محل تحویل..."
                                    required
                                ></textarea>

                            </div>


                            <div class="form-group full">

                                <label for="description">
                                    توضیحات سفارش
                                    <span style="color:var(--muted)">
                                        (اختیاری)
                                    </span>
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="مثلاً قبل از ارسال تماس بگیرید..."
                                ></textarea>

                            </div>


                        </div>


                    </form>

                </section>


                <!-- =========================
                     SHIPPING
                ========================= -->

                <section class="checkout-card">

                    <h2>
                        🚚 روش ارسال
                    </h2>


                    <div class="shipping-methods">


                        <label class="shipping-option">

                            <input
                                type="radio"
                                name="shipping"
                                value="free"
                                data-price="0"
                                checked
                            >

                            <span class="shipping-info">

                                <span class="shipping-title">
                                    ارسال عادی
                                </span>

                                <span class="shipping-description">
                                    ارسال با روش معمول
                                </span>

                            </span>

                            <span class="shipping-price">
                                رایگان
                            </span>

                        </label>


                        <label class="shipping-option">

                            <input
                                type="radio"
                                name="shipping"
                                value="express"
                                data-price="150000"
                            >

                            <span class="shipping-info">

                                <span class="shipping-title">
                                    ارسال سریع
                                </span>

                                <span class="shipping-description">
                                    اولویت در ارسال سفارش
                                </span>

                            </span>

                            <span class="shipping-price">
                                ۱۵۰٬۰۰۰ تومان
                            </span>

                        </label>


                    </div>

                </section>


                <!-- =========================
                     PAYMENT
                ========================= -->

                <section class="checkout-card">

                    <h2>
                        💳 روش پرداخت
                    </h2>


                    <div class="shipping-methods">


                        <label class="shipping-option">

                            <input
                                type="radio"
                                name="payment"
                                value="online"
                                checked
                            >

                            <span class="shipping-info">

                                <span class="shipping-title">
                                    پرداخت آنلاین
                                </span>

                                <span class="shipping-description">
                                    پرداخت از طریق درگاه بانکی
                                </span>

                            </span>

                        </label>


                        <label class="shipping-option">

                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                            >

                            <span class="shipping-info">

                                <span class="shipping-title">
                                    پرداخت هنگام تحویل
                                </span>

                                <span class="shipping-description">
                                    فعلاً آزمایشی
                                </span>

                            </span>

                        </label>


                    </div>

                </section>


            </div>


            <!-- =========================
                 SUMMARY
            ========================= -->

            <aside class="checkout-summary">

                <h2>
                    خلاصه سفارش
                </h2>


                <div class="summary-products">

                    ${items.map(function (item) {

                        const subtotal =
                            item.product.price *
                            item.quantity;

                        return `

                            <div class="summary-product">

                                <div
                                    class="summary-product-image"
                                    style="--paint:${item.product.color}"
                                ></div>

                                <div class="summary-product-info">

                                    <strong>
                                        ${item.product.name}
                                    </strong>

                                    <span>
                                        ${item.quantity}
                                        عدد
                                    </span>

                                </div>

                                <span class="summary-product-price">
                                    ${formatPrice(subtotal)}
                                </span>

                            </div>

                        `;

                    }).join("")}

                </div>


                <div class="checkout-summary-row">

                    <span>
                        تعداد کالا
                    </span>

                    <span>
                        ${totalQuantity.toLocaleString("fa-IR")}
                    </span>

                </div>


                <div class="checkout-summary-row">

                    <span>
                        مبلغ کالاها
                    </span>

                    <span>
                        ${formatPrice(productsTotal)}
                    </span>

                </div>


                <div class="checkout-summary-row">

                    <span>
                        هزینه ارسال
                    </span>

                    <span id="shippingPrice">
                        رایگان
                    </span>

                </div>


                <div class="checkout-summary-total">

                    <span>
                        مبلغ نهایی
                    </span>

                    <strong id="finalPrice">
                        ${formatPrice(productsTotal)}
                    </strong>

                </div>


                <button
                    type="submit"
                    form="checkoutForm"
                    class="button button-primary submit-order"
                >
                    ثبت سفارش
                </button>

            </aside>


        </div>

    `;


    /* ==========================================
       SHIPPING
    ========================================== */

    const shippingInputs =
        document.querySelectorAll(
            "input[name='shipping']"
        );


    shippingInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            updatePrice
        );

    });


    function updatePrice() {

        const selected =
            document.querySelector(
                "input[name='shipping']:checked"
            );

        const shipping =
            Number(
                selected?.dataset.price || 0
            );


        const shippingElement =
            document.getElementById(
                "shippingPrice"
            );


        const finalElement =
            document.getElementById(
                "finalPrice"
            );


        if (shippingElement) {

            shippingElement.textContent =
                shipping === 0
                    ? "رایگان"
                    : formatPrice(shipping);

        }


        if (finalElement) {

            finalElement.textContent =
                formatPrice(
                    productsTotal + shipping
                );

        }

    }


    /* ==========================================
       FORM SUBMIT
    ========================================== */

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const firstName =
                document.getElementById(
                    "firstName"
                ).value.trim();


            const lastName =
                document.getElementById(
                    "lastName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const postalCode =
                document.getElementById(
                    "postalCode"
                ).value.trim();


            const province =
                document.getElementById(
                    "province"
                ).value.trim();


            const city =
                document.getElementById(
                    "city"
                ).value.trim();


            const address =
                document.getElementById(
                    "address"
                ).value.trim();


            const description =
                document.getElementById(
                    "description"
                ).value.trim();


            /* VALIDATION */

            if (
                !firstName ||
                !lastName ||
                !phone ||
                !postalCode ||
                !province ||
                !city ||
                !address
            ) {

                showToast(
                    "لطفاً همه اطلاعات الزامی را وارد کنید."
                );

                return;

            }


            if (
                !/^09\d{9}$/.test(phone)
            ) {

                showToast(
                    "شماره موبایل صحیح نیست."
                );

                return;

            }


            if (
                !/^\d{10}$/.test(
                    postalCode
                )
            ) {

                showToast(
                    "کد پستی باید ۱۰ رقم باشد."
                );

                return;

            }


            /* SHIPPING */

            const selectedShipping =
                document.querySelector(
                    "input[name='shipping']:checked"
                );


            const shipping =
                Number(
                    selectedShipping?.dataset.price || 0
                );


            /* PAYMENT */

            const payment =
                document.querySelector(
                    "input[name='payment']:checked"
                )?.value || "online";


            /* ORDER ID */

            const orderId =
                "RG-" +
                Date.now()
                    .toString()
                    .slice(-8);


            /* ORDER */

            const order = {

                id: orderId,

                createdAt:
                    new Date().toISOString(),

                customer: {

                    firstName,
                    lastName,
                    phone,
                    postalCode,
                    province,
                    city,
                    address,
                    description

                },

                shipping: {

                    method:
                        selectedShipping?.value,

                    price:
                        shipping

                },

                payment,

                items:
                    items.map(function (item) {

                        return {

                            id:
                                item.product.id,

                            name:
                                item.product.name,

                            price:
                                item.product.price,

                            quantity:
                                item.quantity

                        };

                    }),

                productsTotal,

                shippingPrice:
                    shipping,

                total:
                    productsTotal +
                    shipping,

                status:
                    "ثبت شده"

            };


            /* SAVE */

            const orders =
                JSON.parse(
                    localStorage.getItem(
                        "rangineh_orders"
                    )
                ) || [];


            orders.push(order);


            localStorage.setItem(
                "rangineh_orders",
                JSON.stringify(orders)
            );


            /* EMPTY CART */

            saveCart([]);


            /* SUCCESS */

            container.innerHTML = `

                <div class="order-success">

                    <div class="success-icon">
                        ✓
                    </div>

                    <h1>
                        سفارش با موفقیت ثبت شد
                    </h1>

                    <p>
                        سفارش شما ثبت شد.
                    </p>


                    <div class="order-number">

                        شماره سفارش:

                        <strong>
                            ${orderId}
                        </strong>

                    </div>


                    <p>
                        مبلغ نهایی:

                        <strong>
                            ${formatPrice(order.total)}
                        </strong>
                    </p>


                    <a
                        href="index.html"
                        class="button button-primary"
                    >
                        بازگشت به فروشگاه
                    </a>

                </div>

            `;


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});