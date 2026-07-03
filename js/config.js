// ============================================================
// EDIT THIS ONE LINE once your backend is deployed (Railway, Render, etc).
// Example: "https://hs-watches-api.up.railway.app"
// While testing locally with `npm start` in /backend, leave it as localhost.
// ============================================================
const API_BASE_URL = "https://hs-watcheshtml-backend.onrender.com";
apiGet("/api/products");

// Currency shown across the storefront. Change to "$", "Rs.", "€" etc.
const CURRENCY_SYMBOL = "Rs.";

function formatPrice(amount) {
  return `${CURRENCY_SYMBOL} ${Number(amount || 0).toLocaleString("en-US")}`;
}
