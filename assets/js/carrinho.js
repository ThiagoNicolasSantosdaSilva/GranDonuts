// Verifica se o documento foi completamente carregado
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// Função chamada quando o documento está pronto
function ready() {
  // Obtém todos os botões "Adicionar ao carrinho"
  const addToCartButtons = document.querySelectorAll('.button-hover-background');

  // Adiciona um evento de clique para cada botão
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
  });

  // Função chamada quando um botão "Adicionar ao carrinho" é clicado
  function addToCartClicked(event) {
    const button = event.target;
    const productContainer = button.closest('.product-item'); // Encontra o elemento pai mais próximo com a classe .product-item
    const productName = productContainer.querySelector('.product-title').innerText;
    const productPrice = productContainer.querySelector('.product-price').innerText;

    // Chama a função para adicionar o produto ao carrinho
    addProductToCart(productName, productPrice);
  }

  // Função para adicionar o produto ao carrinho
  function addProductToCart(name, price) {
    // Cria um objeto para representar o produto
    const product = {
      name: name,
      price: price,
      quantity: 1
    };

    // Verifica se há produtos no localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o produto já está no carrinho
    let productAlreadyInCart = false;
    cart.forEach(item => {
      if (item.name === product.name) {
        item.quantity++;
        productAlreadyInCart = true;
      }
    });

    // Se o produto ainda não está no carrinho, adiciona ele
    if (!productAlreadyInCart) {
      cart.push(product);
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o carrinho na interface
    displayCart();
  }

  // Função para exibir o carrinho na página
  function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-table tbody');
    cartTableBody.innerHTML = '';

    cartItems.forEach(item => {
      const cartItemRow = document.createElement('tr');
      cartItemRow.innerHTML = `
        <td class="product-identification">
          <img src="images/produto2.png" alt="${item.name}" class="cart-product-image">
          <strong class="cart-product-title">${item.name}</strong>
        </td>
        <td>
          <span class="cart-product-price">${item.price}</span>
        </td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `;

      cartTableBody.appendChild(cartItemRow);

      // Adiciona evento para remover o produto
      const removeButton = cartItemRow.querySelector('.remove-product-button');
      removeButton.addEventListener('click', () => removeProduct(item.name));
    });

    // Atualiza o valor total na interface
    updateTotal();
  }

  // Atualizar o valor total do carrinho
  function updateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    // Calcula o total com base nos produtos no carrinho
    cartItems.forEach(product => {
      const price = parseFloat(product.price.replace('R$', '').replace(',', '.'));
      totalAmount += price * product.quantity;
    });

    // Formata o total como moeda (R$ X,XX)
    const formattedTotal = 'R$ ' + totalAmount.toFixed(2).replace('.', ',');

    // Atualiza o elemento HTML que mostra o total
    document.querySelector('.cart-total-container span').innerText = formattedTotal;
  }

  // Inicializa o carrinho ao carregar a página
  displayCart();
}

// Função para remover o produto do carrinho
function removeProduct(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Atualiza o carrinho na interface após remover o produto
  displayCart();
}
