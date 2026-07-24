/* ═══════════════════════════════════════════════════════════════
   DexSync — App Logic (app.js)
   Gallery · Contact · UI · Auth · Shop · Toast
   ═══════════════════════════════════════════════════════════════ */

/* ───────── Formatter ───────── */
const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

/* ═══════════════════════════════════════════════════════════════
   1. GALLERY  –  lightbox with keyboard navigation
   ═══════════════════════════════════════════════════════════════ */
const Gallery = {
  images: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYL3kpQMSCUGQdaQLCEp1AHqiYGZe-FOX0bfYst9RGubtYnzvMpQUaTSM&s=10',
    'https://www.gaceta.udg.mx/wp-content/uploads/2022/08/mano-scaled.jpg',
    'https://p.turbosquid.com/ts-thumb/JN/dWEAaJ/lC/1/jpg/1689726879/1920x1080/fit_q87/bf10380815691290d1ff03af705f569832e39af1/1.jpg',
    'https://cloudfront-us-east-1.images.arcpublishing.com/artear/V3YE2LZFDNWJQ53NUL73EOOBII.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOyrMFJB9uVX9OLt-whrncqtpIxjpN_3UlyQnKVUroeTPMtGd7452hb0&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUutlGk20oiT4fZcgJrFsmX_X37IenbwBq0k1f7n6X4uYBrrEqcVb5BpM&s=10'
  ],
  captions: [
    'Vista general de la prótesis',
    'Detalle de articulaciones',
    'Acabado en titanio',
    'Componentes electrónicos',
    'Prótesis en uso',
    'Detalle del socket'
  ],
  current: 0,

  open(index) {
    this.current = index;
    this._show();
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.add('active'); lb.style.display = 'flex'; }
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._keyHandler);
  },

  close() {
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.remove('active'); lb.style.display = 'none'; }
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._keyHandler);
  },

  next() { this.current = (this.current + 1) % this.images.length; this._show(); },
  prev() { this.current = (this.current - 1 + this.images.length) % this.images.length; this._show(); },

  _show() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const caption = document.getElementById('lightbox-caption');
    if (img) img.src = this.images[this.current];
    if (counter) counter.textContent = `${this.current + 1} / ${this.images.length}`;
    if (caption) caption.textContent = this.captions[this.current];
  },

  _keyHandler(e) {
    if (e.key === 'ArrowRight') Gallery.next();
    else if (e.key === 'ArrowLeft') Gallery.prev();
    else if (e.key === 'Escape') Gallery.close();
  }
};

/* ═══════════════════════════════════════════════════════════════
   2. CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
const ContactForm = {
  send(event) {
    event.preventDefault();
    const form   = document.getElementById('contact-form');
    const errEl  = document.getElementById('form-error');
    const btn    = document.getElementById('submit-btn');
    if (!form || !btn) return;

    const name    = document.getElementById('f-name');
    const email   = document.getElementById('f-email');
    const subject = document.getElementById('f-subject');
    const message = document.getElementById('f-message');
    const consent = document.getElementById('f-consent');

    /* clear previous errors */
    if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }

    /* validate */
    if (!name.value.trim()) return this._err(errEl, 'Por favor ingresa tu nombre.');
    if (!email.value.trim()) return this._err(errEl, 'Por favor ingresa tu correo electrónico.');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value)) return this._err(errEl, 'El correo electrónico no es válido.');
    if (!subject.value.trim()) return this._err(errEl, 'Por favor ingresa el asunto.');
    if (!message.value.trim()) return this._err(errEl, 'Por favor escribe un mensaje.');
    if (consent && !consent.checked) return this._err(errEl, 'Debes aceptar la política de datos.');

    /* loading */
    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
      btn.classList.remove('loading');
      btn.disabled = false;
      const ref = 'DXS-' + String(Date.now()).slice(-6);
      const refEl = document.getElementById('confirm-ref');
      if (refEl) refEl.textContent = ref;
      const modal = document.getElementById('confirm-modal');
      if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
      form.reset();
      Toast.show('¡Mensaje enviado con éxito!');
    }, 1500);
  },

  closeModal() {
    const modal = document.getElementById('confirm-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
  },

  _err(el, msg) {
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }
};

/* ═══════════════════════════════════════════════════════════════
   3. UI  –  mobile menu, scroll animations, navbar shadow
   ═══════════════════════════════════════════════════════════════ */
const UI = {
  mobileOpen: false,

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    const menu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.navbar-toggle');
    if (menu) {
      menu.classList.toggle('active', this.mobileOpen);
      menu.style.display = this.mobileOpen ? 'flex' : 'none';
    }
    if (toggle) toggle.classList.toggle('active', this.mobileOpen);
  },

  init() {
    /* ── Intersection Observer for scroll animations ── */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.benefit-card, .info-block, .news-card, .spec-card, .gallery-item, [data-animate]').forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });

    /* ── Navbar shadow on scroll ── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('shadow-sm', window.scrollY > 30);
      }, { passive: true });
    }

    /* ── Close mobile menu on resize ── */
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && this.mobileOpen) {
        this.mobileOpen = false;
        const menu = document.getElementById('mobile-menu');
        const toggle = document.querySelector('.navbar-toggle');
        if (menu) { menu.classList.remove('active'); menu.style.display = 'none'; }
        if (toggle) toggle.classList.remove('active');
      }
    });

    /* ── Active nav link highlighting ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length && navLinks.length) {
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
      }, { passive: true });
    }

    /* ── Smooth scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (this.mobileOpen) this.toggleMobile();
        }
      });
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   4. AUTH  –  session-based demo authentication
   ═══════════════════════════════════════════════════════════════ */
