import { useMemo, useState } from 'react'
import { apiFetch } from '../api'

export default function Auth() {
  const [mode, setMode] = useState('signup')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [role, setRole] = useState('artist')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [msg, setMsg] = useState('')

  const strength = useMemo(()=>{
    let s = 0
    if (password.length >= 6) s++
    if (password.length >= 10) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return Math.min(s,4)
  },[password])

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    if (mode === 'signup') {
      if (password !== confirm) {
        setMsg('Passwords do not match')
        return
      }
      const payload = { username, email, password, role }
      try {
        const data = await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) })
        setMsg('Registered: ' + (data.user?.username || ''))
        setMode('login')
      } catch (err) {
        setMsg('Register error: ' + err.message)
      }
    } else {
      const isEmail = email.includes('@')
      const payload = isEmail ? { email, password } : { username: email, password }
      try {
        await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) })
        setMsg('Login successful')
        // navigate after login
        window.location.assign('/app')
      } catch (err) {
        setMsg('Login error: ' + err.message)
      }
    }
  }

  return (
    <div className="min-h-[80vh] grid place-items-center bg-gradient-to-br from-emerald-400 to-emerald-600">
      <div className="w-[92%] max-w-md rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500 grid place-items-center text-white font-semibold">S</div>
            <h1 className="text-xl font-semibold text-neutral-900">{mode === 'signup' ? 'Sign up to Spotify New' : 'Sign in to Spotify New'}</h1>
          </div>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {(mode === 'signup') && (
              <div className="space-y-3">
                <label className="block text-sm text-neutral-700">Email address</label>
                <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-4 py-3 border border-neutral-800">
                  <span className="text-neutral-300">📧</span>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter your email address" className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-white" required />
                </div>
                <label className="block text-sm text-neutral-700">Username</label>
                <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-4 py-3 border border-neutral-800">
                  <span className="text-neutral-300">👤</span>
                  <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Choose a username" className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-white" required />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-neutral-700">I am a...</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={()=>setRole('user')} className={`flex-1 px-4 py-2 rounded-lg border ${role==='user'?'border-emerald-600 bg-neutral-900 text-white':'border-neutral-700 bg-neutral-900 text-neutral-400'}`}>🎧 Listener</button>
                    <button type="button" onClick={()=>setRole('artist')} className={`flex-1 px-4 py-2 rounded-lg border ${role==='artist'?'border-emerald-600 bg-neutral-900 text-white':'border-neutral-700 bg-neutral-900 text-neutral-400'}`}>🛠️ Artist</button>
                  </div>
                </div>
              </div>
            )}
            {(mode === 'login') && (
              <div className="space-y-3">
                <label className="block text-sm text-neutral-700">Email or username</label>
                <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-4 py-3 border border-neutral-800">
                  <span className="text-neutral-300">👤</span>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email or username" className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-white" required />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-sm text-neutral-700">Password</label>
              <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-4 py-3 border border-neutral-800">
                <span className="text-neutral-300">🔒</span>
                <input value={password} onChange={e=>setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-white" required />
                <button type="button" onClick={()=>setShowPwd(v=>!v)} className="text-neutral-300">{showPwd ? '🙈' : '👁️'}</button>
              </div>
              {mode === 'signup' && (
                <div className="space-y-1">
                  <div className="h-1 rounded bg-neutral-200 overflow-hidden">
                    <div className={`h-full ${strength<=1?'bg-red-400':strength===2?'bg-yellow-400':strength>=3?'bg-emerald-500':'bg-emerald-500'}`} style={{width: `${[25,50,75,100][strength-1]||25}%`}}></div>
                  </div>
                  <div className={`${strength<=1?'text-red-500':'text-neutral-500'} text-xs`}>{strength<=1?'Weak! Please add more strength!':'Use 10+ chars with numbers & symbols'}</div>
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div className="space-y-3">
                <label className="block text-sm text-neutral-700">Confirm your password</label>
                <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-4 py-3 border border-neutral-800">
                  <span className="text-neutral-300">🔒</span>
                  <input value={confirm} onChange={e=>setConfirm(e.target.value)} type={showConfirm ? 'text' : 'password'} placeholder="Re-enter your password" className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-white" required />
                  <button type="button" onClick={()=>setShowConfirm(v=>!v)} className="text-neutral-300">{showConfirm ? '🙈' : '👁️'}</button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-3">
                <label className="block text-sm text-neutral-700">Role</label>
                <select value={role} onChange={e=>setRole(e.target.value)} className="w-full rounded-2xl bg-neutral-900 text-white px-4 py-3 outline-none border border-neutral-800">
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                </select>
              </div>
            )}

            <button type="submit" className="w-full rounded-full bg-emerald-500 text-white py-3 font-semibold">{mode === 'signup' ? 'Sign Up' : 'Sign In'}</button>

            

            <div className="text-center text-neutral-700">
              {mode === 'signup' ? (
                <span>Already have an account? <button type="button" onClick={()=>setMode('login')} className="text-emerald-600 font-medium">Sign in</button></span>
              ) : (
                <span>New here? <button type="button" onClick={()=>setMode('signup')} className="text-emerald-600 font-medium">Create an account</button></span>
              )}
            </div>

            {msg && <div className="text-center text-emerald-600">{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}
