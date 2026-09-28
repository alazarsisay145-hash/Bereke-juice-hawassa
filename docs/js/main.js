const WHATSAPP_NUMBER = '251916399015'; // TODO: owner will replace

const getMenuAsset = (slug) => ({
  image: `assets/menu/${slug}.jpg`,
  fallbackImage: `assets/menu/${slug}.svg`
});

const products = [
  {
    id: 'mango-juice',
    name: 'Mango Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 140,
    ...getMenuAsset('mango-juice'),
    description: 'Sun-ripened mango blended into a bright, refreshing Hawassa classic.'
  },
  {
    id: 'avocado-juice',
    name: 'Avocado Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 150,
    ...getMenuAsset('avocado-juice'),
    description: 'Creamy avocado finished with gentle sweetness and a silky texture.'
  },
  {
    id: 'papaya-juice',
    name: 'Papaya Juice',
    category: 'juices',
    label: 'Fresh Juices',
    price: 135,
    ...getMenuAsset('papaya-juice'),
    description: 'Smooth papaya juice served chilled for a naturally mellow finish.'
  },
  {
    id: 'spris',
    name: 'Signature Spris',
    category: 'juices',
    label: 'Fresh Juices',
    price: 185,
    ...getMenuAsset('spris'),
    description: 'A layered blend of mango, avocado, papaya and milk for the full Bereket signature experience.'
  },
  {
    id: 'strawberry-smoothie',
    name: 'Strawberry Smoothie',
    category: 'smoothies',
    label: 'Smoothies',
    price: 170,
    ...getMenuAsset('strawberry-smoothie'),
    description: 'Cold, creamy and packed with strawberry flavor for an easy anytime pick.'
  },
  {
    id: 'tropical-smoothie',
    name: 'Tropical Smoothie',
    category: 'smoothies',
    label: 'Smoothies',
    price: 175,
    ...getMenuAsset('tropical-smoothie'),
    description: 'Mango, pineapple and banana blended smooth with a sunny finish.'
  },
  {
    id: 'banana-shake',
    name: 'Banana Shake',
    category: 'shakes',
    label: 'Shakes',
    price: 165,
    ...getMenuAsset('banana-shake'),
    description: 'Thick banana shake with a dessert-like creaminess and chilled sweetness.'
  },
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'shakes',
    label: 'Shakes',
    price: 190,
    ...getMenuAsset('oreo-shake'),
    description: 'Cookies-and-cream shake topped with a rich finish and smooth body.'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'burgers',
    label: 'Burgers',
    price: 260,
    ...getMenuAsset('chicken-burger'),
    description: 'Juicy chicken burger with crisp lettuce, fresh tomato and a soft toasted bun.'
  },
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'burgers',
    label: 'Burgers',
    price: 285,
    ...getMenuAsset('beef-burger'),
    description: 'A satisfying beef burger layered with sauce, vegetables and bold flavor.'
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad',
    category: 'salads',
    label: 'Fruit Salads',
    price: 155,
    ...getMenuAsset('fruit-salad'),
    description: 'A colorful bowl of cut seasonal fruits served fresh and chilled.'
  },
  {
    id: 'special-salad',
    name: 'Special Fruit Mix',
    category: 'salads',
    label: 'Fruit Salads',
    price: 180,
    image: 'assets/menu/special-fruit-mix.jpg',
    fallbackImage: 'assets/menu/special-fruit-mix.svg',
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

const reduceMotion = typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;
const menuGrid = document.getElementById('menu-grid');
const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
const filterIndicator = document.querySelector('.filter-indicator');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navIndicator = document.querySelector('.nav-indicator');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const homeSection = document.getElementById('home');
const footer = document.querySelector('.site-footer');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.querySelector('[data-overlay="cart"]');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileOverlay = document.querySelector('[data-overlay="mobile"]');
const cartTrigger = document.querySelector('.cart-trigger');
const closeCartButton = document.querySelector('[data-close-cart]');
const navToggle = document.querySelector('.nav-toggle');
const closeMobileButton = document.querySelector('[data-close-mobile]');
const floatingOrderButton = document.querySelector('.floating-order');
const backToTopButton = document.querySelector('.back-to-top');
const orderFlowButtons = Array.from(document.querySelectorAll('[data-open-order-flow]'));
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
const cartStatus = document.getElementById('cart-status');
const checkoutPanel = document.getElementById('checkout-panel');
const checkoutSummary = document.getElementById('checkout-summary');
const cartSubtotal = document.querySelector('[data-cart-subtotal]');
const cartTotal = document.querySelector('[data-cart-total]');
const cartCountNodes = document.querySelectorAll('[data-cart-count]');
const checkoutToggle = document.querySelector('.cart-checkout-toggle');
const checkoutForm = document.querySelector('form[data-checkout-form]');
const menuStatus = document.getElementById('menu-status');
const whatsappLinks = Array.from(document.querySelectorAll('[data-whatsapp-link]'));
const contactNumberNodes = Array.from(document.querySelectorAll('[data-contact-number]'));
const telLinks = Array.from(document.querySelectorAll('[data-contact-link="tel"]'));
const schemaScript = document.getElementById('restaurant-schema');
const focusReturnTargets = {
  modal: null,
  cart: null,
  mobile: null
};

const storage = {
  supported: (() => {
    try {
      const key = '__bereket_test__';
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  })(),
  get(key) {
    if (!this.supported) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    if (!this.supported) return false;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
};

const formatETB = (value) => `ETB ${value.toLocaleString()}`;
const getActiveElement = () => document.activeElement instanceof HTMLElement ? document.activeElement : null;
const focusElement = (node) => node?.focus?.();
const onNextFrame = (callback) => (typeof window.requestAnimationFrame === 'function'
  ? window.requestAnimationFrame(callback)
  : window.setTimeout(callback, 16));

const setText = (node, value) => {
  if (node) node.textContent = String(value ?? '');
};

const sanitizeDigits = (value) => String(value || '').replace(/\D+/g, '');
const buildWhatsAppUrl = (message = '') => {
  const base = `https://wa.me/${sanitizeDigits(WHATSAPP_NUMBER)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
const formatContactNumber = () => {
  const digits = sanitizeDigits(WHATSAPP_NUMBER);
  const parts = digits.match(/^(\d{3})(\d{3})(\d{3})(\d+)$/);
  return parts ? `+${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]}` : `+${digits}`;
};

const setProductImage = (node, product, alt) => {
  if (!node || !product) return;
  node.onerror = () => {
    node.onerror = null;
    node.src = product.fallbackImage;
  };
  node.src = product.image;
  node.alt = alt;
};

const hydrateContactLinks = () => {
  const displayNumber = formatContactNumber();
  const telHref = `tel:+${sanitizeDigits(WHATSAPP_NUMBER)}`;
  const genericMessage = 'Hello Bereket Juice & Fruit Salad! 🍹';

  whatsappLinks.forEach((link) => {
    link.setAttribute('href', buildWhatsAppUrl(genericMessage));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  contactNumberNodes.forEach((node) => setText(node, displayNumber));
  telLinks.forEach((link) => link.setAttribute('href', telHref));

  if (!schemaScript) return;
  try {
    const schema = JSON.parse(schemaScript.textContent || '{}');
    schema.telephone = displayNumber;
    schema.sameAs = Array.from(new Set([...(schema.sameAs || []), buildWhatsAppUrl()]));
    schemaScript.textContent = JSON.stringify(schema, null, 2);
  } catch {
    // Leave existing schema untouched if parsing fails.
  }
};

const syncCartTriggerLabel = (count) => {
  if (!cartTrigger) return;
  const suffix = count === 1 ? 'item' : 'items';
  cartTrigger.setAttribute('aria-label', `Cart, ${count} ${suffix}`);
};

const getProduct = (productId) => products.find((entry) => entry.id === productId);
const getVisibleProducts = () => state.category === 'all'
  ? products
  : products.filter((product) => product.category === state.category);

const isPanelOpen = (panel) => Boolean(panel?.classList.contains('is-open'));

const syncBodyScroll = () => {
  const anyOpen = [productModal, cartDrawer, mobileDrawer].some((panel) => isPanelOpen(panel));
  document.body?.classList.toggle('no-scroll', anyOpen);
};

const setIndicator = (indicator, activeElement) => {
  if (!indicator || !activeElement || !indicator.parentElement) return;
  const parent = indicator.parentElement;
  const { left: parentLeft } = parent.getBoundingClientRect();
  const { left, width } = activeElement.getBoundingClientRect();
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translateX(${left - parentLeft}px)`;
};

const showToast = (message) => {
  if (!toast) return;
  setText(toast, message);
  toast.classList.add('is-visible');
  toast.setAttribute('aria-hidden', 'false');
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.setAttribute('aria-hidden', 'true');
  }, 2600);
};

