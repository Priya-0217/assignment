import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function Albums({ currentUser }) {
  const [items, setItems] = useState([])
  const [musics, setMusics] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [status, setStatus] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editSel, setEditSel] = useState(new Set())
  async function refresh() {
    setStatus('Loading...')
    try {
      const data = await apiFetch('/api/music/albums', { method: 'GET' })
      setItems(data.albums || [])
      setStatus('')
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }
  async function refreshMusics() {
    try {
      const data = await apiFetch('/api/music/musics', { method: 'GET' })
      setMusics(data.musics || [])
    } catch (err) {
      // ignore
    }
  }
  useEffect(() => { refresh(); refreshMusics() }, [])
  async function create(e) {
    e.preventDefault()
    const f = e.target
    const title = f.title.value
    let musicIds = Array.from(selected)
    if (musicIds.length === 0) {
      setStatus('Select at least one track')
      return
    }
    try {
      await apiFetch('/api/music/album', { method: 'POST', body: JSON.stringify({ title, musicIds }) })
      f.reset()
      refresh()
      setStatus('Album created successfully')
      setTimeout(()=>setStatus(''), 2000)
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }
  async function deleteAlbum(id) {
    try {
      await apiFetch(`/api/music/albums/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(a => a._id !== id))
      setStatus('Deleted successfully')
      setTimeout(()=>setStatus(''), 2000)
    } catch (err) {
      setStatus('Delete error: ' + err.message)
    }
  }
  function startEdit(a) {
    setEditId(a._id)
    setEditTitle(a.title || '')
    const s = new Set((a.musics || []).map(m => m._id || m))
    setEditSel(s)
  }
  function toggleEditSel(id, checked) {
    const next = new Set(editSel)
    if (checked) next.add(id); else next.delete(id)
    setEditSel(next)
  }
  async function saveEdit() {
    if (!editId) return
    try {
      const ids = Array.from(editSel)
      await apiFetch(`/api/music/albums/${editId}`, { method: 'PUT', body: JSON.stringify({ title: editTitle, musicIds: ids }) })
      refresh()
      setStatus('Album updated successfully')
      setTimeout(()=>setStatus(''), 2000)
      setEditId(null)
      setEditTitle('')
      setEditSel(new Set())
    } catch (err) {
      setStatus('Update error: ' + err.message)
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Albums</h1>
        <button onClick={refresh} className="px-4 py-2 rounded bg-emerald-500 text-black">Refresh</button>
      </div>
      {status && <div className="text-emerald-400">{status}</div>}
      <form onSubmit={create} className="space-y-3">
        <input name="title" placeholder="Enter album title" className="px-3 py-2 rounded border border-neutral-700 bg-neutral-900" required />
        <div className="text-sm text-neutral-400">Select tracks to include:</div>
        <div className="grid md:grid-cols-2 gap-2">
          {musics.map(m => (
            <label key={m._id} className="flex items-center gap-2 p-2 rounded border border-neutral-700 bg-neutral-900">
              <input
                type="checkbox"
                checked={selected.has(m._id)}
                onChange={(e)=>{
                  const next = new Set(selected)
                  if (e.target.checked) next.add(m._id); else next.delete(m._id)
                  setSelected(next)
                }}
              />
              <span className="font-medium">{m.title}</span>
              <span className="text-xs text-neutral-500">{m.artistId?.username}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-black">Create Album</button>
        </div>
      </form>
      <div className="space-y-2">
        {items.map(a => (
          <div key={a._id} className="p-4 rounded border border-neutral-700 bg-neutral-900">
            {editId === a._id ? (
              <div className="space-y-3">
                <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-950 text-white" />
                <div className="grid md:grid-cols-2 gap-2">
                  {musics.map(m => (
                    <label key={m._id} className="flex items-center gap-2 p-2 rounded border border-neutral-700 bg-neutral-900">
                      <input
                        type="checkbox"
                        checked={editSel.has(m._id)}
                        onChange={e=>toggleEditSel(m._id, e.target.checked)}
                      />
                      <span className="font-medium">{m.title}</span>
                      <span className="text-xs text-neutral-500">{m.artistId?.username}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-3 py-1 rounded bg-emerald-600 text-black">Save</button>
                  <button onClick={()=>{setEditId(null); setEditSel(new Set());}} className="px-3 py-1 rounded bg-neutral-700 text-white">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-neutral-400">{a.artist?.username || 'unknown'} • {(a.musics || []).length} tracks</div>
                {(currentUser?.role === 'artist' && (a.artist?._id === currentUser?.id || a.artist?.username === currentUser?.username)) && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>startEdit(a)} className="px-3 py-1 rounded bg-emerald-600 text-black">Edit</button>
                    <button onClick={()=>deleteAlbum(a._id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
