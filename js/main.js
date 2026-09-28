const products = [
  {
    id: 'mango-juice',
    name: 'Mango Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 140,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80',
    description: 'Sun-ripened mango blended into a bright, refreshing Hawassa classic.'
  },
  {
    id: 'avocado-juice',
    name: 'Avocado Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 150,
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
    description: 'Creamy avocado finished with gentle sweetness and a silky texture.'
  },
  {
    id: 'papaya-juice',
    name: 'Papaya Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 135,
    image: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb92?auto=format&fit=crop&w=900&q=80',
    description: 'Smooth papaya juice served chilled for a naturally mellow finish.'
  },
  {
    id: 'spris',
    name: 'Spris Layered Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 185,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
    description: 'A layered blend of mango, avocado, papaya and milk for the full Bereket signature experience.'
  },
  {
    id: 'strawberry-smoothie',
    name: 'Strawberry Smoothie',
    category: 'smoothies',
    label: 'Smoothies',
    price: 170,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb918?auto=format&fit=crop&w=900&q=80',
    description: 'Cold, creamy and packed with strawberry flavor for an easy anytime pick.'
  },
  {
    id: 'tropical-smoothie',
    name: 'Tropical Smoothie',
    category: 'smoothies',
    label: 'Smoothies',
    price: 175,
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?auto=format&fit=crop&w=900&q=80',
    description: 'Mango, pineapple and banana blended smooth with a sunny finish.'
  },
  {
    id: 'banana-shake',
    name: 'Banana Shake',
    category: 'shakes',
    label: 'Shakes',
    price: 165,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
    description: 'Thick banana shake with a dessert-like creaminess and chilled sweetness.'
  },
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'shakes',
    label: 'Shakes',
    price: 190,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80',
    description: 'Cookies-and-cream shake topped with a rich finish and smooth body.'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'burgers',
    label: 'Burgers',
    price: 260,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    description: 'Juicy chicken burger with crisp lettuce, fresh tomato and a soft toasted bun.'
  },
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'burgers',
    label: 'Burgers',
    price: 285,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    description: 'A satisfying beef burger layered with sauce, vegetables and bold flavor.'
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad',
    category: 'salads',
    label: 'Fruit Salads',
    price: 155,
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80',
    description: 'A colorful bowl of cut seasonal fruits served fresh and chilled.'
  },
  {
    id: 'special-salad',
    name: 'Special Fruit Mix',
    category: 'salads',
    label: 'Fruit Salads',
    price: 180,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    description: 'A fuller fruit salad mix with layered color, texture and freshness.'
  }
];

const state = {
  category: 'all',
  quantity: 1,
  modalProductId: null,
  cart: [],
  toastTimer: null
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuGrid = document.getElementById('menu-grid');
const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
const filterIndicator = document.querySelector('.filter-indicator');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navIndicator = document.querySelector('.nav-indicator');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.querySelector('[data-overlay="cart"]');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileOverlay = document.querySelector('[data-overlay="mobile"]');
const cartTrigger = document.querySelector('.cart-trigger');
const navToggle = document.querySelector('.nav-toggle');
const floatingOrderButton = document.querySelector('.floating-order');
const productModal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalQuantity = document.getElementById('modal-quantity');
const modalAddButton = document.querySelector('.modal-add');
const toast = document.getElementById('toast');
const cartItems = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const checkoutPanel = document.getElementById('checkout-panel');
const checkoutSummary = document.getElementById('checkout-summary');
const cartSubtotal = document.querySelector('[data-cart-subtotal]');
const cartTotal = document.querySelector('[data-cart-total]');
const cartCountNodes = document.querySelectorAll('[data-cart-count]');
const checkoutToggle = document.querySelector('.cart-checkout-toggle');
const notifyForm = document.querySelector('.notify-form');
const checkoutForm = document.querySelector('form[data-checkout-form]');
const preloader = document.querySelector('.preloader');
const focusReturnTargets = {
  modal: null,
  cart: null,
  mobile: null
};

const formatETB = (value) => `ETB ${value.toLocaleString()}`;

const saveCart = () => {
  localStorage.setItem('bereket-cart', JSON.stringify(state.cart));
};

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('bereket-cart') || '[]');
    if (Array.isArray(saved)) {
      state.cart = saved.reduce((items, entry) => {
        const product = products.find((item) => item.id === entry?.id);
        const quantity = Number.parseInt(entry?.quantity, 10);
        if (!product || !Number.isFinite(quantity) || quantity < 1) return items;
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity
        });
        return items;
      }, []);
    }
  } catch {
    state.cart = [];
  }
};

