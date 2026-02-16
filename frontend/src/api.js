export async function apiFetch(path, options = {}) {
  const headers =
    options.body instanceof FormData
      ? { ...(options.headers || {}) }
      : { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const res = await fetch(path, {
    credentials: 'include',
    ...options,
    headers
  })
  const ct = res.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await res.json() : await res.text()
  if (!res.ok) {
    throw new Error(typeof data === 'string' ? data : (data.message || 'Request failed'))
  }
  return data
}
