'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'

/* ───────────────────────── THEME ───────────────────────── */

type Theme = 'dark' | 'light'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} })

function useTheme() {
  return useContext(ThemeCtx)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('ui-theme') as Theme) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('ui-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

function v(theme: Theme) {
  const d = theme === 'dark'
  return {
    bg:       d ? '#000000' : '#FFFFFF',
    text:     d ? '#FFFFFF' : '#000000',
    muted:    d ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)',
    faint:    d ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
    ghost:    d ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
    divider:  d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    navBg:    d ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
    forest:   d ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.10)',
  }
}

/* ───────────────────────── TOGGLE (top-right) ───────────────────────── */

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const col = v(theme)
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      className="fixed cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        top: '1.25rem',
        right: '1.25rem',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: `1.5px solid ${col.muted}`,
        background: col.bg,
        zIndex: 9999,
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke={col.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  )
}

/* ───────────────────────── Nordic Forest SVG (left & right only) ───────────────────────── */

function NordicForest({ color }: { color: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: '75vh' }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none">
        <g stroke={color} strokeWidth="0.7" opacity="0.5">
          <line x1="20" y1="900" x2="20" y2="620" /><polygon points="20,620 2,710 38,710" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="80" y1="900" x2="80" y2="580" /><polygon points="80,580 58,680 102,680" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="150" y1="900" x2="150" y2="600" /><polygon points="150,600 128,700 172,700" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="220" y1="900" x2="220" y2="560" /><polygon points="220,560 196,665 244,665" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="300" y1="900" x2="300" y2="590" /><polygon points="300,590 278,690 322,690" fill="none" stroke={color} strokeWidth="0.5" />
        </g>
        <g stroke={color} strokeWidth="1" opacity="0.7">
          <line x1="50" y1="900" x2="50" y2="480" />
          <polygon points="50,480 20,600 80,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="50,550 28,640 72,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="130" y1="900" x2="130" y2="450" />
          <polygon points="130,450 95,580 165,580" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="130,530 108,620 152,620" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="210" y1="900" x2="210" y2="470" />
          <polygon points="210,470 178,595 242,595" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="210,540 190,625 230,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="290" y1="900" x2="290" y2="500" />
          <polygon points="290,500 260,610 320,610" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="290,565 272,640 308,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="360" y1="900" x2="360" y2="490" />
          <polygon points="360,490 332,600 388,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="360,555 342,630 378,630" fill="none" stroke={color} strokeWidth="0.8" />
        </g>
        <g stroke={color} strokeWidth="1.3" opacity="0.9">
          <line x1="35" y1="900" x2="35" y2="370" />
          <polygon points="35,370 -5,510 75,510" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="35,440 10,545 60,545" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="35,510 18,585 52,585" fill="none" stroke={color} strokeWidth="1" />
          <line x1="170" y1="900" x2="170" y2="350" />
          <polygon points="170,350 130,490 210,490" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="170,420 145,525 195,525" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="170,490 152,570 188,570" fill="none" stroke={color} strokeWidth="1" />
          <line x1="320" y1="900" x2="320" y2="380" />
          <polygon points="320,380 282,515 358,515" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="320,450 298,545 342,545" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="320,520 305,590 335,590" fill="none" stroke={color} strokeWidth="1" />
        </g>

        <g stroke={color} strokeWidth="0.7" opacity="0.5">
          <line x1="1140" y1="900" x2="1140" y2="610" /><polygon points="1140,610 1118,705 1162,705" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1210" y1="900" x2="1210" y2="570" /><polygon points="1210,570 1186,670 1234,670" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1280" y1="900" x2="1280" y2="590" /><polygon points="1280,590 1258,690 1302,690" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1350" y1="900" x2="1350" y2="550" /><polygon points="1350,550 1326,655 1374,655" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1420" y1="900" x2="1420" y2="620" /><polygon points="1420,620 1402,710 1438,710" fill="none" stroke={color} strokeWidth="0.5" />
        </g>
        <g stroke={color} strokeWidth="1" opacity="0.7">
          <line x1="1080" y1="900" x2="1080" y2="490" />
          <polygon points="1080,490 1050,605 1110,605" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1080,560 1060,640 1100,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1160" y1="900" x2="1160" y2="460" />
          <polygon points="1160,460 1128,585 1192,585" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1160,535 1140,625 1180,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1240" y1="900" x2="1240" y2="480" />
          <polygon points="1240,480 1210,600 1270,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1240,550 1222,635 1258,635" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1320" y1="900" x2="1320" y2="470" />
          <polygon points="1320,470 1292,595 1348,595" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1320,540 1304,625 1336,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1400" y1="900" x2="1400" y2="500" />
          <polygon points="1400,500 1375,605 1425,605" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1400,565 1385,635 1415,635" fill="none" stroke={color} strokeWidth="0.8" />
        </g>
        <g stroke={color} strokeWidth="1.3" opacity="0.9">
          <line x1="1120" y1="900" x2="1120" y2="360" />
          <polygon points="1120,360 1080,500 1160,500" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1120,430 1095,535 1145,535" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1120,500 1102,580 1138,580" fill="none" stroke={color} strokeWidth="1" />
          <line x1="1270" y1="900" x2="1270" y2="340" />
          <polygon points="1270,340 1230,480 1310,480" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1270,410 1248,520 1292,520" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1270,480 1255,565 1285,565" fill="none" stroke={color} strokeWidth="1" />
          <line x1="1400" y1="900" x2="1400" y2="375" />
          <polygon points="1400,375 1365,505 1435,505" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1400,445 1380,540 1420,540" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1400,515 1388,585 1412,585" fill="none" stroke={color} strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}

