const ADMIN_TOKEN_KEY = "hs_admin_token";

function getAdminToken() { return localStorage.getItem(ADMIN_TOKEN_KEY); }
function setAdminToken(t) { localStorage.setItem(ADMIN_TOKEN_KEY, t); }
function clearAdminToken() { localStorage.removeItem(ADMIN_TOKEN_KEY); }

async function adminFetch(pathName, options = {}) {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE_URL}${pathName}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) {
    clearAdminToken();
    window.location.href = "login.html";
    throw new Error("Session expired");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Call at the top of every protected admin page.
function requireAdminAuth() {
  if (!getAdminToken()) {
    window.location.href = "login.html";
  }
}

const SIDEBAR_LINKS = [
  { href: "dashboard.html", label: "Dashboard", key: "dashboard" },
  { href: "products.html", label: "Products", key: "products" },
  { href: "orders.html", label: "Orders", key: "orders" },
  { href: "messages.html", label: "Messages", key: "messages" },
];

function renderAdminShell(activeKey, title) {
  const current = document.body.getAttribute("data-admin-page") || activeKey;
  document.getElementById("adminSidebar").innerHTML = `
    <div class="admin-brand">H&amp;S Admin<small>Time, Refined</small></div>
    <nav class="admin-nav">
      ${SIDEBAR_LINKS.map(l => `<a href="${l.href}" class="${l.key===current?'active':''}">${l.label}</a>`).join("")}
    </nav>
    <div class="admin-logout">
      <a href="../index.html" style="color:var(--ivory-dim); font-size:13px;">← Back to storefront</a>
      <button id="logoutBtn" class="btn btn-outline btn-block" style="margin-top:12px;">Log out</button>
    </div>
  `;
  document.getElementById("logoutBtn").addEventListener("click", () => {
    clearAdminToken();
    window.location.href = "login.html";
  });
  const titleEl = document.getElementById("pageTitle");
  if (titleEl && title) titleEl.textContent = title;
}

function statusPillClass(status) {
  return `pill pill-${(status || "pending").toLowerCase()}`;
}
