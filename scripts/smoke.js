const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const rootDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(rootDir, 'docs/index.html'), 'utf8');
const script = fs.readFileSync(path.join(rootDir, 'docs/js/main.js'), 'utf8');

const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const click = (window, node) => {
  node.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
};

async function bootApp({
  localStorage = {}
} = {}) {
  const dom = new JSDOM(html, {
    url: 'https://alazarsisay145-hash.github.io/Bereke-juice-hawassa/',
    pretendToBeVisual: true,
    runScripts: 'outside-only'
  });

  const { window } = dom;
  const errors = [];
  const originalError = window.console.error.bind(window.console);
  const openCalls = [];

  window.console.error = (...args) => {
    errors.push(args.join(' '));
    originalError(...args);
  };
  window.matchMedia = window.matchMedia || (() => ({
    matches: false,
    media: '',
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {}
  }));
  window.requestAnimationFrame = (callback) => window.setTimeout(() => callback(Date.now()), 0);
  window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target) {
      this.callback([{ isIntersecting: true, target }], this);
    }

    unobserve() {}

    disconnect() {}
  };
  window.open = (url, target) => {
    openCalls.push({ url, target });
    return { closed: false };
  };

  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = function scrollIntoView() {};
  }

  Object.entries(localStorage).forEach(([key, value]) => {
    window.localStorage.setItem(key, value);
  });

  window.eval(script);
  await wait(30);

  return {
    window,
    document: window.document,
    errors,
    openCalls,
    close() {
      dom.window.close();
    }
  };
}

async function testValidPersistedCart() {
  const app = await bootApp({
    localStorage: {
      'bereket-cart': JSON.stringify([
        { id: 'mango-juice', quantity: 2 },
        { id: 'spris', quantity: '1' },
        { id: 'missing-item', quantity: 3 }
      ])
    }
  });

  try {
    const cartItems = app.document.querySelectorAll('.cart-line');
    assert.equal(cartItems.length, 2, 'loads only valid persisted cart lines');
    assert.equal(app.document.querySelector('[data-cart-count]').textContent.trim(), '3');
    assert.match(app.document.querySelector('[data-cart-total]').textContent, /ETB 465/);
    assert.deepEqual(app.errors, [], 'loads valid persisted data without console errors');
  } finally {
    app.close();
  }
}

async function testInvalidPersistedCart() {
  const app = await bootApp({
    localStorage: {
      'bereket-cart': '{invalid-json'
    }
  });

  try {
    assert.equal(app.document.querySelector('[data-cart-count]').textContent.trim(), '0');
    assert.equal(app.document.getElementById('cart-empty').hidden, false);
    assert.deepEqual(app.errors, [], 'invalid persisted data is ignored without console errors');
  } finally {
    app.close();
  }
}

