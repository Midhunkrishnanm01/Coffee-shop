// --- NAVBAR AND TOGGLE CONTROLS ---
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


// --- SHOPPING CART STATE MANAGEMENT ---
let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productBox = e.target.closest('.box');
        const id = productBox.getAttribute('data-id');
        const title = productBox.querySelector('.product-title').innerText;
        const priceText = productBox.querySelector('.price').innerText;
        const imgSrc = productBox.querySelector('.product-img').getAttribute('src');
        
        const price = parseInt(priceText.replace(/[^\d]/g, ''));

        addItemToCart(id, title, price, imgSrc);
        cartItem.classList.add('active');
    });
});

function addItemToCart(id, title, price, imgSrc) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, imgSrc, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    const cartWrapper = document.querySelector('.cart-items-wrapper');
    cartWrapper.innerHTML = ''; 

    if(cart.length === 0) {
        cartWrapper.innerHTML = `<p style="color:#13131a; font-size:1.6rem; text-align:center; margin-top:2rem;">Your cart is empty!</p>`;
        document.querySelector('.cart-total-price').innerText = 'Rs.0/-';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += (item.price * item.quantity);

        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <span class="fas fa-times remove-item-btn"></span>
                <img src="${item.imgSrc}" alt="${item.title}">
                <div class="content">
                    <h3>${item.title} (x${item.quantity})</h3>
                    <div class="price">Rs.${item.price * item.quantity}/-</div>
                </div>
            </div>
        `;
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    document.querySelector('.cart-total-price').innerText = `Rs.${totalPrice}/-`;

    const removeButtons = cartWrapper.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').getAttribute('data-id');
            removeItemFromCart(itemId);
        });
    });
}

function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}