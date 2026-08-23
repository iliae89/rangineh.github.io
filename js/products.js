/* ==========================================
   RANGINEH
   PRODUCTS DATABASE
========================================== */

const defaultProducts = [

    {
        id: 1,
        name: "رنگ اکریلیک سفید مات",
        brand: "رنگینه",
        price: 850000,
        color: "#F5F2E8",
        colorName: "سفید مات",
        usage: "ساختمانی",
        volume: "4 لیتر",
        package: "سطل",
        feature: "قابل شستشو",
        description:
            "رنگ اکریلیک با کیفیت بالا برای دیوارهای داخلی و فضاهای مسکونی.",
        rating: 4.7,
        reviews: 34,
        sold: 120,
        stock: 25,
        createdAt: "2026-08-20"
    },

    {
        id: 2,
        name: "رنگ نارنجی گرم",
        brand: "رنگینه",
        price: 1250000,
        color: "#D96B32",
        colorName: "نارنجی گرم",
        usage: "ساختمانی",
        volume: "4 لیتر",
        package: "سطل",
        feature: "مقاوم در برابر نور",
        description:
            "رنگی گرم و جذاب برای ایجاد فضای متفاوت و صمیمی.",
        rating: 4.8,
        reviews: 27,
        sold: 95,
        stock: 18,
        createdAt: "2026-08-18"
    },

    {
        id: 3,
        name: "رنگ قهوه‌ای چوب",
        brand: "رنگینه",
        price: 980000,
        color: "#744633",
        colorName: "قهوه‌ای",
        usage: "چوب",
        volume: "2.5 لیتر",
        package: "قوطی",
        feature: "ضد رطوبت",
        description:
            "مناسب برای سطوح چوبی، درب، پنجره و مبلمان.",
        rating: 4.5,
        reviews: 19,
        sold: 72,
        stock: 12,
        createdAt: "2026-08-15"
    },

    {
        id: 4,
        name: "رنگ صنعتی ضدزنگ",
        brand: "پارس‌کالر",
        price: 2350000,
        color: "#58615D",
        colorName: "خاکستری",
        usage: "صنعتی",
        volume: "10 لیتر",
        package: "سطل",
        feature: "ضد زنگ",
        description:
            "پوشش صنعتی مقاوم برای محافظت از سطوح فلزی.",
        rating: 4.9,
        reviews: 42,
        sold: 158,
        stock: 8,
        createdAt: "2026-08-10"
    },

    {
        id: 5,
        name: "رنگ کرم کلاسیک",
        brand: "دکورال",
        price: 1100000,
        color: "#E5C9A9",
        colorName: "کرم",
        usage: "دکوراسیون",
        volume: "4 لیتر",
        package: "سطل",
        feature: "قابل شستشو",
        description:
            "کرم ملایم و کلاسیک برای دکوراسیون داخلی.",
        rating: 4.6,
        reviews: 31,
        sold: 110,
        stock: 20,
        createdAt: "2026-08-05"
    },

    {
        id: 6,
        name: "رنگ مشکی صنعتی",
        brand: "پارس‌کالر",
        price: 1900000,
        color: "#252525",
        colorName: "مشکی",
        usage: "صنعتی",
        volume: "5 لیتر",
        package: "قوطی",
        feature: "مقاوم در برابر حرارت",
        description:
            "رنگ مشکی صنعتی با مقاومت مناسب در شرایط سخت.",
        rating: 4.4,
        reviews: 16,
        sold: 64,
        stock: 10,
        createdAt: "2026-08-02"
    }

];


/* ==========================================
   STORAGE KEY
========================================== */

const PRODUCTS_STORAGE_KEY =
    "rangineh_products";


/* ==========================================
   LOAD PRODUCTS
========================================== */

function getProducts() {

    const stored =
        localStorage.getItem(
            PRODUCTS_STORAGE_KEY
        );

    if (!stored) {

        saveProducts(defaultProducts);

        return [...defaultProducts];

    }

    try {

        const products =
            JSON.parse(stored);

        if (!Array.isArray(products)) {

            throw new Error(
                "Invalid products data"
            );

        }

        return products;

    } catch (error) {

        console.warn(
            "Products storage was invalid. Resetting...",
            error
        );

        saveProducts(defaultProducts);

        return [...defaultProducts];

    }

}


/* ==========================================
   SAVE PRODUCTS
========================================== */

function saveProducts(products) {

    if (!Array.isArray(products)) {

        console.error(
            "saveProducts expected an array."
        );

        return false;

    }

    try {

        localStorage.setItem(
            PRODUCTS_STORAGE_KEY,
            JSON.stringify(products)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save products:",
            error
        );

        return false;

    }

}


/* ==========================================
   GET PRODUCT BY ID
========================================== */

function getProductById(id) {

    const products =
        getProducts();

    return products.find(
        product =>
            Number(product.id) === Number(id)
    );

}


/* ==========================================
   ADD PRODUCT
========================================== */

function addProduct(product) {

    const products =
        getProducts();

    const newProduct = {

        ...product,

        id:
            product.id ??
            Date.now(),

        createdAt:
            product.createdAt ??
            new Date()
                .toISOString()
                .split("T")[0]

    };

    products.push(newProduct);

    saveProducts(products);

    return newProduct;

}


/* ==========================================
   UPDATE PRODUCT
========================================== */

function updateProduct(id, updates) {

    const products =
        getProducts();

    const index =
        products.findIndex(
            product =>
                Number(product.id) ===
                Number(id)
        );

    if (index === -1) {

        return null;

    }

    products[index] = {

        ...products[index],

        ...updates,

        id: products[index].id

    };

    saveProducts(products);

    return products[index];

}


/* ==========================================
   DELETE PRODUCT
========================================== */

function deleteProduct(id) {

    const products =
        getProducts();

    const filtered =
        products.filter(
            product =>
                Number(product.id) !==
                Number(id)
        );

    if (
        filtered.length ===
        products.length
    ) {

        return false;

    }

    saveProducts(filtered);

    return true;

}


/* ==========================================
   RESET PRODUCTS
========================================== */

function resetProducts() {

    saveProducts(
        [...defaultProducts]
    );

    return [
        ...defaultProducts
    ];

}


/* ==========================================
   EXPORT-LIKE GLOBAL OBJECT
========================================== */

window.RanginehProducts = {

    getAll:
        getProducts,

    getById:
        getProductById,

    save:
        saveProducts,

    add:
        addProduct,

    update:
        updateProduct,

    delete:
        deleteProduct,

    reset:
        resetProducts

};