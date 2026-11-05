const CATALOG = [
  { id: 'espresso', name: 'Эспрессо', cat: 'coffee', price: 300, desc: 'Плотный шот спешелти-зерна с яркой кислотностью.', img: 'public/images/menu/espresso.jpg', sizes: true },
  { id: 'cappuccino', name: 'Капучино', cat: 'coffee', price: 360, desc: 'Эспрессо, молоко и плотная молочная пена.', img: 'public/images/menu/cappuccino.jpg', sizes: true },
  { id: 'latte', name: 'Латте', cat: 'coffee', price: 420, desc: 'Мягкий молочный напиток на двойном эспрессо.', img: 'public/images/menu/latte.jpg', sizes: true },
  { id: 'flat', name: 'Флэт уайт', cat: 'coffee', price: 390, desc: 'Короткий молочный кофе с бархатистой текстурой.', img: 'public/images/menu/flat.jpg', sizes: true },
  { id: 'raf', name: 'Раф', cat: 'coffee', price: 460, desc: 'Сливки, ванильный сахар и эспрессо.', img: 'public/images/menu/raf.jpg', sizes: true },
  { id: 'matcha', name: 'Матча', cat: 'tea', price: 480, desc: 'Японский чай на любом молоке.', img: 'public/images/menu/matcha.jpg', sizes: true },
  { id: 'buckwheat', name: 'Гречишный чай', cat: 'tea', price: 370, desc: 'Тёплый ореховый вкус без кофеина.', img: 'public/images/menu/tea.jpg', sizes: true },
  { id: 'leaf', name: 'Листовой чай', cat: 'tea', price: 370, desc: 'Ассам, эрл грей, сенча, улун, жасмин или каркаде.', img: 'public/images/menu/leaf.jpg', sizes: true },
  { id: 'bamble', name: 'Горячий бамбл', cat: 'cold', price: 450, desc: 'Вишня или апельсин на выбор, сезонный special.', img: 'public/images/menu/bamble.jpg', sizes: false },
  { id: 'berry', name: 'Ягодный фильтр', cat: 'cold', price: 450, desc: 'Холодный фильтр с ягодным соком.', img: 'public/images/menu/berry.jpg', sizes: false },
  { id: 'mango', name: 'Чай манго-жасмин', cat: 'cold', price: 470, desc: 'Освежающий чай с манго, жасмином и апельсином.', img: 'public/images/menu/mango.jpg', sizes: true },
  { id: 'cheesecake', name: 'Сырники', cat: 'dessert', price: 310, desc: 'Со сметаной, вареньем или сгущёнкой.', img: 'public/images/menu/syrniki.jpg', sizes: false },
  { id: 'croissant', name: 'Круассан с лососем', cat: 'dessert', price: 520, desc: 'Слоёная выпечка со слабосолёным лососем.', img: 'public/images/menu/croissant.jpg', sizes: false },
  { id: 'mozz', name: 'Круассан с моцареллой', cat: 'dessert', price: 450, desc: 'Тёплая выпечка с моцареллой с витрины.', img: 'public/images/menu/mozz.jpg', sizes: false }
];

const SIZES = [
  { id: '200', label: '200 мл', add: 0 },
  { id: '300', label: '300 мл', add: 60 }
];
const EXTRAS = [
  { id: 'milk', label: 'Альтернативное молоко', add: 90 },
  { id: 'syrup', label: 'Сироп', add: 50 },
  { id: 'shot', label: 'Дополнительный шот', add: 70 }
];
const PROMOS = { SIP20: 0.2, EVENING: 0.1, SIPCOFFEE: 0.15 };
const DELIVERY_FEE = 350;

const CAT_NAMES = { coffee: 'Кофе', tea: 'Чай', cold: 'Холодные напитки', dessert: 'Десерты' };

const store = {
  cart: JSON.parse(localStorage.getItem('sip-cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('sip-orders') || '[]'),
  save() {
    localStorage.setItem('sip-cart', JSON.stringify(this.cart));
    localStorage.setItem('sip-orders', JSON.stringify(this.orders));
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = this.cart.reduce((s, i) => s + i.qty, 0);
    });
  }
};

function money(n) { return `${Math.round(n)} ₽`; }

function lineTotal(item) {
  return (item.price + item.sizeAdd + item.extrasAdd) * item.qty;
}

function findProduct(id) { return CATALOG.find((p) => p.id === id); }

let pending = null;

