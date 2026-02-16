import { useState } from 'react'
import { apiFetch } from '../api'

export default function Upload() {
  const [msg, setMsg] = useState('')
  const [albums, setAlbums] = useState([])
  const [albumId, setAlbumId] = useState('')
  async function loadAlbums() {
    try {
      const data = await apiFetch('/api/music/albums', { method: 'GET' })
      setAlbums(data.albums || [])
    } catch {}
  }
  if (albums.length === 0) {
    loadAlbums()
  }
  async function onUpload(e) {
    e.preventDefault()
    const f = e.target
    const fd = new FormData()
    fd.append('title', f.title.value)
    fd.append('music', f.music.files[0])
    try {
      const data = await apiFetch('/api/music/upload', { method: 'POST', body: fd })
      setMsg('Uploaded successfully: ' + (data.music?.title || ''))
      if (albumId) {
        try {
          const a = await apiFetch(`/api/music/albums/${albumId}`, { method: 'GET' })
          const nextIds = (a.album?.musics || []).map(x=>x._id).concat([data.music._id])
          await apiFetch(`/api/music/albums/${albumId}`, { method: 'PUT', body: JSON.stringify({ musicIds: nextIds }) })
        } catch {}
      }
      setTimeout(()=>{
        setMsg('')
        // go to app musics page
        window.location.assign('/app')
      }, 1500)
      f.reset()
    } catch (err) {
      setMsg('Upload error: ' + err.message)
    }
  }
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Upload Music</h1>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow">
        <form onSubmit={onUpload} className="space-y-4">
          <div>
            <div className="text-sm text-neutral-400 mb-1">Song Title</div>
            <input name="title" placeholder="Track name" className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-950 text-white" required />
          </div>
          <div>
            <div className="text-sm text-neutral-400 mb-1">Album (optional)</div>
            <select value={albumId} onChange={e=>setAlbumId(e.target.value)} className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-950 text-white">
              <option value="">No album (single)</option>
              {albums.map(a=>(
                <option key={a._id} value={a._id}>{a.title}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm text-neutral-400 mb-1">Audio File</div>
            <input name="music" type="file" accept="audio/*" className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-950 text-white" required />
          </div>
          <button type="submit" className="w-full px-4 py-2 rounded bg-emerald-600 text-black">Upload Song</button>
          {msg && <div className="px-3 py-2 rounded bg-emerald-600 text-white">{msg}</div>}
        </form>
      </div>
    </div>
  )
}
