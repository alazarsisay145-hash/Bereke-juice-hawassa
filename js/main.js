const menuItems = [
  {
    id: 'mango-juice',
    name: 'Mango Juice',
    category: 'Fresh Juices',
    price: 150,
    description: 'Bright, smooth mango juice served chilled with a naturally sweet finish.',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'avocado-juice',
    name: 'Avocado Juice',
    category: 'Fresh Juices',
    price: 170,
    description: 'Creamy avocado blended into a rich, satisfying Hawassa favorite.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'papaya-juice',
    name: 'Papaya Juice',
    category: 'Fresh Juices',
    price: 145,
    description: 'Fresh papaya pour with tropical depth and an easy, refreshing finish.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'spris-juice',
    name: 'Spris Layered Juice',
    category: 'Fresh Juices',
    price: 210,
    description: 'A colorful layered signature made with creamy fruit blends and premium presentation.',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'strawberry-smoothie',
    name: 'Strawberry Smoothie',
    category: 'Smoothies',
    price: 190,
    description: 'Velvety strawberry smoothie with a cool finish and bright fruit aroma.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'pineapple-smoothie',
    name: 'Pineapple Smoothie',
    category: 'Smoothies',
    price: 185,
    description: 'Sunlit pineapple flavor whipped into a smooth, tropical glass.',
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'banana-shake',
    name: 'Banana Shake',
    category: 'Shakes',
    price: 180,
    description: 'A thick banana shake with creamy texture and mellow sweetness.',
    image: 'https://images.unsplash.com/photo-1570696516188-ade861b84a49?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla Shake',
    category: 'Shakes',
    price: 175,
    description: 'Classic vanilla shake for guests who want a cool, comforting sip.',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'Burgers',
    price: 260,
    description: 'Tender chicken burger with crisp vegetables and a satisfying toasted bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'Burgers',
    price: 285,
    description: 'Juicy beef burger layered for a hearty meal alongside fresh drinks.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'classic-fruit-salad',
    name: 'Classic Fruit Salad',
    category: 'Fruit Salads',
    price: 200,
    description: 'Seasonal fruit cubes, layered color and a cool, refreshing finish.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'special-fruit-salad',
    name: 'Bereket Special Fruit Salad',
    category: 'Fruit Salads',
    price: 240,
    description: 'A fuller fruit salad bowl with extra variety, texture and vibrant freshness.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80'
  }
];

const state = {
  activeCategory: 'Fresh Juices',
  modalItem: null,
  modalQuantity: 1,
  cart: loadCart()
};