const saveCart = () => {
  storage.set('bereket-cart', JSON.stringify(state.cart));
};

const loadCart = () => {
  try {
    const raw = storage.get('bereket-cart');
    const saved = JSON.parse(raw || '[]');
    if (!Array.isArray(saved)) {
      state.cart = [];
      return;
    }
    state.cart = saved.reduce((items, entry) => {
      const product = getProduct(entry?.id);
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
  } catch {
    state.cart = [];
  }
};

const setCheckoutOpen = (isOpen) => {
  if (!checkoutPanel || !checkoutToggle) return;
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
  image.loading = 'lazy';
  image.decoding = 'async';
  image.width = 900;
  image.height = 675;
  setProductImage(image, product, `${product.name} at Bereket Juice & Fruit Salad`);
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

  const price = document.createElement('strong');
  price.className = 'menu-card__price';
  price.textContent = formatETB(product.price);

  meta.append(label, title);
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
  addButton.textContent = 'Add';

  footer.append(quickView, addButton);
  body.append(top, description, footer);
  card.append(media, body);
  return card;
};

const renderMenu = (withAnimation = false) => {
  if (!menuGrid) return;
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

    if (menuStatus) {
      const categoryLabel = document.querySelector('.filter-tab.active')?.textContent?.trim() || 'All';
      setText(menuStatus, `${items.length} item${items.length === 1 ? '' : 's'} shown for ${categoryLabel}.`);
    }

    onNextFrame(() => {
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
  syncCartTriggerLabel(totalCount);

  setText(cartStatus, totalCount ? `${totalCount} item${totalCount === 1 ? '' : 's'} in cart.` : 'Cart is empty.');

  if (!cartSubtotal || !cartTotal || !cartEmpty || !checkoutToggle || !cartItems || !checkoutSummary) {
    return;
  }

  setText(cartSubtotal, formatETB(subtotal));
  setText(cartTotal, formatETB(subtotal));
  cartEmpty.hidden = state.cart.length > 0;
  checkoutToggle.disabled = state.cart.length === 0;
  checkoutToggle.setAttribute('aria-disabled', String(state.cart.length === 0));

  if (state.cart.length === 0) {
    setCheckoutOpen(false);
  }

  cartItems.replaceChildren();

  state.cart.forEach((item) => {
    const product = getProduct(item.id);
    const line = document.createElement('article');
    line.className = 'cart-line';

    const media = document.createElement('div');
    media.className = 'cart-line__media';
    const image = document.createElement('img');
    image.width = 120;
    image.height = 90;
    image.loading = 'lazy';
    image.decoding = 'async';
    setProductImage(image, product, `${item.name} in cart`);
    media.append(image);

    const details = document.createElement('div');
    details.className = 'cart-line__details';
    const title = document.createElement('strong');
    title.textContent = item.name;
    const unitPrice = document.createElement('small');
    unitPrice.textContent = `${formatETB(item.price)} each`;

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

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'order-mini';
    remove.dataset.removeItem = item.id;
    remove.textContent = 'Remove';

    quantitySelector.append(decrease, amount, increase);
    controls.append(quantitySelector, remove);
    details.append(title, unitPrice, controls);

    const lineTotal = document.createElement('strong');
    lineTotal.className = 'cart-line__total';
    lineTotal.textContent = formatETB(item.price * item.quantity);

    line.append(media, details, lineTotal);
    cartItems.append(line);
  });

  setText(
    checkoutSummary,
    state.cart.length
      ? `${totalCount} item${totalCount > 1 ? 's' : ''} • Total: ${formatETB(subtotal)}`
      : 'Add items to see your WhatsApp order summary here.'
  );
};

const addToCart = (productId, quantity = 1) => {
  const product = getProduct(productId);
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
  const product = getProduct(productId);
  if (!product || !productModal || !modalImage || !modalCategory || !modalTitle || !modalDescription || !modalPrice || !modalQuantity) {
    return;
  }

  state.modalProductId = productId;
  state.quantity = 1;
  closeOtherPanels(productModal);
  focusReturnTargets.modal = trigger || getActiveElement();

  setProductImage(modalImage, product, `${product.name} close-up`);
  setText(modalCategory, product.label);
  setText(modalTitle, product.name);
  setText(modalDescription, product.description);
  setText(modalPrice, formatETB(product.price));
  setText(modalQuantity, state.quantity);

  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  syncBodyScroll();
  focusElement(productModal.querySelector('[data-close-modal]'));
};

const closeProductModal = () => {
  if (!productModal) return;
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  state.modalProductId = null;
  state.quantity = 1;
  syncBodyScroll();
  focusElement(focusReturnTargets.modal);
};

const closePanelState = (panel, overlay, trigger) => {
  if (!panel) return;
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('is-visible');
  trigger?.setAttribute('aria-expanded', 'false');
};

const closeOtherPanels = (activePanel) => {
  if (activePanel !== productModal && isPanelOpen(productModal)) {
    closeProductModal();
  }
  if (activePanel !== cartDrawer && isPanelOpen(cartDrawer)) {
    closePanelState(cartDrawer, cartOverlay, cartTrigger);
  }
  if (activePanel !== mobileDrawer && isPanelOpen(mobileDrawer)) {
    closePanelState(mobileDrawer, mobileOverlay, navToggle);
  }
};

const togglePanel = (panel, overlay, trigger, focusKey, open) => {
  if (!panel) return;
  const shouldOpen = open ?? !panel.classList.contains('is-open');

  if (shouldOpen) {
    closeOtherPanels(panel);
  }

  panel.classList.toggle('is-open', shouldOpen);
  overlay?.classList.toggle('is-visible', shouldOpen);
  panel.setAttribute('aria-hidden', String(!shouldOpen));
  trigger?.setAttribute('aria-expanded', String(shouldOpen));

  if (shouldOpen) {
    focusReturnTargets[focusKey] = trigger || getActiveElement();
    focusElement(panel.querySelector('button, a, input, textarea, [tabindex]:not([tabindex="-1"])'));
  } else {
    focusElement(focusReturnTargets[focusKey]);
  }

  syncBodyScroll();
  syncFloatingButtons();
};

const getOpenDialog = () => [productModal, cartDrawer, mobileDrawer].find((panel) => isPanelOpen(panel));

const trapFocus = (event) => {
  const openDialog = getOpenDialog();
  if (!openDialog || event.key !== 'Tab') return;

  const focusable = Array.from(
    openDialog.querySelectorAll('button, a, input, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((node) => !node.hasAttribute('disabled') && !node.getAttribute('aria-hidden'));

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
};

const scrollToTarget = (selector) => {
  if (!selector) return;
  const target = document.querySelector(selector);
  if (!target) return;
  if (typeof target.scrollIntoView === 'function') {
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
};

const syncFloatingButtons = () => {
  const scrolled = window.scrollY > Math.max(320, window.innerHeight * 0.35);
  const heroBottom = homeSection?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY;
  const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
  const crowded = footerTop < window.innerHeight + 120 || isPanelOpen(cartDrawer) || isPanelOpen(productModal);

  floatingOrderButton?.classList.toggle('is-visible', scrolled && heroBottom < window.innerHeight * 0.55 && !crowded);
  backToTopButton?.classList.toggle('is-visible', scrolled && !crowded);
};

const updateActiveNav = () => {
  if (!navLinks.length) return;
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

  if (reduceMotion || !('IntersectionObserver' in window)) {
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

const startOrderFlow = () => {
  if (state.cart.length === 0) {
    scrollToTarget('#menu');
    showToast('Add menu items first, then send your order on WhatsApp.');
    return;
  }

  togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', true);
  setCheckoutOpen(true);
  focusElement(checkoutForm?.elements?.name);
};

const buildOrderMessage = ({ name, pickupTime, note }) => {
  const lines = state.cart.map((item) => `${item.quantity} × ${item.name} — ${formatETB(item.quantity * item.price)}`);
  const total = state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return [
    'Hello Bereket Juice & Fruit Salad! 🍹',
    "I'd like to order:",
    ...lines,
    `Total: ${formatETB(total)}`,
    `Name: ${name}`,
    `Pickup time: ${pickupTime || 'Not specified'}`,
    `Note: ${note || 'None'}`
  ].join('\n');
};

const setupForms = () => {
  checkoutForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = checkoutForm.querySelector('.form-feedback');
    const name = checkoutForm.elements?.name?.value?.trim?.() || '';
    const pickupTime = checkoutForm.elements?.pickupTime?.value?.trim?.() || '';
    const note = checkoutForm.elements?.note?.value?.trim?.() || '';
    if (!feedback) return;

    feedback.className = 'form-feedback';
    if (!name || state.cart.length === 0) {
      setText(feedback, 'Please add items and enter your name before sending your order to WhatsApp.');
      feedback.classList.add('is-error');
      return;
    }

    if (typeof window.open !== 'function') {
      setText(feedback, 'WhatsApp could not be opened in this browser.');
      feedback.classList.add('is-error');
      return;
    }

    const message = buildOrderMessage({ name, pickupTime, note });
    const openedWindow = window.open(buildWhatsAppUrl(message), '_blank');
    if (openedWindow === null) {
      setText(feedback, 'Please allow pop-ups so WhatsApp can open with your order.');
      feedback.classList.add('is-error');
      return;
    }

    setText(feedback, `Thanks ${name}! WhatsApp opened with your order draft.`);
    feedback.classList.add('is-success');
    state.cart = [];
    saveCart();
    updateCartUI();
    checkoutForm.reset();
    setCheckoutOpen(false);
    showToast('Order opened in WhatsApp');
  });
};

const setupScrollTargets = () => {
  document.querySelectorAll('[data-scroll-target]').forEach((node) => {
    node.addEventListener('click', (event) => {
      const selector = node.getAttribute('data-scroll-target');
      if (!selector) return;
      event.preventDefault();
      scrollToTarget(selector);

      if (node.classList.contains('mobile-link')) {
        togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false);
      }
    });
  });
};

const setupEvents = () => {
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      state.category = tab.dataset.category || 'all';
      filterTabs.forEach((button) => {
        const active = button === tab;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      setIndicator(filterIndicator, tab);
      renderMenu(true);
    });
  });

  menuGrid?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const modalButton = event.target.closest('[data-open-product]');
    const addButton = event.target.closest('[data-add-direct]');
    if (modalButton) {
      openProductModal(modalButton.dataset.openProduct, modalButton);
    }
    if (addButton) {
      addToCart(addButton.dataset.addDirect, 1);
    }
  });

  modalAddButton?.addEventListener('click', () => {
    addToCart(state.modalProductId, state.quantity);
    closeProductModal();
  });

  productModal?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target === productModal || event.target.closest('[data-close-modal]')) {
      closeProductModal();
    }

    const quantityButton = event.target.closest('[data-qty-change]');
    if (quantityButton && modalQuantity) {
      state.quantity = Math.max(1, state.quantity + Number(quantityButton.dataset.qtyChange));
      setText(modalQuantity, state.quantity);
    }
  });

  cartItems?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const removeButton = event.target.closest('[data-remove-item]');
    const quantityButton = event.target.closest('[data-cart-qty]');

    if (removeButton) {
      state.cart = state.cart.filter((item) => item.id !== removeButton.dataset.removeItem);
    }

    if (quantityButton) {
      state.cart = state.cart.reduce((items, item) => {
        if (item.id !== quantityButton.dataset.id) {
          items.push(item);
          return items;
        }

        const delta = quantityButton.dataset.cartQty === 'increase' ? 1 : -1;
        const nextQuantity = item.quantity + delta;
        if (nextQuantity > 0) {
          items.push({ ...item, quantity: nextQuantity });
        }
        return items;
      }, []);
    }

    saveCart();
    updateCartUI();
  });

  cartTrigger?.addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', true));
  closeCartButton?.addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false));
  cartOverlay?.addEventListener('click', () => togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false));

  navToggle?.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile'));
  closeMobileButton?.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false));
  mobileOverlay?.addEventListener('click', () => togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false));

  checkoutToggle?.addEventListener('click', () => {
    if (!checkoutPanel) return;
    if (state.cart.length === 0) {
      showToast('Add an item to start your WhatsApp order');
      return;
    }
    setCheckoutOpen(!checkoutPanel.classList.contains('is-open'));
    if (!checkoutPanel.inert) focusElement(checkoutForm?.elements?.name);
  });

  orderFlowButtons.forEach((button) => {
    button.addEventListener('click', startOrderFlow);
  });

  backToTopButton?.addEventListener('click', () => scrollToTarget('#top'));

  window.addEventListener('scroll', () => {
    updateActiveNav();
    syncFloatingButtons();
  }, { passive: true });

  window.addEventListener('resize', () => {
    setIndicator(filterIndicator, document.querySelector('.filter-tab.active'));
    setIndicator(navIndicator, document.querySelector('.nav-link.active'));
    syncFloatingButtons();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (isPanelOpen(productModal)) closeProductModal();
      if (isPanelOpen(cartDrawer)) togglePanel(cartDrawer, cartOverlay, cartTrigger, 'cart', false);
      if (isPanelOpen(mobileDrawer)) togglePanel(mobileDrawer, mobileOverlay, navToggle, 'mobile', false);
    }
    trapFocus(event);
  });
};

loadCart();
hydrateContactLinks();
renderMenu();
updateCartUI();
setupRevealAnimations();
setupForms();
setupScrollTargets();
setupEvents();
updateActiveNav();
setIndicator(filterIndicator, document.querySelector('.filter-tab.active'));
setIndicator(navIndicator, document.querySelector('.nav-link.active'));
syncFloatingButtons();
document.body.classList.add('loaded');