/* ───────────────────────── GRAIN ───────────────────────── */

function Grain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  )
}

/* ───────────────────────── COMING SOON ───────────────────────── */

function ComingSoon() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const s = v(theme)
  const isDark = theme === 'dark'

  const glow = isDark
    ? '0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.08)'
    : '0 0 40px rgba(0,0,0,0.12), 0 0 80px rgba(0,0,0,0.06)'

  const btnGlow = isDark
    ? '0 0 20px rgba(255,255,255,0.08)'
    : '0 0 20px rgba(0,0,0,0.06)'

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative transition-colors duration-500"
      style={{ background: s.bg, color: s.text }}
    >
      <NordicForest color={s.forest} />
      <Grain />

      <div className={`flex flex-col items-center transition-all duration-[2000ms] ease-out relative ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ zIndex: 2 }}
      >
        <h1
          className="tracking-[0.35em] uppercase text-center select-none"
          style={{
            fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            lineHeight: 1.4,
            textShadow: glow,
          }}
        >
          Upstream<br />Institute
        </h1>

        <div className="w-12 my-8" style={{ height: '1px', background: s.divider }} />

        <p className="text-center max-w-xs"
          style={{ color: s.muted, fontSize: 'clamp(0.7rem, 1.2vw, 0.8125rem)', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.7 }}
        >
          Reimagining capital stewardship<br />for intergenerational prosperity.
        </p>

        {/* Modern Read White Paper Button */}
        <button
          onClick={() => { window.location.hash = 'white-paper' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mt-10 cursor-pointer transition-all duration-300"
          style={{
            padding: '0.7rem 2rem',
            border: `1px solid ${hovered ? s.text : s.muted}`,
            borderRadius: '2px',
            background: 'transparent',
            color: s.text,
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            boxShadow: hovered ? btnGlow : 'none',
          }}
        >
          Read White Paper
        </button>

        <div className="mt-8 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: s.text, animation: 'pulse 2.5s ease-in-out infinite' }} />
          <span className="uppercase"
            style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.2em', fontWeight: 400 }}
          >
            Helsinki, 2026
          </span>
        </div>

        <a href="mailto:hello@upstreaminstitute.org"
          className="mt-6 transition-colors duration-700"
          style={{ color: s.faint, fontSize: '0.6875rem', letterSpacing: '0.06em', fontWeight: 300 }}
          onMouseEnter={e => (e.currentTarget.style.color = s.text)}
          onMouseLeave={e => (e.currentTarget.style.color = s.faint)}
        >
          hello@upstreaminstitute.org
        </a>
      </div>

      <div className="absolute bottom-6" style={{ zIndex: 2 }}>
        <span style={{ color: s.ghost, fontSize: '0.5rem', letterSpacing: '0.15em', fontWeight: 300 }}>&reg;</span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </main>
  )
}

/* ───────────────────────── WHITE PAPER ───────────────────────── */

const TOC = [
  { id: 'introduction', label: 'Introduction: The Crisis of Thought' },
  { id: 'landscape', label: 'The Intellectual Landscape' },
  { id: 'premises', label: 'Challenging the Fundamental Premises' },
  { id: 'operations', label: 'How We Operate' },
  { id: 'endowment', label: 'A New Standard for Endowment Returns' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'authors', label: 'About the Authors' },
]

function WhitePaper() {
  const { theme } = useTheme()
  const [ready, setReady] = useState(false)
  const s = v(theme)

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionProperty: 'opacity, background-color, color', background: s.bg, color: s.text }}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: s.navBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 100 }}
      >
        <button
          onClick={() => { window.location.hash = '' }}
          className="transition-colors duration-500 cursor-pointer"
          style={{ color: s.text, fontSize: '0.6875rem', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' as const, background: 'none', border: 'none' }}
        >
          Upstream Institute
        </button>
        <button
          onClick={() => { window.location.hash = '' }}
          className="transition-colors duration-500 cursor-pointer"
          style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 400, background: 'none', border: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = s.text)}
          onMouseLeave={e => (e.currentTarget.style.color = s.faint)}
        >
          Back
        </button>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p className="uppercase mb-8"
          style={{ color: s.muted, fontSize: '0.625rem', letterSpacing: '0.3em', fontWeight: 600 }}
        >
          White Paper
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Thinking Upstream
        </h1>
        <p className="mt-5 max-w-lg mx-auto"
          style={{ color: s.muted, fontSize: 'clamp(0.8125rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.65 }}
        >
          A New School of Thought for Finance, Policy, and Planetary Regeneration
        </p>
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          style={{ fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6, color: s.muted }}
        >
          <span>Dr. Paavo Pylkk&auml;nen</span>
          <span style={{ color: s.ghost }}>|</span>
          <span>Dr. Elina Pylkk&auml;nen</span>
          <span style={{ color: s.ghost }}>|</span>
          <span>Sagar Tandon</span>
        </div>
        <p className="mt-3" style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em' }}>
          Helsinki, Finland &middot; June 2026
        </p>
      </header>

      {/* Table of Contents */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 mb-16">
        <div style={{ borderTop: `1px solid ${s.divider}`, borderBottom: `1px solid ${s.divider}` }} className="py-8">
          <p className="uppercase mb-5" style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.2em', fontWeight: 600 }}>Index</p>
          <ol className="space-y-3">
            {TOC.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                  className="transition-colors duration-300 cursor-pointer text-left w-full"
                  style={{ color: s.muted, fontSize: '0.8125rem', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.5, background: 'none', border: 'none', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = s.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = s.muted)}
                >
                  <span style={{ color: s.faint, marginRight: '0.75rem', fontSize: '0.75rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Body */}
      <article
        className="max-w-2xl mx-auto px-6 md:px-12 pb-32"
        style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', fontWeight: 300, lineHeight: 1.85, color: s.text }}
      >
        <WPSection id="introduction" title="Introduction: The Crisis of Thought">
          <p>The physicist and philosopher David Bohm argued that humanity&rsquo;s deepest crises are not primarily technical or political&mdash;they are crises of &ldquo;thought.&rdquo; He observed that thought is a system: fragments of the past that we project onto the present, mistakenly believing we are engaging directly with reality.</p>
          <p>Modern economics is a profound symptom of this crisis. It is built on a classical, Newtonian paradigm that treats the economy as a machine made of isolated parts&mdash;firms, consumers, resources&mdash;that can be optimized independently. This mechanical worldview has generated unprecedented technological advancement, but it has done so by treating social fragmentation and ecological degradation as acceptable externalities.</p>
          <p>To solve the systemic crises of the 21st century, we cannot simply optimize the old machine. We must change the nature of the thought that built it.</p>
          <p>The Upstream Institute exists to generate an entirely new school of thought. We are not merely a think tank producing papers, nor are we a traditional investment fund. We are an integrated ecosystem uniting deep quantum philosophy, population-scale policy research, and the real-world execution of capital. We exist to fundamentally reimagine the roles of the state, the financier, the individual, and nature.</p>
        </WPSection>

        <WPSection id="landscape" title="The Intellectual Landscape: Why Existing Institutions Fail">
          <p>The global landscape is saturated with think tanks, research institutes, and impact funds. Yet, none possess the philosophical foundation or the structural integration required to shift economic paradigms.</p>
          <WPSubSection title="The Orthodox Free-Market Tanks (e.g., The Hoover Institution, Cato Institute)">
            <p>These institutions operate firmly within the Newtonian paradigm. They view the economy as a mechanistic system of independent agents. Their policy prescriptions&mdash;deregulation, privatization, minimal state intervention&mdash;optimize for aggregate growth while treating ecological and social decay as the cost of doing business. They challenge the role of the state, but only to shrink it, never to reimagine its fundamental purpose in an entangled world.</p>
          </WPSubSection>
          <WPSubSection title="The Centrist Reform Tanks (e.g., The Brookings Institution)">
            <p>Centrist institutions attempt to patch the mechanical model. They advocate for moderate redistribution, human capital investment, and targeted regulations. However, they still operate entirely within the confines of neoclassical economics. They seek to make extraction more palatable, not to replace extraction with regeneration. Their research influences policy at the margins, but it leaves the foundational premises of modern capitalism untouched.</p>
          </WPSubSection>
          <WPSubSection title="The ESG and Impact Investment Consensus">
            <p>The financial sector has responded to systemic crises with &ldquo;ESG&rdquo; and &ldquo;impact investing.&rdquo; However, as Bohm would note, this is often fragmented thought in action. ESG largely involves applying a thin ethical veneer to the exact same extractive capital structures. Impact investing frequently accepts a false dichotomy: that doing good requires sacrificing financial return. Furthermore, they lack a rigorous philosophical arm; they deploy capital without challenging the legal and ontological frameworks that make extraction possible in the first place.</p>
          </WPSubSection>
          <WPSubSection title="The Upstream Differentiator">
            <p>The Upstream Institute is the first institution to fuse deep philosophy, rigorous policy research, and an executing endowment into a single entity. We do not write papers to be read; we write theories to be codified into financial products and state policy. We do not invest to generate alpha; we invest to prove that regeneration is the highest form of yield.</p>
          </WPSubSection>
        </WPSection>

        <WPSection id="premises" title="Challenging the Fundamental Premises">
          <p>The Upstream Institute is built to systematically dismantle and rebuild the foundational roles of our modern economy. We challenge four basic premises:</p>
          <WPPremise number="1" label="The Role of the State"
            oldPremise="The state is either an intrusive regulator to be minimized, or a night-watchman protecting property rights."
            newPremise="The state is a Systemic Architect. Its role is not to correct market failures after the fact, but to design the legal, administrative, and infrastructural &ldquo;soil&rdquo; in which regenerative capital grows."
          />
          <WPPremise number="2" label="The Role of the Financier"
            oldPremise="The financier is a passive allocator of capital seeking risk-adjusted financial returns, detached from the real-world ripple effects of their allocations."
            newPremise="The financier is a Systemic Designer. Drawing on Bohm&rsquo;s concept of &ldquo;active information,&rdquo; we understand that money does not merely represent value&mdash;it shapes the material conditions of human life. Financiers must be structurally accountable for the social and ecological ripples of their capital."
          />
          <WPPremise number="3" label="The Role of People"
            oldPremise="People are &ldquo;human capital&rdquo; or &ldquo;consumers&rdquo;&mdash;isolated economic units to be optimized."
            newPremise="Drawing on the Japanese philosophy of Gapponism, people are entangled co-creators. Economic equality is not a luxury; it is a moral prerequisite. Without baseline security, individuals cannot participate in the co-creation of a thriving society."
          />
          <WPPremise number="4" label="The Role of Nature"
            oldPremise="Nature is an externality, a bottomless sink for waste, or a passive asset class to be priced via carbon offsets."
            newPremise="Nature is the foundational substrate of all capital. If nature degrades, capital degrades. Financial products must be structurally tethered to ecological regeneration, not abstract accounting tricks."
          />
        </WPSection>

        <WPSection id="operations" title="How We Operate: Features and Functions">
          <p>To manifest this new school of thought, the Upstream Institute operates through three interconnected arms. This is not a loose coalition; it is a unified feedback loop where theory informs capital, and capital generates data that refines theory.</p>
          <WPSubSection title="Arm 1: The Upstream Think Tank (Tool Builders)">
            <p>Traditional think tanks produce opinion pieces and policy briefs. The Upstream Think Tank produces <em>tools</em>.</p>
            <ul>
              <li><strong>The &ldquo;Terms for Humanity&rdquo; Library:</strong> We curate a free, global repository of legal clauses, term sheets, and governance templates that legally embed stakeholder voice and ecological limits into investment agreements.</li>
              <li><strong>Humanized Finance Playbooks:</strong> Open-source architectural blueprints for Industrial Foundation 2.0, Serial Steward Models, and Impact-Aligned Executive Compensation.</li>
              <li><strong>Philosophical Translation:</strong> We translate complex quantum ontologies and ethical frameworks into rigorous, actionable doctrines for policymakers and capitalists.</li>
            </ul>
          </WPSubSection>
          <WPSubSection title="Arm 2: The Nordic Social Policy Research Lab (Evidence Generators)">
            <p>We do not speculate about what works; we prove it. Leveraging Finland&rsquo;s unique administrative infrastructure, the Lab treats the nation as a living laboratory.</p>
            <ul>
              <li><strong>Population-Scale Testing:</strong> We co-design interventions with the Finnish government&mdash;focusing on child poverty, homelessness, and social connection&mdash;and track the macroeconomic results across entire demographics over time.</li>
              <li><strong>Proving Entanglement:</strong> The Lab&rsquo;s primary function is to generate irrefutable data proving that social equity and economic dynamism are not opposed, but mathematically entangled.</li>
            </ul>
          </WPSubSection>
          <WPSubSection title="Arm 3: The Upstream Endowment (The Execution Arm)">
            <p>We do not just advocate for a new economy; we build it. The Endowment acts as an internal venture studio for financial products. We deploy permanent capital into structures that generate both financial yield and measurable healing.</p>
            <ul>
              <li><strong>SME Patient Capital Vehicles:</strong> Debt and equity hybrids that provide permanent capital to small and medium enterprises, prioritizing community resilience over extractive buyouts.</li>
              <li><strong>Child Poverty Impact Bonds:</strong> Outcomes-based financial instruments that direct private capital toward social interventions, paying returns strictly based on measured, verified reductions in child poverty.</li>
              <li><strong>Climate and Biodiversity Outcomes Bonds:</strong> Instruments that pay returns only when tangible ecosystem healing is scientifically verified, treating nature as a primary stakeholder.</li>
            </ul>
          </WPSubSection>
        </WPSection>

        <WPSection id="endowment" title="A New Standard for Endowment Returns">
          <p>Traditional endowments often target high nominal returns by heavily weighting illiquid venture capital and leveraged buyouts&mdash;strategies that frequently rely on extraction and the externalization of social costs.</p>
          <p>The Upstream Endowment operates on a new thesis: <em>systemic risk is massively underpriced.</em> Climate disaster, social polarization, and supply chain collapse are not externalities; they are fundamental financial risks.</p>
          <p>By investing exclusively in regenerative structures&mdash;evergreen funds, outcomes-based bonds, and patient SME financing&mdash;we demonstrate that structurally safe, ethical capital deployment generates resilient, sustainable yield over a generational horizon. We reject the false dichotomy that doing good requires losing money. By pricing in true systemic risk, we prove that regeneration is the most prudent long-term investment strategy.</p>
        </WPSection>

        <WPSection id="conclusion" title="Conclusion: Beyond Fragmented Thought">
          <p>As David Bohm warned, we cannot solve our systemic crises using the same fragmented thought that created them. The traditional ecosystem of think tanks and financial institutions is endlessly rearranging the deck chairs on a sinking ship. They debate the mechanics of an engine that is fundamentally destroying the planet.</p>
          <p>The Upstream Institute exists to build an entirely new engine.</p>
          <p>By rooting the role of finance and economy in quantum philosophy, by producing rigorous new research for policymakers and capitalists, and by physically building the financial products&mdash;from SME financing to child poverty bonds&mdash;that execute this vision, we bypass the limits of fragmented thought.</p>
          <p>We do not just analyze the system. We build the tools to replace it.</p>
          <p style={{ color: s.muted, fontStyle: 'italic' }}>
            From Finland, we invite the world to think upstream.
          </p>
        </WPSection>

        {/* Authors - at the END */}
        <WPSection id="authors" title="About the Authors">
          <WPAuthor name="Dr. Paavo Pylkk&auml;nen" role="Philosophical Director">
            Dr. Pylkk&auml;nen is a distinguished philosopher whose decades of work on physicist David Bohm&rsquo;s theories of quantum physics and consciousness provide the ontological foundation for the Upstream Institute. He has extensively researched the concept of the &ldquo;Implicate Order&rdquo;&mdash;the view that reality is an unbroken, flowing whole rather than a collection of isolated parts. At the Institute, Dr. Pylkk&auml;nen directs intellectual coherence, ensuring that all research, policy design, and capital deployment transcend the limitations of fragmented, mechanical thought.
          </WPAuthor>
          <WPAuthor name="Dr. Elina Pylkk&auml;nen" role="Social Policy Director">
            Dr. Pylkk&auml;nen is a distinguished economist currently serving as Under-Secretary of State at Finland&rsquo;s Ministry of Economic Affairs and Employment. She holds a PhD in Economics and has previously served as Director of the Labor Institute for Economic Research (LABORE), Senior Economist at the OECD in Paris, and Visiting Scholar at Stanford University. Dr. Pylkk&auml;nen brings unparalleled expertise in labor markets, taxation, and social policy design. She leads the Upstream Nordic Social Policy Research Lab, translating philosophical frameworks into rigorous, population-scale economic interventions.
          </WPAuthor>
          <WPAuthor name="Sagar Tandon" role="Impact Finance Director">
            Sagar Tandon is a Partner at Beyond Impact VC, investing in industrial biotech and climate-bio companies globally. He also advises the Society for Cell Agriculture APAC and supports several climate initiatives, including WePlanet.org and Atlan.fi, EIT, Good Food Institute, Big Ideas Ventures, Fashion For Good, and Rethinking Materials as a strategic advisor and mentor. A 2X Global Forum member, he promotes gender and climate-smart impact investing. Currently, he serves as an honorary advisory board member of EIT Community New European Bauhaus. In his investing career, he has led investments in more than 25+ startups and launched 3 funds from emerging markets - India and Southeast Asia to developed markets (Europe, the US, and East Asia). He has built and run an accelerator for aspiring female fund managers, supported by an Australian government-funded project, Frontier Lab Asia, and Gray Matters Capital. He writes a substack newsletter (https://firstfollowers.substack.com/) with more than 4,000 subscribers about venture capital, private markets, impact investing, venture studios, and more.
          </WPAuthor>
        </WPSection>

        {/* Footer */}
        <footer className="mt-24 pt-8" style={{ borderTop: `1px solid ${s.divider}` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{ color: s.text, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                The Upstream Institute
              </p>
              <p style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300 }}>
                Helsinki, Finland
              </p>
            </div>
            <a href="mailto:hello@upstreaminstitute.org"
              className="transition-colors duration-500"
              style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.03em' }}
              onMouseEnter={e => (e.currentTarget.style.color = s.text)}
              onMouseLeave={e => (e.currentTarget.style.color = s.faint)}
            >
              hello@upstreaminstitute.org
            </a>
          </div>
        </footer>
      </article>
    </div>
  )
}

/* ───────────────────────── WHITE PAPER COMPONENTS ───────────────────────── */

function WPSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 md:mb-20" style={{ scrollMarginTop: '5rem' }}>
      <h2 className="mb-8" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.35 }}>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function WPSubSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3" style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.45 }}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function WPAuthor({ name, role, children }: { name: string; role: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="mb-8 last:mb-0">
      <p style={{ fontWeight: 600, lineHeight: 1.5 }}>
        <span dangerouslySetInnerHTML={{ __html: name }} />
        <span className="ml-2" style={{ color: s.faint, fontSize: '0.875em' }}>| {role}</span>
      </p>
      <p className="mt-2">{children}</p>
    </div>
  )
}

function WPPremise({ number, label, oldPremise, newPremise }: {
  number: string; label: string; oldPremise: string; newPremise: string
}) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="my-8 pl-5" style={{ borderLeft: `1px solid ${s.divider}` }}>
      <p className="mb-3" style={{ fontWeight: 600, lineHeight: 1.4 }}>
        <span className="mr-2" style={{ color: s.faint }}>{number}.</span>
        {label}
      </p>
      <p className="mb-2" style={{ color: s.muted, fontSize: '0.9em' }}>
        <span className="uppercase" style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 600 }}>The Old Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: oldPremise }} />
      </p>
      <p>
        <span className="uppercase" style={{ color: s.muted, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 600 }}>The Upstream Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: newPremise }} />
      </p>
    </div>
  )
}

/* ───────────────────────── ROUTER ───────────────────────── */

export default function Home() {
  const [view, setView] = useState<'landing' | 'white-paper'>(() =>
    typeof window !== 'undefined' && window.location.hash === '#white-paper' ? 'white-paper' : 'landing'
  )

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (hash === '#white-paper') {
        setView('white-paper')
      } else {
        setView('landing')
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <ThemeProvider>
      <ThemeToggle />
      {view === 'white-paper' ? <WhitePaper /> : <ComingSoon />}
    </ThemeProvider>
  )
}