function openAdd(id) {
  const product = findProduct(id);
  pending = { product, size: product.sizes ? '200' : null, extras: [] };
  document.getElementById('optTitle').textContent = product.name;
  document.getElementById('optDesc').textContent = product.desc;
  const sizes = document.getElementById('optSizes');
  const extras = document.getElementById('optExtras');
  sizes.innerHTML = '';
  extras.innerHTML = '';
  if (product.sizes) {
    sizes.innerHTML = SIZES.map((s) => `<button type="button" class="chip ${s.id === '200' ? 'active' : ''}" data-size="${s.id}">${s.label}${s.add ? ` +${s.add}` : ''}</button>`).join('');
  } else {
    sizes.innerHTML = '<span class="muted">Размер не выбирается</span>';
  }
  extras.innerHTML = EXTRAS.map((e) => `<button type="button" class="chip" data-extra="${e.id}">${e.label} +${e.add}</button>`).join('');
  updateOptPrice();
  bootstrap.Modal.getOrCreateInstance(document.getElementById('optModal')).show();
}

function updateOptPrice() {
  if (!pending) return;
  const size = SIZES.find((s) => s.id === pending.size);
  const extraSum = pending.extras.reduce((s, id) => s + EXTRAS.find((e) => e.id === id).add, 0);
  const base = pending.product.price + (size ? size.add : 0) + extraSum;
  document.getElementById('optPrice').textContent = money(base);
}

function confirmAdd() {
  const size = SIZES.find((s) => s.id === pending.size);
  const extras = pending.extras.map((id) => EXTRAS.find((e) => e.id === id));
  const key = `${pending.product.id}|${pending.size || '-'}|${pending.extras.slice().sort().join(',')}`;
  const existing = store.cart.find((i) => i.key === key);
  if (existing) existing.qty += 1;
  else {
    store.cart.push({
      key,
      id: pending.product.id,
      name: pending.product.name,
      img: pending.product.img,
      price: pending.product.price,
      size: size ? size.label : '—',
      sizeAdd: size ? size.add : 0,
      extras: extras.map((e) => e.label),
      extrasAdd: extras.reduce((s, e) => s + e.add, 0),
      qty: 1
    });
  }
  store.save();
  bootstrap.Modal.getInstance(document.getElementById('optModal')).hide();
  const toastEl = document.getElementById('cartToast');
  toastEl.querySelector('.toast-body').textContent = `${pending.product.name} добавлен в корзину`;
  bootstrap.Toast.getOrCreateInstance(toastEl).show();
  if (document.body.dataset.page === 'cart') renderCart();
}

