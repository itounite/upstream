'use client'

import { useEffect, useState, createContext, useContext } from 'react'

/* ───────────────────────── THEME ───────────────────────── */

const RED = '#B91C1C'
const RED_RGB = '185, 28, 28'

type Theme = 'dark' | 'light'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })

function useTheme() {
  return useContext(ThemeCtx)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('ui-theme') as Theme | null
    return stored || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('ui-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

/* Color helpers */
function t(theme: Theme) {
  const isDark = theme === 'dark'
  return {
    bg: isDark ? '#000000' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    red: RED,
    muted1: isDark ? `rgba(${RED_RGB}, 0.9)` : `rgba(${RED_RGB}, 0.85)`,
    muted2: isDark ? `rgba(${RED_RGB}, 0.65)` : `rgba(${RED_RGB}, 0.6)`,
    muted3: isDark ? `rgba(${RED_RGB}, 0.45)` : `rgba(${RED_RGB}, 0.45)`,
    muted4: isDark ? `rgba(${RED_RGB}, 0.3)` : `rgba(${RED_RGB}, 0.3)`,
    muted5: isDark ? `rgba(${RED_RGB}, 0.2)` : `rgba(${RED_RGB}, 0.2)`,
    divider: isDark ? `rgba(${RED_RGB}, 0.15)` : `rgba(${RED_RGB}, 0.12)`,
    navBg: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
    grainOpacity: isDark ? 0.02 : 0.015,
  }
}

/* ───────────────────────── TOGGLE BUTTON ───────────────────────── */

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const c = t(theme)

  return (
    <button
      onClick={toggle}
      className="fixed z-50 flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer"
      style={{
        bottom: '1.5rem',
        right: '1.5rem',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        border: `1px solid ${c.divider}`,
        background: c.bg,
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c.muted3}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          /* Sun icon */
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
          /* Moon icon */
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  )
}

/* ───────────────────────── GRAIN OVERLAY ───────────────────────── */

function Grain({ opacity }: { opacity: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        opacity,
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
  const c = t(theme)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative transition-colors duration-500"
      style={{ background: c.bg, color: c.text }}
    >
      <Grain opacity={c.grainOpacity} />

      <div className={`flex flex-col items-center transition-all duration-[2000ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="tracking-[0.35em] uppercase text-center select-none"
          style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)', fontWeight: 300, letterSpacing: '0.35em', lineHeight: 1.4 }}
        >
          Upstream<br />Institute
        </h1>

        <div className="w-12 my-8" style={{ height: '1px', background: c.divider }} />

        <p className="text-center max-w-xs"
          style={{ color: c.muted2, fontSize: 'clamp(0.7rem, 1.2vw, 0.8125rem)', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.7 }}
        >
          Reimagining capital stewardship<br />for intergenerational prosperity.
        </p>

        <div className="mt-10 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: c.muted1, animation: 'pulse 2.5s ease-in-out infinite' }}
          />
          <span className="uppercase"
            style={{ color: c.muted3, fontSize: '0.625rem', letterSpacing: '0.2em', fontWeight: 400 }}
          >
            Helsinki, 2026
          </span>
        </div>

        <a href="#white-paper"
          className="mt-8 transition-colors duration-700"
          style={{ color: c.muted4, fontSize: '0.6875rem', letterSpacing: '0.06em', fontWeight: 300 }}
          onMouseEnter={e => (e.currentTarget.style.color = c.muted2)}
          onMouseLeave={e => (e.currentTarget.style.color = c.muted4)}
        >
          hello@upstreaminstitute.org
        </a>

        <a href="#white-paper"
          className="mt-5 flex items-center gap-2 group transition-colors duration-700"
          style={{ color: c.muted5, fontSize: '0.625rem', letterSpacing: '0.15em', fontWeight: 300, textTransform: 'uppercase' }}
          onMouseEnter={e => { e.currentTarget.style.color = c.muted3 }}
          onMouseLeave={e => { e.currentTarget.style.color = c.muted5 }}
        >
          <span className="inline-block transition-colors duration-700" style={{ width: '1rem', height: '1px', background: c.muted5 }} />
          Read White Paper
        </a>
      </div>

      <div className="absolute bottom-6">
        <span style={{ color: c.muted5, fontSize: '0.5rem', letterSpacing: '0.15em', fontWeight: 300 }}>&reg;</span>
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

function WhitePaper() {
  const { theme } = useTheme()
  const [ready, setReady] = useState(false)
  const c = t(theme)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionProperty: 'opacity, background-color, color', background: c.bg, color: c.text }}
    >
      <Grain opacity={c.grainOpacity} />

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: c.navBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <a href="#"
          className="transition-colors duration-500"
          style={{ color: c.muted2, fontSize: '0.6875rem', letterSpacing: '0.2em', fontWeight: 300, textTransform: 'uppercase' }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = c.muted2)}
        >
          Upstream Institute
        </a>
        <a href="#"
          className="transition-colors duration-500"
          style={{ color: c.muted3, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 300 }}
          onMouseEnter={e => (e.currentTarget.style.color = c.muted1)}
          onMouseLeave={e => (e.currentTarget.style.color = c.muted3)}
        >
          Back
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p className="uppercase mb-8"
          style={{ color: c.muted3, fontSize: '0.625rem', letterSpacing: '0.3em', fontWeight: 400 }}
        >
          White Paper
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Thinking Upstream
        </h1>
        <p className="mt-5 max-w-lg mx-auto"
          style={{ color: c.muted2, fontSize: 'clamp(0.8125rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.65 }}
        >
          A New School of Thought for Finance, Policy, and Planetary Regeneration
        </p>
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          style={{ fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.6, color: c.muted3 }}
        >
          <span>Dr. Paavo Pylkk&auml;nen</span>
          <span style={{ color: c.muted5 }}>|</span>
          <span>Dr. Elina Pylkk&auml;nen</span>
          <span style={{ color: c.muted5 }}>|</span>
          <span>Sagar Tandon</span>
        </div>
        <p className="mt-3" style={{ color: c.muted4, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em' }}>
          Helsinki, Finland &middot; June 2026
        </p>
      </header>

      {/* ─── BODY ─── */}
      <article
        className="max-w-2xl mx-auto px-6 md:px-12 pb-32"
        style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', fontWeight: 300, lineHeight: 1.85, color: c.muted2 }}
      >
        <Section title="About the Authors">
          <AuthorBlock name="Dr. Paavo Pylkk&auml;nen" role="Philosophical Director">
            Dr. Pylkk&auml;nen is a distinguished philosopher whose decades of work on physicist David Bohm&rsquo;s theories of quantum physics and consciousness provide the ontological foundation for the Upstream Institute. He has extensively researched the concept of the &ldquo;Implicate Order&rdquo;&mdash;the view that reality is an unbroken, flowing whole rather than a collection of isolated parts. At the Institute, Dr. Pylkk&auml;nen directs intellectual coherence, ensuring that all research, policy design, and capital deployment transcend the limitations of fragmented, mechanical thought.
          </AuthorBlock>
          <AuthorBlock name="Dr. Elina Pylkk&auml;nen" role="Social Policy Director">
            Dr. Pylkk&auml;nen is a distinguished economist currently serving as Under-Secretary of State at Finland&rsquo;s Ministry of Economic Affairs and Employment. She holds a PhD in Economics and has previously served as Director of the Labor Institute for Economic Research (LABORE), Senior Economist at the OECD in Paris, and Visiting Scholar at Stanford University. Dr. Pylkk&auml;nen brings unparalleled expertise in labor markets, taxation, and social policy design. She leads the Upstream Nordic Social Policy Research Lab, translating philosophical frameworks into rigorous, population-scale economic interventions.
          </AuthorBlock>
          <AuthorBlock name="Sagar Tandon" role="Impact Finance Director">
            Mr. Tandon is a Partner at Beyond Impact VC and a veteran impact financier with deep experience launching funds and leading dozens of early-stage investments across climate and regenerative agriculture. He serves as an advisor to 2X Global (gender-smart investing) and Stanford GSB Corporate Innovation LEAD. At the Upstream Institute, Mr. Tandon leads the execution arm, acting as the bridge between abstract philosophical principles and the concrete design and deployment of regenerative financial products.
          </AuthorBlock>
        </Section>

        <Section title="Introduction: The Crisis of Thought">
          <p>The physicist and philosopher David Bohm argued that humanity&rsquo;s deepest crises are not primarily technical or political&mdash;they are crises of &ldquo;thought.&rdquo; He observed that thought is a system: fragments of the past that we project onto the present, mistakenly believing we are engaging directly with reality.</p>
          <p>Modern economics is a profound symptom of this crisis. It is built on a classical, Newtonian paradigm that treats the economy as a machine made of isolated parts&mdash;firms, consumers, resources&mdash;that can be optimized independently. This mechanical worldview has generated unprecedented technological advancement, but it has done so by treating social fragmentation and ecological degradation as acceptable externalities.</p>
          <p>To solve the systemic crises of the 21st century, we cannot simply optimize the old machine. We must change the nature of the thought that built it.</p>
          <p>The Upstream Institute exists to generate an entirely new school of thought. We are not merely a think tank producing papers, nor are we a traditional investment fund. We are an integrated ecosystem uniting deep quantum philosophy, population-scale policy research, and the real-world execution of capital. We exist to fundamentally reimagine the roles of the state, the financier, the individual, and nature.</p>
        </Section>

        <Section title="The Intellectual Landscape: Why Existing Institutions Fail">
          <p>The global landscape is saturated with think tanks, research institutes, and impact funds. Yet, none possess the philosophical foundation or the structural integration required to shift economic paradigms.</p>
          <SubSection title="The Orthodox Free-Market Tanks (e.g., The Hoover Institution, Cato Institute)">
            <p>These institutions operate firmly within the Newtonian paradigm. They view the economy as a mechanistic system of independent agents. Their policy prescriptions&mdash;deregulation, privatization, minimal state intervention&mdash;optimize for aggregate growth while treating ecological and social decay as the cost of doing business. They challenge the role of the state, but only to shrink it, never to reimagine its fundamental purpose in an entangled world.</p>
          </SubSection>
          <SubSection title="The Centrist Reform Tanks (e.g., The Brookings Institution)">
            <p>Centrist institutions attempt to patch the mechanical model. They advocate for moderate redistribution, human capital investment, and targeted regulations. However, they still operate entirely within the confines of neoclassical economics. They seek to make extraction more palatable, not to replace extraction with regeneration. Their research influences policy at the margins, but it leaves the foundational premises of modern capitalism untouched.</p>
          </SubSection>
          <SubSection title="The ESG and Impact Investment Consensus">
            <p>The financial sector has responded to systemic crises with &ldquo;ESG&rdquo; and &ldquo;impact investing.&rdquo; However, as Bohm would note, this is often fragmented thought in action. ESG largely involves applying a thin ethical veneer to the exact same extractive capital structures. Impact investing frequently accepts a false dichotomy: that doing good requires sacrificing financial return. Furthermore, they lack a rigorous philosophical arm; they deploy capital without challenging the legal and ontological frameworks that make extraction possible in the first place.</p>
          </SubSection>
          <SubSection title="The Upstream Differentiator">
            <p>The Upstream Institute is the first institution to fuse deep philosophy, rigorous policy research, and an executing endowment into a single entity. We do not write papers to be read; we write theories to be codified into financial products and state policy. We do not invest to generate alpha; we invest to prove that regeneration is the highest form of yield.</p>
          </SubSection>
        </Section>

        <Section title="Challenging the Fundamental Premises">
          <p>The Upstream Institute is built to systematically dismantle and rebuild the foundational roles of our modern economy. We challenge four basic premises:</p>
          <PremiseBlock number="1" label="The Role of the State"
            oldPremise="The state is either an intrusive regulator to be minimized, or a night-watchman protecting property rights."
            newPremise="The state is a Systemic Architect. Its role is not to correct market failures after the fact, but to design the legal, administrative, and infrastructural &ldquo;soil&rdquo; in which regenerative capital grows."
          />
          <PremiseBlock number="2" label="The Role of the Financier"
            oldPremise="The financier is a passive allocator of capital seeking risk-adjusted financial returns, detached from the real-world ripple effects of their allocations."
            newPremise="The financier is a Systemic Designer. Drawing on Bohm&rsquo;s concept of &ldquo;active information,&rdquo; we understand that money does not merely represent value&mdash;it shapes the material conditions of human life. Financiers must be structurally accountable for the social and ecological ripples of their capital."
          />
          <PremiseBlock number="3" label="The Role of People"
            oldPremise="People are &ldquo;human capital&rdquo; or &ldquo;consumers&rdquo;&mdash;isolated economic units to be optimized."
            newPremise="Drawing on the Japanese philosophy of Gapponism, people are entangled co-creators. Economic equality is not a luxury; it is a moral prerequisite. Without baseline security, individuals cannot participate in the co-creation of a thriving society."
          />
          <PremiseBlock number="4" label="The Role of Nature"
            oldPremise="Nature is an externality, a bottomless sink for waste, or a passive asset class to be priced via carbon offsets."
            newPremise="Nature is the foundational substrate of all capital. If nature degrades, capital degrades. Financial products must be structurally tethered to ecological regeneration, not abstract accounting tricks."
          />
        </Section>

        <Section title="How We Operate: Features and Functions">
          <p>To manifest this new school of thought, the Upstream Institute operates through three interconnected arms. This is not a loose coalition; it is a unified feedback loop where theory informs capital, and capital generates data that refines theory.</p>
          <SubSection title="Arm 1: The Upstream Think Tank (Tool Builders)">
            <p>Traditional think tanks produce opinion pieces and policy briefs. The Upstream Think Tank produces <em>tools</em>.</p>
            <ul>
              <li><strong>The &ldquo;Terms for Humanity&rdquo; Library:</strong> We curate a free, global repository of legal clauses, term sheets, and governance templates that legally embed stakeholder voice and ecological limits into investment agreements.</li>
              <li><strong>Humanized Finance Playbooks:</strong> Open-source architectural blueprints for Industrial Foundation 2.0, Serial Steward Models, and Impact-Aligned Executive Compensation.</li>
              <li><strong>Philosophical Translation:</strong> We translate complex quantum ontologies and ethical frameworks into rigorous, actionable doctrines for policymakers and capitalists.</li>
            </ul>
          </SubSection>
          <SubSection title="Arm 2: The Nordic Social Policy Research Lab (Evidence Generators)">
            <p>We do not speculate about what works; we prove it. Leveraging Finland&rsquo;s unique administrative infrastructure, the Lab treats the nation as a living laboratory.</p>
            <ul>
              <li><strong>Population-Scale Testing:</strong> We co-design interventions with the Finnish government&mdash;focusing on child poverty, homelessness, and social connection&mdash;and track the macroeconomic results across entire demographics over time.</li>
              <li><strong>Proving Entanglement:</strong> The Lab&rsquo;s primary function is to generate irrefutable data proving that social equity and economic dynamism are not opposed, but mathematically entangled.</li>
            </ul>
          </SubSection>
          <SubSection title="Arm 3: The Upstream Endowment (The Execution Arm)">
            <p>We do not just advocate for a new economy; we build it. The Endowment acts as an internal venture studio for financial products. We deploy permanent capital into structures that generate both financial yield and measurable healing.</p>
            <ul>
              <li><strong>SME Patient Capital Vehicles:</strong> Debt and equity hybrids that provide permanent capital to small and medium enterprises, prioritizing community resilience over extractive buyouts.</li>
              <li><strong>Child Poverty Impact Bonds:</strong> Outcomes-based financial instruments that direct private capital toward social interventions, paying returns strictly based on measured, verified reductions in child poverty.</li>
              <li><strong>Climate and Biodiversity Outcomes Bonds:</strong> Instruments that pay returns only when tangible ecosystem healing is scientifically verified, treating nature as a primary stakeholder.</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="A New Standard for Endowment Returns">
          <p>Traditional endowments often target high nominal returns by heavily weighting illiquid venture capital and leveraged buyouts&mdash;strategies that frequently rely on extraction and the externalization of social costs.</p>
          <p>The Upstream Endowment operates on a new thesis: <em>systemic risk is massively underpriced.</em> Climate disaster, social polarization, and supply chain collapse are not externalities; they are fundamental financial risks.</p>
          <p>By investing exclusively in regenerative structures&mdash;evergreen funds, outcomes-based bonds, and patient SME financing&mdash;we demonstrate that structurally safe, ethical capital deployment generates resilient, sustainable yield over a generational horizon. We reject the false dichotomy that doing good requires losing money. By pricing in true systemic risk, we prove that regeneration is the most prudent long-term investment strategy.</p>
        </Section>

        <Section title="Conclusion: Beyond Fragmented Thought">
          <p>As David Bohm warned, we cannot solve our systemic crises using the same fragmented thought that created them. The traditional ecosystem of think tanks and financial institutions is endlessly rearranging the deck chairs on a sinking ship. They debate the mechanics of an engine that is fundamentally destroying the planet.</p>
          <p>The Upstream Institute exists to build an entirely new engine.</p>
          <p>By rooting the role of finance and economy in quantum philosophy, by producing rigorous new research for policymakers and capitalists, and by physically building the financial products&mdash;from SME financing to child poverty bonds&mdash;that execute this vision, we bypass the limits of fragmented thought.</p>
          <p>We do not just analyze the system. We build the tools to replace it.</p>
          <p style={{ color: c.muted1, fontStyle: 'italic' }}>
            From Finland, we invite the world to think upstream.
          </p>
        </Section>

        {/* FOOTER */}
        <footer className="mt-24 pt-8" style={{ borderTop: `1px solid ${c.divider}` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{ color: c.muted2, fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.06em' }}>
                The Upstream Institute
              </p>
              <p style={{ color: c.muted4, fontSize: '0.6875rem', fontWeight: 300 }}>
                Helsinki, Finland
              </p>
            </div>
            <a href="mailto:hello@upstreaminstitute.org"
              className="transition-colors duration-500"
              style={{ color: c.muted4, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.03em' }}
              onMouseEnter={e => (e.currentTarget.style.color = c.muted2)}
              onMouseLeave={e => (e.currentTarget.style.color = c.muted4)}
            >
              hello@upstreaminstitute.org
            </a>
          </div>
        </footer>
      </article>
    </div>
  )
}

/* ───────────────────────── SUB-COMPONENTS ───────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const c = t(theme)
  return (
    <section className="mb-16 md:mb-20">
      <h2 className="mb-8" style={{
        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.35,
      }}>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const c = t(theme)
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3" style={{
        color: c.muted1, fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.45,
      }}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function AuthorBlock({ name, role, children }: { name: string; role: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const c = t(theme)
  return (
    <div className="mb-8 last:mb-0">
      <p style={{ color: c.text, fontWeight: 400, lineHeight: 1.5 }}>
        <span dangerouslySetInnerHTML={{ __html: name }} />
        <span className="ml-2" style={{ color: c.muted3, fontSize: '0.875em' }}>| {role}</span>
      </p>
      <p className="mt-2">{children}</p>
    </div>
  )
}

function PremiseBlock({ number, label, oldPremise, newPremise }: {
  number: string; label: string; oldPremise: string; newPremise: string
}) {
  const { theme } = useTheme()
  const c = t(theme)
  return (
    <div className="my-8 pl-5" style={{ borderLeft: `1px solid ${c.divider}` }}>
      <p className="mb-3" style={{ color: c.text, fontWeight: 400, lineHeight: 1.4 }}>
        <span className="mr-2" style={{ color: c.muted3 }}>{number}.</span>
        {label}
      </p>
      <p className="mb-2" style={{ color: c.muted3, fontSize: '0.9em' }}>
        <span className="uppercase" style={{ color: c.muted4, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 400 }}>The Old Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: oldPremise }} />
      </p>
      <p style={{ color: c.muted1 }}>
        <span className="uppercase" style={{ color: c.muted2, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 400 }}>The Upstream Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: newPremise }} />
      </p>
    </div>
  )
}

/* ───────────────────────── MAIN ROUTER ───────────────────────── */

export default function Home() {
  const [view, setView] = useState<'landing' | 'white-paper'>(() =>
    typeof window !== 'undefined' && window.location.hash === '#white-paper' ? 'white-paper' : 'landing'
  )

  useEffect(() => {
    const onHashChange = () => {
      setView(window.location.hash === '#white-paper' ? 'white-paper' : 'landing')
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