async function testAddDecrementRemoveAndOverlayExclusivity() {
  const app = await bootApp();

  try {
    const { window, document } = app;
    const addMango = document.querySelector('[data-add-direct="mango-juice"]');
    const addSpris = document.querySelector('[data-add-direct="spris"]');
    const quickView = document.querySelector('[data-open-product="mango-juice"]');
    const cartTrigger = document.querySelector('.cart-trigger');
    const navToggle = document.querySelector('.nav-toggle');

    click(window, addMango);
    click(window, addSpris);
    await wait(20);

    assert.equal(document.querySelector('[data-cart-count]').textContent.trim(), '2', 'direct add updates count');

    cartTrigger.focus();
    click(window, cartTrigger);
    await wait(10);

    assert.equal(document.getElementById('cart-drawer').classList.contains('is-open'), true, 'cart opens');

    click(window, document.querySelector('[data-remove-item="spris"]'));
    await wait(10);
    assert.equal(document.querySelector('[data-cart-count]').textContent.trim(), '1', 'remove button removes a cart line');

    click(window, document.querySelector('[data-cart-qty="decrease"][data-id="mango-juice"]'));
    await wait(10);
    assert.equal(document.querySelector('[data-cart-count]').textContent.trim(), '0', 'decrement at quantity 1 removes the item');

    cartTrigger.focus();
    click(window, cartTrigger);
    await wait(10);
    navToggle.focus();
    click(window, navToggle);
    await wait(10);

    assert.equal(document.getElementById('cart-drawer').classList.contains('is-open'), false, 'opening mobile nav closes cart');
    assert.equal(document.getElementById('mobile-drawer').classList.contains('is-open'), true, 'mobile nav opens');

    click(window, document.querySelector('[data-close-mobile]'));
    await wait(10);
    assert.equal(document.activeElement, navToggle, 'closing mobile nav returns focus to the trigger');

    quickView.focus();
    click(window, quickView);
    await wait(10);

    assert.equal(document.getElementById('product-modal').classList.contains('is-open'), true, 'product modal opens');
    assert.equal(document.getElementById('mobile-drawer').classList.contains('is-open'), false, 'opening product modal closes mobile nav');

    click(window, document.querySelector('[data-close-modal]'));
    await wait(10);
    assert.equal(document.activeElement, quickView, 'closing product modal returns focus to its trigger');

    cartTrigger.focus();
    click(window, cartTrigger);
    await wait(10);
    click(window, document.querySelector('[data-close-cart]'));
    await wait(10);
    assert.equal(document.activeElement, cartTrigger, 'closing cart returns focus to the cart trigger');
    assert.deepEqual(app.errors, [], 'cart and overlay interactions run without console errors');
  } finally {
    app.close();
  }
}

async function testWhatsAppCheckoutFlow() {
  const app = await bootApp();

  try {
    const { window, document, openCalls } = app;
    click(window, document.querySelector('[data-add-direct="mango-juice"]'));
    click(window, document.querySelector('[data-add-direct="chicken-burger"]'));
    await wait(20);

    click(window, document.querySelector('[data-open-order-flow]'));
    await wait(20);

    assert.equal(document.getElementById('cart-drawer').classList.contains('is-open'), true, 'order CTA opens cart');
    assert.equal(document.getElementById('checkout-panel').classList.contains('is-open'), true, 'order CTA opens checkout');

    document.querySelector('[name="name"]').value = 'Alazar';
    document.querySelector('[name="pickupTime"]').value = '6:30 PM';
    document.querySelector('[name="note"]').value = 'No ice';
    document.querySelector('[data-checkout-form]').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await wait(20);

    assert.equal(openCalls.length, 1, 'checkout opens WhatsApp exactly once');
    assert.match(openCalls[0].url, /^https:\/\/wa\.me\/251916399015\?text=/, 'checkout uses configured WhatsApp URL');
    assert.match(decodeURIComponent(openCalls[0].url), /Name: Alazar/, 'checkout message includes customer name');
    assert.match(decodeURIComponent(openCalls[0].url), /Pickup time: 6:30 PM/, 'checkout message includes pickup time');
    assert.match(decodeURIComponent(openCalls[0].url), /Note: No ice/, 'checkout message includes note');
    assert.equal(document.querySelector('[data-cart-count]').textContent.trim(), '0', 'cart clears after WhatsApp opens');
    assert.match(document.getElementById('toast').textContent, /WhatsApp/i, 'checkout shows WhatsApp confirmation toast');
  } finally {
    app.close();
  }
}

async function testHydratedContactLinks() {
  const app = await bootApp();

  try {
    const { document } = app;
    const whatsappLink = document.querySelector('[data-whatsapp-link]');
    const numberNode = document.querySelector('[data-contact-number]');
    assert.match(whatsappLink.href, /wa\.me\/251916399015/, 'WhatsApp links are hydrated from the config constant');
    assert.match(numberNode.textContent, /\+251/, 'displayed contact number is hydrated from the same config');
  } finally {
    app.close();
  }
}

async function main() {
  await testValidPersistedCart();
  await testInvalidPersistedCart();
  await testAddDecrementRemoveAndOverlayExclusivity();
  await testWhatsAppCheckoutFlow();
  await testHydratedContactLinks();
  console.log('Smoke test passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
