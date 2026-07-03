async function apiGet(pathName) {
  const res = await fetch(`${API_BASE_URL}${pathName}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
async function apiPost(pathName, body) {
  const res = await fetch(`${API_BASE_URL}${pathName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}
