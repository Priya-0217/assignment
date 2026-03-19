export default function CarSvg() {
  return (
    <svg width="520" height="200" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="40%" stopColor="#a8a8a8" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
        <linearGradient id="windGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180,220,255,0.35)" />
          <stop offset="100%" stopColor="rgba(80,140,200,0.15)" />
        </linearGradient>
        <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="60%" stopColor="#222" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <filter id="bodyShad">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.6)" />
        </filter>
      </defs>

      <ellipse cx="260" cy="185" rx="220" ry="14" fill="rgba(0,0,0,0.45)" />

      <g filter="url(#bodyShad)">
        <path d="M 50 148 Q 55 155 70 158 L 440 158 Q 460 158 470 150 L 475 140 Q 440 138 420 136 L 100 136 Q 60 136 50 148 Z" fill="url(#bodyGrad)" />
        <path d="M 140 136 Q 155 110 175 90 Q 195 72 220 68 L 340 68 Q 365 68 385 82 Q 400 92 415 110 L 420 136 Z" fill="url(#roofGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <path d="M 60 145 Q 260 130 455 145" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      </g>

      <path d="M 450 136 Q 475 132 490 128 Q 500 125 502 135 Q 500 142 490 148 Q 470 155 450 155 Z" fill="#7a7a7a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M 70 136 Q 48 133 38 130 Q 30 128 28 138 Q 30 145 40 150 Q 55 158 75 158 Z" fill="#7a7a7a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      <path d="M 178 92 Q 200 74 220 70 L 340 70 Q 362 70 384 84 L 415 116 Q 385 110 360 108 L 195 108 Q 175 108 178 92 Z" fill="url(#windGrad)" stroke="rgba(200,230,255,0.3)" strokeWidth="0.5" />
      <path d="M 195 100 Q 215 82 240 76 L 320 76 Q 300 86 295 105 Z" fill="rgba(255,255,255,0.08)" />
      <path d="M 200 110 L 260 110 L 258 126 L 198 126 Z" fill="url(#windGrad)" stroke="rgba(200,230,255,0.2)" strokeWidth="0.5" />
      <path d="M 272 110 L 370 110 L 368 126 L 272 126 Z" fill="url(#windGrad)" stroke="rgba(200,230,255,0.2)" strokeWidth="0.5" />

      <line x1="265" y1="110" x2="268" y2="136" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <rect x="225" y="143" width="22" height="4" rx="2" fill="rgba(220,220,220,0.5)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="320" y="143" width="22" height="4" rx="2" fill="rgba(220,220,220,0.5)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      <path d="M 490 128 Q 505 130 508 136 Q 505 140 490 140 Z" fill="rgba(255,240,180,0.9)" opacity="0.85" />
      <rect x="488" y="129" width="2" height="10" rx="1" fill="rgba(255,240,180,0.95)" />
      <path d="M 34 128 Q 28 130 27 136 Q 28 140 36 140 Z" fill="rgba(220,50,50,0.9)" />
      <rect x="34" y="129" width="2" height="10" rx="1" fill="rgba(255,100,100,0.9)" />

      <circle cx="490" cy="149" r="5" fill="none" stroke="rgba(201,168,76,0.8)" strokeWidth="1" />
      <circle cx="490" cy="149" r="2" fill="rgba(201,168,76,0.6)" />

      <rect x="52" y="153" width="12" height="4" rx="2" fill="rgba(80,80,80,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* Front wheel */}
      <g transform="translate(395,160)">
        <circle r="35" fill="rgba(10,10,10,0.95)" stroke="rgba(60,60,60,0.8)" strokeWidth="1.5" />
        <circle r="28" fill="url(#wheelGrad)" />
        <g style={{ animation: 'spin 0.6s linear infinite', transformOrigin: 'center' }}>
          <line x1="-20" y1="-20" x2="20" y2="20" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="-20" x2="-20" y2="20" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="-26" x2="0" y2="26" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-26" y1="0" x2="26" y2="0" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle r="10" fill="#1a1a1a" stroke="#666" strokeWidth="1" />
        <circle r="5" fill="#c9a84c" opacity="0.8" />
        <circle r="33" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
      </g>

      {/* Rear wheel */}
      <g transform="translate(120,160)">
        <circle r="35" fill="rgba(10,10,10,0.95)" stroke="rgba(60,60,60,0.8)" strokeWidth="1.5" />
        <circle r="28" fill="url(#wheelGrad)" />
        <g style={{ animation: 'spin 0.6s linear infinite', transformOrigin: 'center' }}>
          <line x1="-20" y1="-20" x2="20" y2="20" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="-20" x2="-20" y2="20" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="-26" x2="0" y2="26" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-26" y1="0" x2="26" y2="0" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle r="10" fill="#1a1a1a" stroke="#666" strokeWidth="1" />
        <circle r="5" fill="#c9a84c" opacity="0.8" />
        <circle r="33" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
      </g>

      <circle cx="395" cy="160" r="18" fill="none" stroke="rgba(180,100,50,0.3)" strokeWidth="2.5" strokeDasharray="4 3" />
      <circle cx="120" cy="160" r="18" fill="none" stroke="rgba(180,100,50,0.3)" strokeWidth="2.5" strokeDasharray="4 3" />
    </svg>
  );
}
