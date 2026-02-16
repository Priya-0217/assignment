import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api'

export default function Home({ currentUser }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  useEffect(()=>{
    ;(async ()=>{
      try {
        const data = await apiFetch('/api/music/musics', { method: 'GET' })
        setItems(data.musics || [])
      } catch (err) {
        setStatus('Error: ' + err.message)
      }
    })()
  },[])
  if (!items.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Good evening</h1>
        <p className="text-neutral-400 mb-8">Discover new music</p>
        <div className="grid place-items-center h-[50vh]">
          <div className="text-center space-y-4">
            <div className="text-4xl">🎵</div>
            <div className="text-neutral-300">No music yet</div>
            <div className="text-neutral-500">Be the first to upload a track!</div>
            <Link to="/app/upload" className="inline-block px-4 py-2 rounded bg-emerald-600 text-black">Upload your first track</Link>
            {status && <div className="text-emerald-400">{status}</div>}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Good evening</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(m=>(
          <div key={m._id} className="p-4 rounded border border-neutral-800 bg-neutral-900">
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
                    } catch (err) {
                      setStatus('Delete error: ' + err.message)
                    }
                  }}
                  className="px-3 py-1 rounded bg-red-500 text-white"
                >Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