const getVisibleProducts = () => state.category === 'all'
  ? products
  : products.filter((product) => product.category === state.category);

const setIndicator = (indicator, activeElement) => {
  if (!indicator || !activeElement) return;
  const parent = indicator.parentElement;
  const { left: parentLeft } = parent.getBoundingClientRect();
  const { left, width } = activeElement.getBoundingClientRect();
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translateX(${left - parentLeft}px)`;
};

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  toast.setAttribute('aria-hidden', 'false');
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.setAttribute('aria-hidden', 'true');
  }, 2400);
};

const setCheckoutOpen = (isOpen) => {
  checkoutPanel.classList.toggle('is-open', isOpen);
  checkoutPanel.setAttribute('aria-hidden', String(!isOpen));
  checkoutPanel.inert = !isOpen;
  checkoutToggle.setAttribute('aria-expanded', String(isOpen));
};

const buildMenuCard = (product, isEntering = false) => {
  const card = document.createElement('article');
  card.className = `menu-card${isEntering ? ' is-entering' : ''}`;
  card.dataset.productId = product.id;

  const media = document.createElement('div');
  media.className = 'menu-card__media';
  const image = document.createElement('img');
  image.src = product.image;
  image.alt = `${product.name} at Bereket Juice & Salad`;
  image.loading = 'lazy';
  media.append(image);

  const body = document.createElement('div');
  body.className = 'menu-card__body';

  const top = document.createElement('div');
  top.className = 'menu-card__top';
  const meta = document.createElement('div');
  meta.className = 'menu-card__meta';
  const label = document.createElement('span');
  label.textContent = product.label;
  const title = document.createElement('h3');
  title.textContent = product.name;
  meta.append(label, title);
  const price = document.createElement('strong');
  price.textContent = formatETB(product.price);
  top.append(meta, price);

  const description = document.createElement('p');
  description.textContent = product.description;

  const footer = document.createElement('div');
  footer.className = 'menu-card__footer';
  const quickView = document.createElement('button');
  quickView.className = 'order-mini';
  quickView.type = 'button';
  quickView.dataset.openProduct = product.id;
  quickView.textContent = 'Quick View';
  const addButton = document.createElement('button');
  addButton.className = 'button button--secondary';
  addButton.type = 'button';
  addButton.dataset.addDirect = product.id;
  addButton.textContent = 'Add to Cart';
  footer.append(quickView, addButton);

  body.append(top, description, footer);
  card.append(media, body);
  return card;
};

const renderMenu = (withAnimation = false) => {
  const items = getVisibleProducts();
  const previousHeight = menuGrid.offsetHeight;
  if (withAnimation && previousHeight) {
    menuGrid.style.height = `${previousHeight}px`;
    menuGrid.classList.add('is-filtering');
  }

  const swapContent = () => {
    menuGrid.replaceChildren();
    items.forEach((product) => {
      menuGrid.append(buildMenuCard(product, withAnimation));
    });
    requestAnimationFrame(() => {
      const cards = Array.from(menuGrid.querySelectorAll('.menu-card'));
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
        card.classList.remove('is-entering');
      });
      const newHeight = menuGrid.scrollHeight;
      menuGrid.style.height = `${newHeight}px`;
      window.setTimeout(() => {
        menuGrid.style.height = '';
        menuGrid.classList.remove('is-filtering');
      }, reduceMotion ? 30 : 260);
    });
  };

  if (withAnimation && !reduceMotion) {
    window.setTimeout(swapContent, 170);
  } else {
    swapContent();
  }
};

const updateCartUI = () => {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  cartCountNodes.forEach((node) => {
    node.textContent = totalCount;
  });
  cartSubtotal.textContent = formatETB(subtotal);
  cartTotal.textContent = formatETB(subtotal);
  cartEmpty.hidden = state.cart.length > 0;
  checkoutToggle.disabled = state.cart.length === 0;
  checkoutToggle.setAttribute('aria-disabled', String(state.cart.length === 0));
  if (state.cart.length === 0) {
    setCheckoutOpen(false);
  }
  cartItems.replaceChildren();

  state.cart.forEach((item) => {
    const line = document.createElement('article');
    line.className = 'cart-line';

    const details = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = item.name;
    const unitPrice = document.createElement('small');
    unitPrice.textContent = formatETB(item.price);

    const controls = document.createElement('div');
    controls.className = 'cart-line__controls';

    const quantitySelector = document.createElement('div');
    quantitySelector.className = 'quantity-selector';
    quantitySelector.setAttribute('aria-label', `Adjust quantity for ${item.name}`);

    const decrease = document.createElement('button');
    decrease.type = 'button';
    decrease.dataset.cartQty = 'decrease';
    decrease.dataset.id = item.id;
    decrease.setAttribute('aria-label', `Decrease ${item.name}`);
    decrease.textContent = '−';

    const amount = document.createElement('span');
    amount.textContent = String(item.quantity);

    const increase = document.createElement('button');
    increase.type = 'button';
    increase.dataset.cartQty = 'increase';
    increase.dataset.id = item.id;
    increase.setAttribute('aria-label', `Increase ${item.name}`);
    increase.textContent = '+';

    quantitySelector.append(decrease, amount, increase);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'order-mini';
    remove.dataset.removeItem = item.id;
    remove.textContent = 'Remove';

    controls.append(quantitySelector, remove);
    details.append(title, unitPrice, controls);

    const lineTotal = document.createElement('strong');
    lineTotal.textContent = formatETB(item.price * item.quantity);

    line.append(details, lineTotal);
    cartItems.append(line);
  });

  checkoutSummary.textContent = state.cart.length
    ? `${totalCount} item${totalCount > 1 ? 's' : ''} • Total: ${formatETB(subtotal)}`
    : 'Add items to see your pickup summary here.';
};

const addToCart = (productId, quantity = 1) => {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;
  const normalizedQuantity = Math.max(1, Number.parseInt(quantity, 10) || 1);
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += normalizedQuantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: normalizedQuantity
    });
  }
  saveCart();
  updateCartUI();
  cartTrigger?.classList.add('is-bumping');
  window.setTimeout(() => cartTrigger?.classList.remove('is-bumping'), 480);
  showToast(`${product.name} added to cart`);
};

const openProductModal = (productId, trigger) => {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;
  state.modalProductId = productId;
  state.quantity = 1;
  focusReturnTargets.modal = trigger || document.activeElement;
  modalImage.src = product.image;
  modalImage.alt = `${product.name} close-up`;
  modalCategory.textContent = product.label;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatETB(product.price);
  modalQuantity.textContent = String(state.quantity);
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  const closeButton = productModal.querySelector('[data-close-modal]');
  closeButton?.focus();
};

const closeProductModal = () => {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  if (!cartDrawer.classList.contains('is-open') && !mobileDrawer.classList.contains('is-open')) {
    document.body.classList.remove('no-scroll');
  }
  focusReturnTargets.modal?.focus?.();
};

const togglePanel = (panel, overlay, trigger, focusKey, open) => {
  const shouldOpen = open ?? !panel.classList.contains('is-open');
  panel.classList.toggle('is-open', shouldOpen);
  overlay?.classList.toggle('is-visible', shouldOpen);
  panel.setAttribute('aria-hidden', String(!shouldOpen));
  trigger?.setAttribute('aria-expanded', String(shouldOpen));
  if (shouldOpen) {
    focusReturnTargets[focusKey] = document.activeElement;
    document.body.classList.add('no-scroll');
    panel.querySelector('button, a, input')?.focus();
  } else if (!productModal.classList.contains('is-open') && !cartDrawer.classList.contains('is-open') && !mobileDrawer.classList.contains('is-open')) {
    document.body.classList.remove('no-scroll');
    focusReturnTargets[focusKey]?.focus?.();
  }
};

const updateActiveNav = () => {
  const threshold = window.innerHeight * 0.35;
  let current = navLinks[0];
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold && rect.bottom >= threshold) {
      const match = navLinks.find((link) => link.getAttribute('href') === `#${section.id}`);
      if (match) current = match;
    }
  });
  navLinks.forEach((link) => link.classList.toggle('active', link === current));
  setIndicator(navIndicator, current);
};