const Auth = {
  DEMO_EMAIL: 'demo@dexsync.com',
  DEMO_PASS: 'DexSync2026',
  STORAGE_KEY: 'dexsync_auth',
  STORAGE_USER: 'dexsync_user',

  login(email, password) {
    if (email === this.DEMO_EMAIL && password === this.DEMO_PASS) {
      sessionStorage.setItem(this.STORAGE_KEY, 'true');
      sessionStorage.setItem(this.STORAGE_USER, email);
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.STORAGE_USER);
    window.location.href = 'index.html';
  },

  isAuthenticated() {
    return sessionStorage.getItem(this.STORAGE_KEY) === 'true';
  },

  getUser() {
    return sessionStorage.getItem(this.STORAGE_USER) || '';
  },

  guardPortal() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   5. SHOP  –  e-commerce cart for prosthesis components
   ═══════════════════════════════════════════════════════════════ */
const Shop = {
  products: [
    {
      id: 1,
      name: 'Sensor Mioeléctrico HD',
      price: 245000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYL3kpQMSCUGQdaQLCEp1AHqiYGZe-FOX0bfYst9RGubtYnzvMpQUaTSM&s=10',
      desc: 'Canal de captación de señales EMG de alta fidelidad para control preciso de movimientos.'
    },
    {
      id: 2,
      name: 'Socket Neumático',
      price: 380000,
      image: 'https://www.gaceta.udg.mx/wp-content/uploads/2022/08/mano-scaled.jpg',
      desc: 'Sistema de vacío activo con cámaras de presión independientes para un ajuste perfecto.'
    },
    {
      id: 3,
      name: 'Batería Li-Ion 18h',
      price: 175000,
      image: 'https://cloudfront-us-east-1.images.arcpublishing.com/artear/V3YE2LZFDNWJQ53NUL73EOOBII.jpg',
      desc: 'Batería de repuesto con autonomía extendida de 18 horas y carga rápida.'
    },
    {
      id: 4,
      name: 'Carcasa Fibra de Carbono',
      price: 520000,
      image: 'https://p.turbosquid.com/ts-thumb/JN/dWEAaJ/lC/1/jpg/1689726879/1920x1080/fit_q87/bf10380815691290d1ff03af705f569832e39af1/1.jpg',
      desc: 'Carcasa ultraligera de fibra de carbono con acabado mate profesional.'
    }
  ],

  cart: [],

  addToCart(productId) {
    const existing = this.cart.find(i => i.productId === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ productId, qty: 1 });
    }
    this.renderCart();
    const prod = this.products.find(p => p.id === productId);
    Toast.show(`${prod ? prod.name : 'Producto'} añadido al carrito`);
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    this.renderCart();
  },

  updateQty(productId, delta) {
    const item = this.cart.find(i => i.productId === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.cart = this.cart.filter(i => i.productId !== productId);
    this.renderCart();
  },

  getTotal() {
    return this.cart.reduce((sum, item) => {
      const prod = this.products.find(p => p.id === item.productId);
      return sum + (prod ? prod.price * item.qty : 0);
    }, 0);
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  },

  renderCart() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    const emptyEl = document.getElementById('cart-empty');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (countEl) {
      const count = this.getCartCount();
      countEl.textContent = count;
      countEl.style.display = count > 0 ? 'flex' : 'none';
    }

    if (totalEl) totalEl.textContent = COP.format(this.getTotal());

    if (emptyEl) emptyEl.style.display = this.cart.length === 0 ? 'block' : 'none';
    if (checkoutBtn) checkoutBtn.disabled = this.cart.length === 0;

    if (!itemsEl) return;
    itemsEl.innerHTML = '';

    this.cart.forEach(item => {
      const prod = this.products.find(p => p.id === item.productId);
      if (!prod) return;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <span class="cart-item-name">${prod.name}</span>
          <span class="cart-item-price">${COP.format(prod.price)}</span>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="Shop.updateQty(${prod.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="Shop.updateQty(${prod.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="Shop.removeFromCart(${prod.id})" title="Eliminar">&times;</button>
      `;
      itemsEl.appendChild(row);
    });
  },

  checkout() {
    if (this.cart.length === 0) return;
    const ref = 'ORD-' + String(Date.now()).slice(-6);
    const refEl = document.getElementById('order-ref');
    const modal = document.getElementById('order-modal');
    if (refEl) refEl.textContent = ref;
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
    this.cart = [];
    this.renderCart();
    Toast.show('¡Pedido realizado con éxito!');
  },

  closeOrderModal() {
    const modal = document.getElementById('order-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
  }
};

/* ═══════════════════════════════════════════════════════════════
   6. TOAST  –  notification helper
   ═══════════════════════════════════════════════════════════════ */
const Toast = {
  _timeout: null,

  show(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const msg   = document.getElementById('toast-msg');
    if (!toast || !msg) return;

    clearTimeout(this._timeout);
    msg.textContent = message;
    toast.classList.add('active');
    toast.style.display = 'flex';

    this._timeout = setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => { toast.style.display = 'none'; }, 350);
    }, duration);
  }
};

/* ═══════════════════════════════════════════════════════════════
   AUTO-INIT on DOM ready (only for pages that need it)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
