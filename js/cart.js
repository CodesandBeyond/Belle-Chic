let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
    saveCart();
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = `(${cart.length})`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
});