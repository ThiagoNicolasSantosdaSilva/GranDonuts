let cart = [];

function addToCart(itemName, itemPrice) {
  const item = {
    name: itemName,
    price: itemPrice
  };
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <span class="price">R$ ${item.price.toFixed(2)}</span>
    `;
    cartItems.appendChild(li);
  });
}

function placeOrder() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  // Lógica para realizar o pedido (pode ser adicionada aqui)

  alert('Pedido realizado com sucesso!');
  clearCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

// Chamada inicial para atualizar a exibição do carrinho
updateCart();
