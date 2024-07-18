(function() {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToggle();
    });
  });

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate PureCounter
   */
  new PureCounter();

  /**
   * Init Swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init Swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();

/*--------------------------------------------------------------
# Carrinho de Compras
--------------------------------------------------------------*/
// Verifica se o documento foi completamente carregado
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// Função chamada quando o documento está pronto
function ready() {
  // Obtém todos os botões "Adicionar ao carrinho"
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Adiciona um evento de clique para cada botão
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
  });

  // Função chamada quando um botão "Adicionar ao carrinho" é clicado
  function addToCartClicked(event) {
    const button = event.target;
    const productContainer = button.parentElement.parentElement;
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

  // Função para remover o produto do carrinho
  function removeProduct(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o carrinho na interface após remover o produto
    displayCart();
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
}
