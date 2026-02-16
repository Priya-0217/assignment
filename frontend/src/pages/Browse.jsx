import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api'

export default function Browse({ currentUser }) {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  useEffect(()=>{
    (async ()=>{
      try {
        const data = await apiFetch('/api/music/musics', { method: 'GET' })
        setItems(data.musics || [])
      } catch {}
    })()
  },[])
  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase()
    if (!term) return items
    return items.filter(m => (m.title||'').toLowerCase().includes(term) || (m.artistId?.username||'').toLowerCase().includes(term))
  },[q, items])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse</h1>
      <div className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search songs or artists" className="w-full px-3 py-2 rounded border border-neutral-800 bg-neutral-900 text-white" />
      </div>
      <ul className="space-y-2">
        {filtered.map(m=>(
          <li key={m._id} className="p-3 rounded border border-neutral-800 bg-neutral-900">
            <div className="font-medium">{m.title}</div>
            <div className="text-sm text-neutral-400">{m.artistId?.username}</div>
            {m.url && <audio src={m.url} controls className="mt-2 w-full"></audio>}
            {(currentUser?.role === 'artist' && (m.artistId?._id === currentUser?.id || m.artistId?.username === currentUser?.username)) && (
              <div className="mt-2">
                <button
                  onClick={async ()=>{
                    try {
                      await apiFetch(`/api/music/musics/${m._id}`, { method: 'DELETE' })
                      setItems(prev => prev.filter(x => x._id !== m._id))
                    } catch {}
                  }}
                  className="px-3 py-1 rounded bg-red-500 text-white"
                >Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
