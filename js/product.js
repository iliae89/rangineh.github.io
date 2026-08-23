/* ==========================================
   PRODUCT PAGE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "productDetails"
            );

        if (!container) return;


        const params =
            new URLSearchParams(
                window.location.search
            );


        const id =
            Number(
                params.get("id")
            );


        const product =
            getProductById(id);


        if (!product) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        🎨
                    </div>

                    <h2>
                        محصول پیدا نشد
                    </h2>

                    <a
                        href="index.html"
                        class="button button-primary"
                    >
                        بازگشت به فروشگاه
                    </a>

                </div>

            `;

            return;

        }


        container.innerHTML = `

            <div class="product-details">


                <!-- IMAGE -->

                <div class="product-gallery">

                    <div
                        class="product-main-image"
                        style="--paint:${product.color}"
                    >

                        <span>
                            ${product.colorName}
                        </span>

                    </div>

                </div>


                <!-- INFORMATION -->

                <div class="product-info">

                    <span class="brand">
                        ${product.brand}
                    </span>


                    <h1>
                        ${product.name}
                    </h1>


                    <div class="product-rating">

                        <span class="stars">
                            ★★★★★
                        </span>

                        <span class="rating-number">
                            ${product.rating}
                            از ۵
                            (${product.reviews} نظر)
                        </span>

                    </div>


                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="specs">

                        <div class="spec-item">

                            <span>
                                کد رنگ
                            </span>

                            <strong>
                                ${product.color}
                            </strong>

                        </div>


                        <div class="spec-item">

                            <span>
                                نام رنگ
                            </span>

                            <strong>
                                ${product.colorName}
                            </strong>

                        </div>


                        <div class="spec-item">

                            <span>
                                کاربرد
                            </span>

                            <strong>
                                ${product.usage}
                            </strong>

                        </div>


                        <div class="spec-item">

                            <span>
                                حجم
                            </span>

                            <strong>
                                ${product.volume}
                            </strong>

                        </div>


                        <div class="spec-item">

                            <span>
                                بسته‌بندی
                            </span>

                            <strong>
                                ${product.package}
                            </strong>

                        </div>


                        <div class="spec-item">

                            <span>
                                ویژگی
                            </span>

                            <strong>
                                ${product.feature}
                            </strong>

                        </div>

                    </div>


                    <div class="product-price-box">

                        <span class="price-label">
                            قیمت
                        </span>

                        <div class="product-price">
                            ${formatPrice(product.price)}
                        </div>

                    </div>


                    <div class="product-actions">

                        <div class="quantity">

                            <button
                                id="minusQuantity"
                            >
                                −
                            </button>

                            <span id="quantity">
                                1
                            </span>

                            <button
                                id="plusQuantity"
                            >
                                +
                            </button>

                        </div>


                        <button
                            id="addProductToCart"
                            class="button button-primary add-to-cart"
                        >
                            افزودن به سبد خرید
                        </button>

                    </div>

                </div>

            </div>


            <!-- EXTRA -->

            <section class="product-extra">

                <div class="tabs">

                    <button
                        class="tab-button active"
                        data-tab="description"
                    >
                        توضیحات
                    </button>

                    <button
                        class="tab-button"
                        data-tab="reviews"
                    >
                        نظرات کاربران
                    </button>

                    <button
                        class="tab-button"
                        data-tab="technical"
                    >
                        مشخصات فنی
                    </button>

                </div>


                <div
                    class="tab-content active"
                    id="description"
                >

                    <h3>
                        درباره محصول
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <p>
                        این محصول با توجه به ویژگی‌های
                        ثبت‌شده، برای استفاده در بخش
                        ${product.usage}
                        مناسب است.
                    </p>

                </div>


                <div
                    class="tab-content"
                    id="reviews"
                >

                    <div class="review">

                        <div class="review-header">

                            <span class="review-user">
                                محمد
                            </span>

                            <span class="review-date">
                                ۱۴۰۵/۰۵/۲۵
                            </span>

                        </div>

                        <div class="stars">
                            ★★★★★
                        </div>

                        <p>
                            کیفیت رنگ خوب بود و پوشش مناسبی داشت.
                        </p>

                    </div>


                    <div class="review">

                        <div class="review-header">

                            <span class="review-user">
                                سارا
                            </span>

                            <span class="review-date">
                                ۱۴۰۵/۰۵/۱۸
                            </span>

                        </div>

                        <div class="stars">
                            ★★★★☆
                        </div>

                        <p>
                            رنگش دقیقاً شبیه چیزی بود که انتظار داشتم.
                        </p>

                    </div>


                    <form class="review-form">

                        <h3>
                            نظر شما
                        </h3>

                        <textarea
                            class="input"
                            placeholder="نظر خود را بنویسید..."
                        ></textarea>

                        <button
                            type="button"
                            class="button button-primary"
                            onclick="showToast('برای ثبت نظر باید وارد حساب شوید.')"
                        >
                            ارسال نظر
                        </button>

                    </form>

                </div>


                <div
                    class="tab-content"
                    id="technical"
                >

                    <p>
                        برند:
                        <strong>
                            ${product.brand}
                        </strong>
                    </p>

                    <p>
                        کاربرد:
                        <strong>
                            ${product.usage}
                        </strong>
                    </p>

                    <p>
                        حجم:
                        <strong>
                            ${product.volume}
                        </strong>
                    </p>

                    <p>
                        بسته‌بندی:
                        <strong>
                            ${product.package}
                        </strong>
                    </p>

                    <p>
                        ویژگی:
                        <strong>
                            ${product.feature}
                        </strong>
                    </p>

                </div>

            </section>

        `;


        /* QUANTITY */

        let quantity = 1;


        const quantityElement =
            document.getElementById(
                "quantity"
            );


        document
            .getElementById("plusQuantity")
            ?.addEventListener(
                "click",
                () => {

                    quantity++;

                    quantityElement.textContent =
                        quantity;

                }
            );


        document
            .getElementById("minusQuantity")
            ?.addEventListener(
                "click",
                () => {

                    if (quantity > 1) {

                        quantity--;

                        quantityElement.textContent =
                            quantity;

                    }

                }
            );


        /* ADD TO CART */

        document
            .getElementById(
                "addProductToCart"
            )
            ?.addEventListener(
                "click",
                () => {

                    addToCart(
                        product.id,
                        quantity
                    );

                }
            );


        /* TABS */

        document
            .querySelectorAll(
                ".tab-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const tab =
                            button.dataset.tab;


                        document
                            .querySelectorAll(
                                ".tab-button"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        document
                            .querySelectorAll(
                                ".tab-content"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        button.classList.add(
                            "active"
                        );


                        document
                            .getElementById(tab)
                            ?.classList.add(
                                "active"
                            );

                    }
                );

            });

    }
);