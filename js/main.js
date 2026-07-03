// Renders the navbar + footer into every page from one place, so editing
// the site's structure never means hunting through 8 HTML files.

const CART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/></svg>`;
const WISH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-9.5-8.8C.6 7.8 2.4 4.5 5.8 4c2-.3 3.8.7 4.7 2.3a1 1 0 0 0 1 0C12.4 4.7 14.2 3.7 16.2 4c3.4.5 5.2 3.8 3.3 7.2C19 15.6 12 20 12 20z"/></svg>`;
const USER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.4-3.6 4.4-5.6 7.5-5.6s6.1 2 7.5 5.6"/></svg>`;
const MENU_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`;

const NAV_LINKS = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "shop.html", label: "Shop", key: "shop" },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const current = document.body.getAttribute("data-page") || "";
  mount.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="brand">H&amp;S
        <span><small>Time, Refined</small></span>
      </a>
      <ul class="nav-links" id="navLinks">
        ${NAV_LINKS.map(l => `<li><a href="${l.href}" class="${l.key===current?'active':''}">${l.label}</a></li>`).join("")}
      </ul>
      <div class="nav-actions">
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">${WISH_ICON}<span class="badge" data-wish-badge style="display:none">0</span></a>
        <a class="icon-btn" href="cart.html" aria-label="Cart">${CART_ICON}<span class="badge" data-cart-badge style="display:none">0</span></a>
        <a class="icon-btn" href="admin/login.html" aria-label="Admin">${USER_ICON}</a>
        <button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu">${MENU_ICON}</button>
      </div>
    </div>
    <div id="mobileMenu" style="display:none; border-top:1px solid var(--line); padding:16px 32px;">
      ${NAV_LINKS.map(l => `<a href="${l.href}" style="display:block; padding:12px 0; font-size:14px; color:var(--ivory-dim);">${l.label}</a>`).join("")}
    </div>
  `;
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("mobileMenu");
  if (toggle) toggle.addEventListener("click", () => {
    mobile.style.display = mobile.style.display === "none" ? "block" : "none";
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="footer-grid">
      <div>
        <div class="brand" style="margin-bottom:14px;">H&amp;S <span><small>Time, Refined</small></span></div>
        <p style="max-width:280px;">A house of considered timepieces — automatic, chronograph and dress watches, chosen for the wrist that keeps its own time.</p>
      </div>
      <div>
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html">All watches</a></li>
          <li><a href="shop.html?featured=1">Featured</a></li>
          <li><a href="wishlist.html">Wishlist</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="admin/login.html">Admin</a></li>
        </ul>
      </div>
      <div>
        <h4>Care</h4>
        <ul>
          <li>Cash on delivery only</li>
          <li>Response within 24 hours</li>
          <li>hello@hswatches.store</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} H&amp;S Watches. All rights reserved.</span>
      <span>Crafted for those who arrive on time, on purpose.</span>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
