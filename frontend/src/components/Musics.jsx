import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function Musics({ currentUser }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  async function refresh() {
    setStatus('Loading...')
    try {
      const data = await apiFetch('/api/music/musics', { method: 'GET' })
      setItems(data.musics || [])
      setStatus('')
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }
  useEffect(() => { refresh() }, [])

  async function deleteMusic(id) {
    try {
      await apiFetch(`/api/music/musics/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(m => m._id !== id))
      setStatus('Deleted successfully')
      setTimeout(()=>setStatus(''), 2000)
    } catch (err) {
      setStatus('Delete error: ' + err.message)
    }
  }
  function startEdit(m) {
    setEditId(m._id)
    setEditTitle(m.title || '')
  }
  function cancelEdit() {
    setEditId(null)
    setEditTitle('')
  }
  async function saveEdit() {
    if (!editId) return
    try {
      const id = editId
      await apiFetch(`/api/music/musics/${id}`, { method: 'PUT', body: JSON.stringify({ title: editTitle }) })
      setItems(prev => prev.map(m => m._id === id ? { ...m, title: editTitle } : m))
      setStatus('Updated successfully')
      setTimeout(()=>setStatus(''), 2000)
      cancelEdit()
    } catch (err) {
      setStatus('Update error: ' + err.message)
    }
  }
  return (
    <div className="space-y-2">
      <button onClick={refresh} className="px-4 py-2 rounded bg-emerald-500 text-black">Refresh</button>
      {status && <div className="text-emerald-400">{status}</div>}
      <ul className="space-y-2">
        {items.map(m => (
          <li key={m._id} className="p-3 rounded border border-neutral-700 bg-neutral-900">
            <div className="font-medium">{m.title}</div>
            <div className="text-sm text-neutral-400">{m.artistId?.username || 'unknown'}</div>
            {m.url && (
              <audio src={m.url} controls className="mt-2 w-full"></audio>
            )}
            {(currentUser?.role === 'artist' && (m.artistId?._id === currentUser?.id || m.artistId?.username === currentUser?.username)) && (
              <div className="mt-2">
                {editId === m._id ? (
                  <div className="flex gap-2">
                    <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} className="px-3 py-1 rounded border border-neutral-700 bg-neutral-950 text-white" />
                    <button onClick={saveEdit} className="px-3 py-1 rounded bg-emerald-600 text-black">Save</button>
                    <button onClick={cancelEdit} className="px-3 py-1 rounded bg-neutral-700 text-white">Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={()=>startEdit(m)} className="px-3 py-1 rounded bg-emerald-600 text-black">Edit</button>
                    <button onClick={()=>deleteMusic(m._id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
