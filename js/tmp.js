

document.addEventListener("DOMContentLoaded", () => {
    // محصولات نمونه
    const products = [
        { id: 1, name: "چای سبز", price: 50000, image: "images/aa.jpg" },
        { id: 2, name: "دمنوش نعناع", price: 60000, image: "images/bb.jpg" },
        { id: 3, name: "عسل طبیعی", price: 150000, image: "images/cc.jpg" },
        { id: 4, name: "زیتون پرورده", price: 40000, image: "images/aa.jpg" },
    ];

    const cart = [];

    const productContainer = document.getElementById("products");
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // اضافه کردن محصولات به صفحه
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" alt="${product.name}" class="card-img-top">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price.toLocaleString()} تومان</p>
                        <div class="cart-controls">
                            <button class="decrease" data-id="${product.id}">-</button>
                            <span id="quantity-${product.id}">0</span>
                            <button class="increase" data-id="${product.id}">+</button>
                        </div>
                        <button class="btn btn-danger mt-3 remove" data-id="${product.id}">حذف</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML("beforeend", productCard);
    });

    // مدیریت افزودن و کاهش محصولات
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateUI(productId);
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct && existingProduct.quantity > 0) {
                existingProduct.quantity -= 1;
                if (existingProduct.quantity === 0) {
                    cart.splice(cart.indexOf(existingProduct), 1);
                }
            }

            updateUI(productId);
        });
    });

    // مدیریت حذف محصول
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct) {
                cart.splice(cart.indexOf(existingProduct), 1);
                updateUI(productId);
            }
        });
    });

    // به‌روزرسانی UI
    function updateUI(productId) {
        const existingProduct = cart.find(c => c.id === productId);
        const quantityElement = document.getElementById(`quantity-${productId}`);
        const quantity = existingProduct ? existingProduct.quantity : 0;

        // به‌روزرسانی تعداد
        quantityElement.textContent = quantity;

        // به‌روزرسانی سبد خرید
        updateCart();
    }

    // به‌روزرسانی سبد خرید
    function updateCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} - ${item.quantity} عدد
                    <span>${(item.price * item.quantity).toLocaleString()} تومان</span>
                </li>
            `;
            cartItems.insertAdjacentHTML("beforeend", cartItem);
        });

        totalPriceElement.textContent = `${totalPrice.toLocaleString()} تومان`;
    }
});