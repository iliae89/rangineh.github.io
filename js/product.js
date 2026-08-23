/* ==========================================
   RANGINEH PRODUCT PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("productDetails");

    if (!container) return;


    /* ======================================
       GET PRODUCT ID
    ====================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("id"));


    const product =
        getProductById(id);


    /* ======================================
       PRODUCT NOT FOUND
    ====================================== */

    if (!product) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🎨
                </div>

                <h2>
                    محصول پیدا نشد
                </h2>

                <p>
                    محصول موردنظر وجود ندارد یا حذف شده است.
                </p>

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


    /* ======================================
       PAGE TITLE
    ====================================== */

    document.title =
        `${product.name} | رنگینه`;


    /* ======================================
       RATING STARS
    ====================================== */

    function createStars(rating) {

        const rounded =
            Math.round(Number(rating));

        return "★".repeat(rounded) +
               "☆".repeat(5 - rounded);

    }


    /* ======================================
       MAIN PRODUCT
    ====================================== */

    container.innerHTML = `

        <div class="product-details">


            <!-- ==============================
                 GALLERY
            =============================== -->

            <div class="product-gallery">

                <div
                    class="product-main-image"
                    style="--paint:${product.color}"
                >

                    <div class="product-color-badge">

                        <span
                            class="product-color-dot"
                            style="--paint:${product.color}"
                        ></span>

                        ${product.colorName}

                    </div>


                    <span>
                        ${product.colorName}
                    </span>

                </div>

            </div>


            <!-- ==============================
                 INFORMATION
            =============================== -->

            <div class="product-info">

                <span class="brand">
                    ${product.brand}
                </span>


                <h1>
                    ${product.name}
                </h1>


                <div class="product-rating">

                    <span class="stars">
                        ${createStars(product.rating)}
                    </span>

                    <span class="rating-number">
                        ${product.rating}
                        از ۵
                        ·
                        ${product.reviews}
                        نظر
                    </span>

                </div>


                <div class="product-status">

                    <span class="product-status-dot"></span>

                    موجود در انبار

                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                <!-- SPECS -->

                <div class="specs">

                    <div class="spec-item">
                        <span>کد رنگ</span>
                        <strong>${product.color}</strong>
                    </div>


                    <div class="spec-item">
                        <span>نام رنگ</span>
                        <strong>${product.colorName}</strong>
                    </div>


                    <div class="spec-item">
                        <span>کاربرد</span>
                        <strong>${product.usage}</strong>
                    </div>


                    <div class="spec-item">
                        <span>حجم</span>
                        <strong>${product.volume}</strong>
                    </div>


                    <div class="spec-item">
                        <span>بسته‌بندی</span>
                        <strong>${product.package}</strong>
                    </div>


                    <div class="spec-item">
                        <span>ویژگی</span>
                        <strong>${product.feature}</strong>
                    </div>

                </div>


                <!-- PRICE -->

                <div class="product-price-box">

                    <span class="price-label">
                        قیمت واحد
                    </span>

                    <div
                        class="product-price"
                        id="productPrice"
                    >
                        ${formatPrice(product.price)}
                    </div>

                    <div
                        class="price-total"
                        id="priceTotal"
                    >
                        مجموع: ${formatPrice(product.price)}
                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="product-actions">

                    <div class="quantity">

                        <button
                            type="button"
                            id="minusQuantity"
                            aria-label="کاهش تعداد"
                        >
                            −
                        </button>


                        <span id="quantity">
                            1
                        </span>


                        <button
                            type="button"
                            id="plusQuantity"
                            aria-label="افزایش تعداد"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        id="addProductToCart"
                        class="button button-primary add-to-cart"
                    >
                        🛒 افزودن به سبد خرید
                    </button>

                </div>


                <div class="product-secondary-actions">

                    <button
                        type="button"
                        id="shareProduct"
                        class="share-button"
                    >
                        ↗ اشتراک‌گذاری محصول
                    </button>

                </div>

            </div>

        </div>


        <!-- ==================================
             EXTRA
        =================================== -->

        <section class="product-extra">

            <div class="tabs">

                <button
                    type="button"
                    class="tab-button active"
                    data-tab="description"
                >
                    توضیحات
                </button>


                <button
                    type="button"
                    class="tab-button"
                    data-tab="reviews"
                >
                    نظرات کاربران
                </button>


                <button
                    type="button"
                    class="tab-button"
                    data-tab="technical"
                >
                    مشخصات فنی
                </button>

            </div>


            <!-- DESCRIPTION -->

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
                    این محصول برای استفاده در بخش
                    <strong>
                        ${product.usage}
                    </strong>
                    طراحی شده و در بسته‌بندی
                    <strong>
                        ${product.package}
                    </strong>
                    با حجم
                    <strong>
                        ${product.volume}
                    </strong>
                    عرضه می‌شود.
                </p>

            </div>


            <!-- REVIEWS -->

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


                <form
                    class="review-form"
                    id="reviewForm"
                >

                    <h3>
                        نظر شما
                    </h3>

                    <textarea
                        class="input"
                        id="reviewText"
                        placeholder="نظر خود را بنویسید..."
                    ></textarea>


                    <button
                        type="submit"
                        class="button button-primary"
                    >
                        ارسال نظر
                    </button>

                </form>

            </div>


            <!-- TECHNICAL -->

            <div
                class="tab-content"
                id="technical"
            >

                <p>
                    برند:
                    <strong>${product.brand}</strong>
                </p>

                <p>
                    کد رنگ:
                    <strong>${product.color}</strong>
                </p>

                <p>
                    کاربرد:
                    <strong>${product.usage}</strong>
                </p>

                <p>
                    حجم:
                    <strong>${product.volume}</strong>
                </p>

                <p>
                    بسته‌بندی:
                    <strong>${product.package}</strong>
                </p>

                <p>
                    ویژگی:
                    <strong>${product.feature}</strong>
                </p>

            </div>

        </section>


        <!-- ==================================
             RELATED PRODUCTS
        =================================== -->

        <section class="related-products">

            <div class="related-products-header">

                <div>

                    <span class="section-label">
                        پیشنهاد رنگینه
                    </span>

                    <h2>
                        محصولات مرتبط
                    </h2>

                </div>

            </div>


            <div
                class="related-grid"
                id="relatedProducts"
            ></div>

        </section>

    `;


    /* ======================================
       QUANTITY
    ====================================== */

    let quantity = 1;

    const quantityElement =
        document.getElementById("quantity");

    const priceTotal =
        document.getElementById("priceTotal");


    function updatePrice() {

        const total =
            product.price * quantity;

        priceTotal.textContent =
            `مجموع: ${formatPrice(total)}`;

    }


    document
        .getElementById("plusQuantity")
        ?.addEventListener("click", () => {

            if (quantity >= 99) return;

            quantity++;

            quantityElement.textContent =
                quantity;

            updatePrice();

        });


    document
        .getElementById("minusQuantity")
        ?.addEventListener("click", () => {

            if (quantity <= 1) return;

            quantity--;

            quantityElement.textContent =
                quantity;

            updatePrice();

        });


    /* ======================================
       ADD TO CART
    ====================================== */

    document
        .getElementById("addProductToCart")
        ?.addEventListener("click", () => {

            addToCart(
                product.id,
                quantity
            );

        });


    /* ======================================
       TABS
    ====================================== */

    document
        .querySelectorAll(".tab-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const tab =
                        button.dataset.tab;


                    document
                        .querySelectorAll(".tab-button")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    document
                        .querySelectorAll(".tab-content")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


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


    /* ======================================
       REVIEW
    ====================================== */

    document
        .getElementById("reviewForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            showToast(
                "برای ثبت نظر ابتدا وارد حساب کاربری شوید."
            );

        });


    /* ======================================
       SHARE
    ====================================== */

    document
        .getElementById("shareProduct")
        ?.addEventListener("click", async () => {

            const shareData = {

                title: product.name,

                text:
                    `${product.name} | رنگینه`,

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                } else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    showToast(
                        "لینک محصول کپی شد ✓"
                    );

                }

            } catch {

                /* user cancelled share */

            }

        });


    /* ======================================
       RELATED PRODUCTS
    ====================================== */

    const relatedContainer =
        document.getElementById(
            "relatedProducts"
        );


    if (relatedContainer) {

        const allProducts =
            getProducts();


        const related =
            allProducts
                .filter(item =>
                    Number(item.id) !==
                    Number(product.id)
                )
                .filter(item =>
                    item.usage === product.usage ||
                    item.brand === product.brand
                )
                .slice(0, 4);


        const fallback =
            allProducts
                .filter(item =>
                    Number(item.id) !==
                    Number(product.id)
                )
                .slice(0, 4);


        const productsToShow =
            related.length >= 2
                ? related
                : fallback;


        relatedContainer.innerHTML =
            productsToShow
                .map(item => `

                    <a
                        href="product.html?id=${item.id}"
                        class="related-card"
                    >

                        <div
                            class="related-image"
                            style="--paint:${item.color}"
                        >

                            <span>
                                ${item.colorName}
                            </span>

                        </div>


                        <div class="related-body">

                            <span class="related-brand">
                                ${item.brand}
                            </span>

                            <h3>
                                ${item.name}
                            </h3>

                            <span class="related-price">
                                ${formatPrice(item.price)}
                            </span>

                        </div>

                    </a>

                `)
                .join("");

    }

});