import { Link, useLocation } from 'react-router-dom'

const Item = ({ to, icon, label, variant = 'ghost' }) => {
  const loc = useLocation()
  const active = loc.pathname === to
  const base =
    variant === 'primary'
      ? 'bg-emerald-600 text-black hover:bg-emerald-500'
      : active
      ? 'bg-neutral-800 text-white'
      : 'text-neutral-300 hover:bg-neutral-800'
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-2 rounded ${base}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

export default function Sidebar({ currentUser }) {
  return (
    <aside className="w-56 bg-black/70 border-r border-neutral-800 p-4 flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 grid place-items-center rounded-full bg-emerald-600 text-black font-bold">S</div>
        <div className="text-white font-semibold">Spotify</div>
      </div>
      <Item to="/app" icon="🏠" label="Home" />
      <Item to="/app/browse" icon="🔎" label="Browse" />
      {currentUser?.role === 'artist' && <Item to="/app/albums" icon="💿" label="Albums" />}
      <Item to="/app/library" icon="📚" label="Your Library" />
      {currentUser?.role === 'artist' && <Item to="/app/upload" icon="⤴️" label="Upload Music" />}
      {currentUser?.role !== 'artist' && <Item to="/app/playlists" icon="🎧" label="Playlists" />}
      <div className="mt-auto">
        <Item to="/logout" icon="↪️" label="Sign Out" variant="primary" />
      </div>
    </aside>
  )
}