const setupRevealAnimations = () => {
  const revealNodes = document.querySelectorAll('.reveal, .section-heading');
  revealNodes.forEach((node, index) => {
    if (node.dataset.reveal === 'stagger') {
      node.style.setProperty('--stagger', index % 4);
    }
  });

  if (reduceMotion) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  revealNodes.forEach((node) => observer.observe(node));
};

const initHeroReveal = () => {
  const finishLoad = () => {
    document.body.classList.add('loaded');
    if (!preloader) return;
    preloader.classList.add('is-hidden');
    window.setTimeout(() => preloader.remove(), 560);
  };

  window.setTimeout(finishLoad, reduceMotion ? 60 : 900);
};

const setupForms = () => {
  notifyForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = notifyForm.querySelector('.form-feedback');
    const email = notifyForm.elements.email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    feedback.className = 'form-feedback';
    if (!valid) {
      feedback.textContent = 'Please enter a valid email to join the guest house notify list.';
      feedback.classList.add('is-error');
      return;
    }
    feedback.textContent = 'You’re on the list — we’ll notify you when Bereket Guest House opens.';
    feedback.classList.add('is-success');
    notifyForm.reset();
  });

  checkoutForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = checkoutForm.querySelector('.form-feedback');
    const name = checkoutForm.elements.name.value.trim();
    const phone = checkoutForm.elements.phone.value.trim();
    feedback.className = 'form-feedback';
    if (!name || phone.length < 8 || state.cart.length === 0) {
      feedback.textContent = 'Please add items and enter your name and phone to prepare your pickup details.';
      feedback.classList.add('is-error');
      return;
    }
    feedback.textContent = `Thanks ${name}! Your pickup details are prepared locally — please call ${phone} or the shop number to confirm pickup.`;
    feedback.classList.add('is-success');
    state.cart = [];
    saveCart();
    updateCartUI();
    checkoutForm.reset();
    setCheckoutOpen(false);
    showToast('Order request prepared successfully');
  });
};