const body = document.body;
const preloader = document.querySelector('.preloader');
const menuGrid = document.querySelector('#menu-grid');
const tabs = [...document.querySelectorAll('.menu__tab')];
const tabIndicator = document.querySelector('.menu__tab-indicator');
const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const navIndicator = document.querySelector('.nav-indicator');
const navWrap = document.querySelector('.nav-links-wrap');
const navToggle = document.querySelector('.nav-toggle');
const cartTrigger = document.querySelector('.cart-trigger');
const cartCountEls = [...document.querySelectorAll('[data-cart-count]')];
const cartDrawer = document.querySelector('#cart-drawer');
const backdrop = document.querySelector('[data-backdrop]');
const cartItemsEl = document.querySelector('[data-cart-items]');
const cartEmptyEl = document.querySelector('[data-cart-empty]');
const subtotalEl = document.querySelector('[data-cart-subtotal]');
const totalEl = document.querySelector('[data-cart-total]');
const modal = document.querySelector('#product-modal');
const modalImage = document.querySelector('[data-modal-image]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalCategory = document.querySelector('[data-modal-category]');
const modalDescription = document.querySelector('[data-modal-description]');
const modalPrice = document.querySelector('[data-modal-price]');
const modalQuantity = document.querySelector('[data-modal-quantity]');
const addToCartButton = document.querySelector('[data-add-to-cart]');
const toast = document.querySelector('#toast');
const notifyForm = document.querySelector('#notify-form');
const notifyMessage = document.querySelector('#notify-message');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutMessage = document.querySelector('#checkout-message');
const floatingOrder = document.querySelector('.floating-order');
const year = document.querySelector('#year');

let toastTimer = null;
let releaseFocusTrap = null;

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('bereket-cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem('bereket-cart', JSON.stringify(state.cart));
}

function formatPrice(value) {
  return `ETB ${value.toLocaleString()}`;
}

function renderMenu() {
  menuGrid.classList.add('is-switching');
  const items = menuItems.filter((item) => item.category === state.activeCategory);
  const markup = items.map((item, index) => `
    <article class="menu-card glass-panel reveal is-visible" style="transition-delay:${Math.min(index * 70, 280)}ms">
      <div class="menu-card__image">
        <img src="${item.image}" alt="${item.name} prepared fresh at Bereket Juice &amp; Salad" loading="lazy" />
      </div>
      <div class="menu-card__content">
        <div class="card__header">
          <div>
            <span class="card__category">${item.category}</span>
            <h3>${item.name}</h3>
          </div>
          <span class="card__price">${formatPrice(item.price)}</span>
        </div>
        <p class="card__description">${item.description}</p>
        <div class="card__footer">
          <button class="button button--primary card__button" type="button" data-open-product="${item.id}">Order now</button>
        </div>
      </div>
    </article>
  `).join('');

  menuGrid.innerHTML = markup;
  requestAnimationFrame(() => {
    [...menuGrid.children].forEach((card, index) => {
      card.classList.add('is-hiding');
      requestAnimationFrame(() => {
        setTimeout(() => card.classList.remove('is-hiding'), index * 35);
      });
    });
  });
}

function updateIndicator(buttons, indicator) {
  const active = buttons.find((button) => button.classList.contains('is-active'));
  if (!active || !indicator) return;
    const parent = indicator.parentElement || active.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const rect = active.getBoundingClientRect();
  indicator.style.opacity = '1';
  indicator.style.width = `${rect.width}px`;
  indicator.style.height = `${rect.height}px`;
  indicator.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;
}

function openModal(itemId) {
  const item = menuItems.find((entry) => entry.id === itemId);
  if (!item) return;
  state.modalItem = item;
  state.modalQuantity = 1;
  modalImage.src = item.image;
  modalImage.alt = `${item.name} served at Bereket Juice & Salad`;
  modalTitle.textContent = item.name;
  modalCategory.textContent = item.category;
  modalDescription.textContent = item.description;
  modalPrice.textContent = formatPrice(item.price);
  modalQuantity.textContent = String(state.modalQuantity);
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  backdrop.hidden = false;
  backdrop.classList.add('is-visible');
  releaseFocusTrap = trapFocus(modal);
  modal.focus();
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('is-open');
  cleanupOverlay();
}

function openCart() {
  cartDrawer.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartTrigger.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  backdrop.classList.add('is-visible');
  releaseFocusTrap = trapFocus(cartDrawer);
  cartDrawer.focus();
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartTrigger.setAttribute('aria-expanded', 'false');
  cleanupOverlay();
}

function cleanupOverlay() {
  const isModalOpen = modal.classList.contains('is-open');
  const isCartOpen = cartDrawer.classList.contains('is-open');
  if (!isModalOpen && !isCartOpen) {
    backdrop.classList.remove('is-visible');
    setTimeout(() => {
      if (!modal.classList.contains('is-open') && !cartDrawer.classList.contains('is-open')) {
        backdrop.hidden = true;
      }
    }, 320);
  }
  if (releaseFocusTrap) {
    releaseFocusTrap();
    releaseFocusTrap = null;
  }
}

function addToCart(item, quantity) {
  const existing = state.cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity
    });
  }
  saveCart();
  renderCart();
  animateCartTrigger();
  showToast(`${item.name} added to cart`);
}

function updateCartItem(itemId, delta) {
  const entry = state.cart.find((item) => item.id === itemId);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    state.cart = state.cart.filter((item) => item.id !== itemId);
  }
  saveCart();
  renderCart();
}

function removeCartItem(itemId) {
  state.cart = state.cart.filter((item) => item.id !== itemId);
  saveCart();
  renderCart();
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEls.forEach((element) => {
    element.textContent = String(itemCount);
  });

  cartEmptyEl.hidden = state.cart.length > 0;
  cartItemsEl.innerHTML = state.cart.map((item) => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name} in the shopping cart" loading="lazy" />
      <div class="cart-item__content">
        <div class="cart-item__top">
          <div>
            <h3>${item.name}</h3>
            <span class="cart-item__meta">${formatPrice(item.price)} each</span>
          </div>
          <button class="icon-button" type="button" data-remove-item="${item.id}" aria-label="Remove ${item.name}">✕</button>
        </div>
        <div class="cart-item__actions">
          <div class="quantity-selector">
            <button type="button" data-cart-qty="-1" data-item-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-qty="1" data-item-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
          </div>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
      </div>
    </article>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalEl.textContent = formatPrice(subtotal);
  totalEl.textContent = formatPrice(subtotal);
}

