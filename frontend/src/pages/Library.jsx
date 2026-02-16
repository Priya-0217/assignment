import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function Library({ currentUser }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  useEffect(()=>{
    (async ()=>{
      try {
        const data = await apiFetch('/api/music/musics', { method: 'GET' })
        setItems(data.musics || [])
      } catch (err) {
        setStatus('Error: ' + err.message)
      }
    })()
  },[])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Library</h1>
      {status && <div className="text-emerald-400 mb-2">{status}</div>}
      <ul className="space-y-2">
        {items.map(m=>(
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
                      setStatus('Deleted successfully')
                      setTimeout(()=>setStatus(''), 2000)
                    } catch (err) {
                      setStatus('Delete error: ' + err.message)
                    }
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
