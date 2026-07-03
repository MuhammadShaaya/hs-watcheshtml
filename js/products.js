const STAR_ICON = `<svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12"><path d="M10 1.5l2.6 5.6 6.1.7-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6-4.6-4.2 6.1-.7z"/></svg>`;
const HEART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-9.5-8.8C.6 7.8 2.4 4.5 5.8 4c2-.3 3.8.7 4.7 2.3a1 1 0 0 0 1 0C12.4 4.7 14.2 3.7 16.2 4c3.4.5 5.2 3.8 3.3 7.2C19 15.6 12 20 12 20z"/></svg>`;

let __productsCache = null;

async function getAllProducts() {
  if (__productsCache) return __productsCache;
  __productsCache = await apiGet("/api/products");
  return __productsCache;
}

function starRow(rating) {
  const full = Math.round(rating || 0);
  return `<div class="stars">${STAR_ICON.repeat(full)}<span>${(rating || 0).toFixed(1)}</span></div>`;
}

function productCard(p) {
  const wished = getWishlist().includes(p.id);
  const cover = (p.images && p.images[0]) || p.image || "";
  return `
  <article class="card">
    <div class="card-media">
      ${p.oldPrice ? `<span class="card-badge">Sale</span>` : (p.featured ? `<span class="card-badge">Featured</span>` : "")}
      <button class="card-wish ${wished ? "active" : ""}" data-wish="${p.id}" aria-label="Toggle wishlist">${HEART_ICON}</button>
      <a href="product.html?id=${p.id}"><img src="${cover}" alt="${p.name}" loading="lazy"></a>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.category}</span>
      <h3 class="card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      ${starRow(p.rating)}
      <div class="card-price">
        <span class="price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="card-foot">
        <button class="btn btn-outline btn-block" data-add="${p.id}">Add to cart</button>
      </div>
    </div>
  </article>`;
}

function bindCardEvents(container, products) {
  container.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(btn.getAttribute("data-add"));
      const product = products.find((p) => p.id === id);
      if (product) addToCart(product, 1);
    });
  });
  container.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(btn.getAttribute("data-wish"));
      const active = toggleWishlist(id);
      btn.classList.toggle("active", active);
    });
  });
}
