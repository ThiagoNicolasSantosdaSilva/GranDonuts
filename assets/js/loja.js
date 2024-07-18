(function() {
  "use strict";

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Header stick on scroll
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  // Navbar active links
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

  // Mobile navigation toggle
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

  // Close mobile nav on link click
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

  // Dropdown menu in mobile navigation
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

  // Scroll to top button
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

  // GLightbox
  const glightbox = GLightbox({ selector: '.glightbox' });

  // PureCounter
  new PureCounter();

  // Swipers
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
      320: { slidesPerView: 1, spaceBetween: 40 },
      1200: { slidesPerView: 3 }
    }
  });

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
      320: { slidesPerView: 1, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 20 },
      992: { slidesPerView: 5, spaceBetween: 20 }
    }
  });

  // AOS Initialization
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aos_init);

  // Cart functionality
  document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.button-hover-background');
    const cartTableBody = document.querySelector('.cart-table tbody');
    const cartTotalSpan = document.querySelector('.cart-total-container span');
    const cartSection = document.getElementById('cartSection');
    const cartIconButton = document.getElementById('cartIconButton');
    const closeCartButton = document.getElementById('closeCartButton');

    function addToCartClicked(event) {
      const button = event.target;
      const product = button.closest('.menu-item');
      const productName = product.querySelector('h4').innerText;
      const productPrice = product.querySelector('.product-price').innerText;
      addProductToCart(productName, productPrice);
    }

    function addProductToCart(name, price) {
      const product = { name: name, price: price, quantity: 1 };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let productAlreadyInCart = cart.find(item => item.name === product.name);
      if (productAlreadyInCart) {
        productAlreadyInCart.quantity++;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    }

    function displayCart() {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartTableBody.innerHTML = '';
      cartItems.forEach(item => {
        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
          <td class="product-identification">
            <strong class="cart-product-title">${item.name}</strong>
          </td>
          <td>
            <span class="cart-product-price">${item.price}</span>
          </td>
          <td>
            <button type="button" class="decrease-quantity-button" data-name="${item.name}">-</button>
            <input type="number" value="${item.quantity}" min="1" class="product-qtd-input" data-name="${item.name}">
            <button type="button" class="increase-quantity-button" data-name="${item.name}">+</button>
            <button type="button" class="remove-product-button" data-name="${item.name}">Remover</button>
          </td>
        `;
        cartItemRow.querySelector('.remove-product-button').addEventListener('click', function() {
          removeProduct(item.name);
        });
        cartItemRow.querySelector('.increase-quantity-button').addEventListener('click', function() {
          updateQuantity(item.name, item.quantity + 1);
        });
        cartItemRow.querySelector('.decrease-quantity-button').addEventListener('click', function() {
          if (item.quantity > 1) {
            updateQuantity(item.name, item.quantity - 1);
          }
        });
        cartTableBody.appendChild(cartItemRow);
      });
      updateTotal();
    }

    function removeProduct(name) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.name !== name);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    }

    function updateQuantity(name, quantity) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let product = cart.find(item => item.name === name);
      if (product) {
        product.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
      }
    }

    function updateTotal() {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let totalAmount = 0;
      cartItems.forEach(product => {
        const price = parseFloat(product.price.replace('R$', '').replace(',', '.'));
        totalAmount += price * product.quantity;
      });
      const formattedTotal = 'R$ ' + totalAmount.toFixed(2).replace('.', ',');
      cartTotalSpan.innerText = formattedTotal;
    }

    // Event listeners
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCartClicked);
    });
    cartIconButton.addEventListener('click', () => { cartSection.classList.add('open'); });
    closeCartButton.addEventListener('click', () => { cartSection.classList.remove('open'); });

    displayCart();
  });
})();