const setupEvents = () => {
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      state.category = tab.dataset.category;
      filterTabs.forEach((button) => {
        const active = button === tab;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      setIndicator(filterIndicator, tab);
      renderMenu(true);
    });
  });

  menuGrid.addEventListener('click', (event) => {
    const modalButton = event.target.closest('[data-open-product]');
    const addButton = event.target.closest('[data-add-direct]');
    if (modalButton) {
      openProductModal(modalButton.dataset.openProduct, modalButton);
    }
    if (addButton) {
      addToCart(addButton.dataset.addDirect, 1);
    }
  });

  modalAddButton.addEventListener('click', () => {
    addToCart(state.modalProductId, state.quantity);
    closeProductModal();
  });

  productModal.addEventListener('click', (event) => {
    if (event.target === productModal || event.target.closest('[data-close-modal]')) {
      closeProductModal();
    }
    const quantityButton = event.target.closest('[data-qty-change]');
    if (quantityButton) {
      state.quantity = Math.max(1, state.quantity + Number(quantityButton.dataset.qtyChange));
      modalQuantity.textContent = String(state.quantity);
    }
  });

  cartItems.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-item]');
    const quantityButton = event.target.closest('[data-cart-qty]');
    if (removeButton) {
      state.cart = state.cart.filter((item) => item.id !== removeButton.dataset.removeItem);
    }
    if (quantityButton) {
      state.cart = state.cart.map((item) => {
        if (item.id !== quantityButton.dataset.id) return item;
        const delta = quantityButton.dataset.cartQty === 'increase' ? 1 : -1;
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      });
    }
    saveCart();
    updateCartUI();
  });

  cartTrigger.addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', true));
  document.querySelector('[data-close-cart]').addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false));
  cartOverlay.addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false));

  navToggle?.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile'));
  document.querySelector('[data-close-mobile]').addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false));
  mobileOverlay.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false));
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false));
  });

  checkoutToggle.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Add an item to open checkout');
      return;
    }
    setCheckoutOpen(!checkoutPanel.classList.contains('is-open'));
  });

  floatingOrderButton?.addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', () => {
    updateActiveNav();
    const heroBottom = document.getElementById('home').getBoundingClientRect().bottom;
    floatingOrderButton?.classList.toggle('is-visible', heroBottom < window.innerHeight * 0.4);
  }, { passive: true });

  window.addEventListener('resize', () => {
    setIndicator(filterIndicator, document.querySelector('.filter-tab.active'));
    setIndicator(navIndicator, document.querySelector('.nav-link.active'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (productModal.classList.contains('is-open')) closeProductModal();
      if (cartDrawer.classList.contains('is-open')) togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false);
      if (mobileDrawer.classList.contains('is-open')) togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false);
    }

    const openDialog = [productModal, cartDrawer, mobileDrawer].find((element) => element.classList.contains('is-open'));
    if (event.key === 'Tab' && openDialog) {
      const focusable = Array.from(openDialog.querySelectorAll('button, a, input, [tabindex]:not([tabindex="-1"])')).filter((item) => !item.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
};

loadCart();
renderMenu();
updateCartUI();
setupRevealAnimations();
setupForms();
setupEvents();
updateActiveNav();
setIndicator(filterIndicator, document.querySelector('.filter-tab.active'));
if (document.readyState === 'complete') {
  initHeroReveal();
} else {
  window.addEventListener('load', initHeroReveal, { once: true });
}