function productCard(p) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
    <article class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-body">
        <span class="cat-label">${CAT_NAMES[p.cat]}</span>
        <div class="product-meta">
          <h3>${p.name}</h3>
          <span class="price">${money(p.price)}</span>
        </div>
        <p class="muted">${p.desc}</p>
        <button class="btn-dark btn-sm" type="button" data-add="${p.id}" style="margin-top:auto">В корзину</button>
      </div>
    </article>
    </div>`;
}

function renderMenu(filter) {
  const root = document.getElementById('menuGrid');
  if (!root) return;
  const list = filter === 'all' ? CATALOG : CATALOG.filter((p) => p.cat === filter);
  root.innerHTML = list.map(productCard).join('');
}

function cartMath() {
  const sub = store.cart.reduce((s, i) => s + lineTotal(i), 0);
  const code = (document.getElementById('promoInput')?.dataset.applied || '').toUpperCase();
  const rate = PROMOS[code] || 0;
  const discount = Math.round(sub * rate);
  const method = document.querySelector('[data-method].active')?.dataset.method || 'pickup';
  const delivery = method === 'delivery' && sub > 0 ? DELIVERY_FEE : 0;
  return { sub, discount, delivery, total: Math.max(0, sub - discount + delivery), code, rate };
}

function renderCart() {
  const list = document.getElementById('cartList');
  if (!list) return;
  if (!store.cart.length) {
    list.innerHTML = '<div class="empty">Корзина пуста. Загляните в меню.</div>';
  } else {
    list.innerHTML = store.cart.map((item) => `
      <div class="cart-item">
        <img src="${item.img}" alt="">
        <div>
          <strong>${item.name}</strong>
          <div class="muted" style="font-size:.85rem;margin-top:.25rem">Размер: ${item.size}${item.extras.length ? ' · ' + item.extras.join(', ') : ''}</div>
          <div style="display:flex;gap:1rem;align-items:center;margin-top:.7rem">
            <div class="qty">
              <button type="button" data-qty="${item.key}" data-dir="-1">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty="${item.key}" data-dir="1">+</button>
            </div>
            <button class="linkish" type="button" data-remove="${item.key}">Удалить</button>
          </div>
        </div>
        <div class="line-price price">${money(lineTotal(item))}</div>
      </div>`).join('');
  }
  const m = cartMath();
  document.getElementById('sumSub').textContent = money(m.sub);
  document.getElementById('sumDiscount').textContent = m.discount ? `−${money(m.discount)}` : money(0);
  document.getElementById('sumDelivery').textContent = money(m.delivery);
  document.getElementById('sumTotal').textContent = money(m.total);
  renderHistory();
}

function renderHistory() {
  const root = document.getElementById('historyList');
  if (!root) return;
  if (!store.orders.length) {
    root.innerHTML = '<p class="muted">Пока нет оформленных заказов.</p>';
    return;
  }
  root.innerHTML = store.orders.map((order) => `
    <div class="history-item">
      <div>
        <strong>${order.id}</strong>
        <div class="muted" style="font-size:.85rem">${order.date} · ${order.method === 'delivery' ? 'Доставка' : 'Самовывоз'} · ${money(order.total)}</div>
      </div>
      <button class="btn-ghost btn-sm" type="button" data-repeat="${order.id}">Повторить</button>
    </div>`).join('');
}

function headerBits() {
  store.save();
  document.getElementById('year') && (document.getElementById('year').textContent = '2026');
}

document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) openAdd(add.dataset.add);

  const sizeBtn = e.target.closest('[data-size]');
  if (sizeBtn && pending) {
    pending.size = sizeBtn.dataset.size;
    sizeBtn.parentElement.querySelectorAll('[data-size]').forEach((b) => b.classList.remove('active'));
    sizeBtn.classList.add('active');
    updateOptPrice();
  }
  const extraBtn = e.target.closest('[data-extra]');
  if (extraBtn && pending) {
    const id = extraBtn.dataset.extra;
    if (pending.extras.includes(id)) pending.extras = pending.extras.filter((x) => x !== id);
    else pending.extras.push(id);
    extraBtn.classList.toggle('active');
    updateOptPrice();
  }
  if (e.target.closest('#optConfirm')) confirmAdd();

  const filter = e.target.closest('[data-filter]');
  if (filter) {
    document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
    filter.classList.add('active');
    renderMenu(filter.dataset.filter);
  }

  const qty = e.target.closest('[data-qty]');
  if (qty) {
    const item = store.cart.find((i) => i.key === qty.dataset.qty);
    item.qty += Number(qty.dataset.dir);
    if (item.qty < 1) store.cart = store.cart.filter((i) => i.key !== item.key);
    store.save();
    renderCart();
  }
  const remove = e.target.closest('[data-remove]');
  if (remove) {
    store.cart = store.cart.filter((i) => i.key !== remove.dataset.remove);
    store.save();
    renderCart();
  }
  const method = e.target.closest('[data-method]');
  if (method) {
    document.querySelectorAll('[data-method]').forEach((b) => b.classList.remove('active'));
    method.classList.add('active');
    const addressField = document.getElementById('addressField');
    const addressInput = document.getElementById('address');
    const isDelivery = method.dataset.method === 'delivery';
    addressField.hidden = !isDelivery;
    addressInput.required = isDelivery;
    renderCart();
  }
  const repeat = e.target.closest('[data-repeat]');
  if (repeat) {
    const order = store.orders.find((o) => o.id === repeat.dataset.repeat);
    order.items.forEach((src) => {
      const copy = { ...src, extras: [...src.extras] };
      const hit = store.cart.find((i) => i.key === copy.key);
      if (hit) hit.qty += copy.qty;
      else store.cart.push(copy);
    });
    store.save();
    renderCart();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  headerBits();
  const page = document.body.dataset.page;
  if (page === 'home') {
    const popular = ['cappuccino', 'latte', 'raf', 'cheesecake', 'croissant', 'matcha'];
    document.getElementById('popularGrid').innerHTML = popular.map((id) => productCard(findProduct(id))).join('');
  }
  if (page === 'menu') renderMenu('all');
  if (page === 'cart') renderCart();

  document.getElementById('applyPromo')?.addEventListener('click', () => {
    const input = document.getElementById('promoInput');
    const code = input.value.trim().toUpperCase();
    const note = document.getElementById('promoNote');
    if (PROMOS[code]) {
      input.dataset.applied = code;
      note.textContent = `Промокод ${code} применён: −${PROMOS[code] * 100}%`;
    } else {
      input.dataset.applied = '';
      note.textContent = code ? 'Такого промокода нет' : '';
    }
    renderCart();
  });

  document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    if (!store.cart.length) {
      document.getElementById('orderNote').textContent = 'Добавьте товары в корзину';
      return;
    }
    const m = cartMath();
    const data = new FormData(form);
    const order = {
      id: 'SIP-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleString('ru-RU'),
      name: data.get('name'),
      phone: data.get('phone'),
      method: document.querySelector('[data-method].active').dataset.method,
      time: data.get('time'),
      address: data.get('address') || '',
      total: m.total,
      items: store.cart.map((i) => ({ ...i, extras: [...i.extras] }))
    };
    store.orders.unshift(order);
    store.cart = [];
    store.save();
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('orderNote').textContent = `Заказ ${order.id} принят. Готовим к ${order.time}.`;
    renderCart();
  });

  document.getElementById('feedbackForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    document.getElementById('feedbackNote').textContent = 'Спасибо, мы ответим в ближайшее время.';
    form.reset();
    form.classList.remove('was-validated');
  });
});