function animateCartTrigger() {
  cartTrigger.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.08)' },
      { transform: 'scale(1)' }
    ],
    { duration: 380, easing: 'ease-out' }
  );
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2400);
}

function trapFocus(container) {
  const focusable = [...container.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hasAttribute('disabled'));
  const handleKeydown = (event) => {
    if (event.key !== 'Tab' || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}

function setMessage(element, message, type) {
  element.textContent = message;
  element.classList.remove('is-success', 'is-error');
  if (type) {
    element.classList.add(type);
  }
}

function handleScrollSections() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const scrollPosition = window.scrollY + window.innerHeight * 0.3;
  let current = sections[0]?.id || 'top';
  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) current = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}` || (current === 'hero' && link.getAttribute('href') === '#top');
    link.classList.toggle('is-active', isActive);
  });
  updateIndicator(navLinks, navIndicator);
  floatingOrder.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.55);
}

function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function initForms() {
  notifyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(notifyForm).get('email')?.toString().trim() || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(notifyMessage, 'Please enter a valid email to join the Bereket Guest House waitlist.', 'is-error');
      return;
    }
    notifyForm.reset();
    setMessage(notifyMessage, 'Thanks! We will let you know when the guest house officially opens.', 'is-success');
    notifyMessage.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'ease-out' });
  });

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!state.cart.length) {
      setMessage(checkoutMessage, 'Add items to your cart before checking out.', 'is-error');
      return;
    }
    const formData = new FormData(checkoutForm);
    const name = formData.get('name')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    if (!name || !phone) {
      setMessage(checkoutMessage, 'Please enter your name and phone number.', 'is-error');
      return;
    }
    setMessage(checkoutMessage, `Thank you, ${name}! Your Bereket order summary is ready. We will confirm via ${phone}.`, 'is-success');
    state.cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
    showToast('Order confirmation ready');
  });
}

function initEvents() {
  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.classList.contains('is-active') ? 0 : -1;
    tab.addEventListener('click', () => {
      tabs.forEach((button) => {
        const isActive = button === tab;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
      });
      state.activeCategory = tab.dataset.category;
      updateIndicator(tabs, tabIndicator);
      renderMenu();
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const nextIndex = event.key === 'ArrowRight'
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  });

  menuGrid.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const trigger = target.closest('[data-open-product]');
    if (trigger instanceof HTMLElement) {
      openModal(trigger.dataset.openProduct);
    }
  });

  document.querySelectorAll('[data-qty-change]').forEach((button) => {
    button.addEventListener('click', () => {
      state.modalQuantity = Math.max(1, state.modalQuantity + Number(button.dataset.qtyChange));
      modalQuantity.textContent = String(state.modalQuantity);
    });
  });

  addToCartButton.addEventListener('click', () => {
    if (!state.modalItem) return;
    addToCart(state.modalItem, state.modalQuantity);
    closeModal();
  });

  document.querySelector('[data-close-modal]').addEventListener('click', closeModal);
  document.querySelector('[data-close-cart]').addEventListener('click', closeCart);
  backdrop.addEventListener('click', () => {
    if (modal.classList.contains('is-open')) closeModal();
    if (cartDrawer.classList.contains('is-open')) closeCart();
  });
  cartTrigger.addEventListener('click', openCart);

  cartItemsEl.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const qtyTrigger = target.closest('[data-cart-qty]');
    const removeTrigger = target.closest('[data-remove-item]');
    if (qtyTrigger instanceof HTMLElement) {
      updateCartItem(qtyTrigger.dataset.itemId, Number(qtyTrigger.dataset.cartQty));
    }
    if (removeTrigger instanceof HTMLElement) {
      removeCartItem(removeTrigger.dataset.removeItem);
    }
  });

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('is-open', !expanded);
    navWrap.classList.toggle('is-open', !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navWrap.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const selector = button.getAttribute('data-scroll-target');
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('scroll', handleScrollSections, { passive: true });
  window.addEventListener('resize', () => {
    updateIndicator(tabs, tabIndicator);
    updateIndicator(navLinks, navIndicator);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeModal();
      if (cartDrawer.classList.contains('is-open')) closeCart();
      navWrap.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function init() {
  year.textContent = String(new Date().getFullYear());
  renderMenu();
  renderCart();
  initRevealObserver();
  initForms();
  initEvents();
  handleScrollSections();
  updateIndicator(tabs, tabIndicator);
  updateIndicator(navLinks, navIndicator);

  window.setTimeout(() => {
    preloader.classList.add('is-hidden');
    body.classList.add('is-ready');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 10 : 1100);
}

init();
