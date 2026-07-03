// ---------- cart (localStorage) ----------
const CART_KEY = "hs_cart";
const WISH_KEY = "hs_wishlist";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const image = (product.images && product.images[0]) || product.image || "";
  const existing = cart.find((i) => i.id === product.id);
  if (existing) existing.qty += qty;
  else cart.push({ id: product.id, name: product.name, price: product.price, image, qty });
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}
function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}
function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) { item.qty = Math.max(1, qty); saveCart(cart); }
}
function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function clearCart() { saveCart([]); }

function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

// ---------- wishlist ----------
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
  catch { return []; }
}
function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) list = list.filter((i) => i !== id);
  else list.push(id);
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  updateWishBadge();
  return list.includes(id);
}
function updateWishBadge() {
  document.querySelectorAll("[data-wish-badge]").forEach((el) => {
    const count = getWishlist().length;
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

// ---------- toast ----------
let toastTimer;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  updateWishBadge();
});
