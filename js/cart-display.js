// Define these functions in the global scope
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cartItem';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i> Remove</button>
        `;
        cartItems.appendChild(itemElement);
        subtotal += item.price;
    });

    updateTotals(subtotal);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCart();
}

function updateTotals(subtotal) {
    const shipping = cart.length > 0 ? 5.00 : 0; // Set shipping to 0 if cart is empty
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + shipping + tax;

    document.querySelector('.subtotal .value').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.totalRow:nth-child(2) .value').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.totalRow:nth-child(3) .value').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.totalRow.final .value').textContent = `$${total.toFixed(2)}`;

    // Optionally, hide or show shipping row based on cart contents
    const shippingRow = document.querySelector('.totalRow:nth-child(2)');
    if (shippingRow) {
        shippingRow.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const promoButton = document.getElementById('promoButton');

    if (promoButton) {
        promoButton.addEventListener('click', () => {
            console.log('Applying promo code...');
            alert('Promo code applied successfully!');
        });
    }

    loadCart();
    displayCart();
});