'use client'

import { useEffect, useState, useCallback } from 'react'

function ComingSoon() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative">
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      <div
        className={`flex flex-col items-center transition-all duration-[2000ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1
          className="text-white tracking-[0.35em] uppercase text-center select-none"
          style={{
            fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            lineHeight: 1.4,
          }}
        >
          Upstream
          <br />
          Institute
        </h1>

        <div className="w-12 bg-white/20 my-8" style={{ height: '1px' }} />

        <p
          className="text-white/40 text-center max-w-xs"
          style={{
            fontSize: 'clamp(0.7rem, 1.2vw, 0.8125rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            lineHeight: 1.7,
          }}
        >
          Reimagining capital stewardship
          <br />
          for intergenerational prosperity.
        </p>

        <div className="mt-10 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-white/60"
            style={{ animation: 'pulse 2.5s ease-in-out infinite' }}
          />
          <span
            className="text-white/30 uppercase"
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              fontWeight: 400,
            }}
          >
            Helsinki, 2026
          </span>
        </div>

        {/* White paper entry point */}
        <a
          href="#white-paper"
          className="mt-8 text-white/25 hover:text-white/60 transition-colors duration-700"
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.06em',
            fontWeight: 300,
          }}
        >
          hello@upstreaminstitute.org
        </a>

        <a
          href="#white-paper"
          className="mt-5 text-white/15 hover:text-white/40 transition-colors duration-700 flex items-center gap-2 group"
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.15em',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}
        >
          <span className="inline-block w-4 bg-white/15 group-hover:bg-white/30 transition-colors duration-700" style={{ height: '1px' }} />
          Read White Paper
        </a>
      </div>

      <div className="absolute bottom-6">
        <span
          className="text-white/10"
          style={{ fontSize: '0.5rem', letterSpacing: '0.15em', fontWeight: 300 }}
        >
          &reg;
        </span>
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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`min-h-screen bg-black text-white transition-opacity duration-700 ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <a
          href="#"
          className="text-white/60 hover:text-white transition-colors duration-500"
          style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', fontWeight: 300, textTransform: 'uppercase' }}
        >
          Upstream Institute
        </a>
        <a
          href="#"
          className="text-white/30 hover:text-white/70 transition-colors duration-500"
          style={{ fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 300 }}
        >
          Back
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p
          className="text-white/30 uppercase mb-8"
          style={{ fontSize: '0.625rem', letterSpacing: '0.3em', fontWeight: 400 }}
        >
          White Paper
        </p>
        <h1
          className="text-white"
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          Thinking Upstream
        </h1>
        <p
          className="text-white/40 mt-5 max-w-lg mx-auto"
          style={{
            fontSize: 'clamp(0.8125rem, 1.3vw, 1rem)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            lineHeight: 1.65,
          }}
        >
          A New School of Thought for Finance, Policy, and Planetary Regeneration
        </p>
        <div className="flex items-center justify-center gap-6 mt-10 text-white/25"
          style={{ fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.6 }}
        >
          <span>Dr. Paavo Pylkk&auml;nen</span>
          <span className="text-white/10">|</span>
          <span>Dr. Elina Pylkk&auml;nen</span>
          <span className="text-white/10">|</span>
          <span>Sagar Tandon</span>
        </div>
        <p
          className="text-white/20 mt-3"
          style={{ fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em' }}
        >
          Helsinki, Finland &middot; June 2026
        </p>
      </header>

      {/* ─── BODY ─── */}
      <article
        className="max-w-2xl mx-auto px-6 md:px-12 pb-32"
        style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.72)' }}
      >
        {/* ABOUT THE AUTHORS */}
        <Section title="About the Authors">
          <AuthorBlock
            name="Dr. Paavo Pylkk&auml;nen"
            role="Philosophical Director"
          >
            Dr. Pylkk&auml;nen is a distinguished philosopher whose decades of work on physicist David Bohm&rsquo;s theories of quantum physics and consciousness provide the ontological foundation for the Upstream Institute. He has extensively researched the concept of the &ldquo;Implicate Order&rdquo;&mdash;the view that reality is an unbroken, flowing whole rather than a collection of isolated parts. At the Institute, Dr. Pylkk&auml;nen directs intellectual coherence, ensuring that all research, policy design, and capital deployment transcend the limitations of fragmented, mechanical thought.
          </AuthorBlock>
          <AuthorBlock
            name="Dr. Elina Pylkk&auml;nen"
            role="Social Policy Director"
          >
            Dr. Pylkk&auml;nen is a distinguished economist currently serving as Under-Secretary of State at Finland&rsquo;s Ministry of Economic Affairs and Employment. She holds a PhD in Economics and has previously served as Director of the Labor Institute for Economic Research (LABORE), Senior Economist at the OECD in Paris, and Visiting Scholar at Stanford University. Dr. Pylkk&auml;nen brings unparalleled expertise in labor markets, taxation, and social policy design. She leads the Upstream Nordic Social Policy Research Lab, translating philosophical frameworks into rigorous, population-scale economic interventions.
          </AuthorBlock>
          <AuthorBlock
            name="Sagar Tandon"
            role="Impact Finance Director"
          >
            Mr. Tandon is a Partner at Beyond Impact VC and a veteran impact financier with deep experience launching funds and leading dozens of early-stage investments across climate and regenerative agriculture. He serves as an advisor to 2X Global (gender-smart investing) and Stanford GSB Corporate Innovation LEAD. At the Upstream Institute, Mr. Tandon leads the execution arm, acting as the bridge between abstract philosophical principles and the concrete design and deployment of regenerative financial products.
          </AuthorBlock>
        </Section>

        {/* INTRODUCTION */}
        <Section title="Introduction: The Crisis of Thought">
          <p>The physicist and philosopher David Bohm argued that humanity&rsquo;s deepest crises are not primarily technical or political&mdash;they are crises of &ldquo;thought.&rdquo; He observed that thought is a system: fragments of the past that we project onto the present, mistakenly believing we are engaging directly with reality.</p>
          <p>Modern economics is a profound symptom of this crisis. It is built on a classical, Newtonian paradigm that treats the economy as a machine made of isolated parts&mdash;firms, consumers, resources&mdash;that can be optimized independently. This mechanical worldview has generated unprecedented technological advancement, but it has done so by treating social fragmentation and ecological degradation as acceptable externalities.</p>
          <p>To solve the systemic crises of the 21st century, we cannot simply optimize the old machine. We must change the nature of the thought that built it.</p>
          <p>The Upstream Institute exists to generate an entirely new school of thought. We are not merely a think tank producing papers, nor are we a traditional investment fund. We are an integrated ecosystem uniting deep quantum philosophy, population-scale policy research, and the real-world execution of capital. We exist to fundamentally reimagine the roles of the state, the financier, the individual, and nature.</p>
        </Section>

        {/* THE INTELLECTUAL LANDSCAPE */}
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

        {/* CHALLENGING FUNDAMENTAL PREMISES */}
        <Section title="Challenging the Fundamental Premises">
          <p>The Upstream Institute is built to systematically dismantle and rebuild the foundational roles of our modern economy. We challenge four basic premises:</p>

          <PremiseBlock
            number="1"
            label="The Role of the State"
            oldPremise="The state is either an intrusive regulator to be minimized, or a night-watchman protecting property rights."
            newPremise="The state is a Systemic Architect. Its role is not to correct market failures after the fact, but to design the legal, administrative, and infrastructural &ldquo;soil&rdquo; in which regenerative capital grows."
          />
          <PremiseBlock
            number="2"
            label="The Role of the Financier"
            oldPremise="The financier is a passive allocator of capital seeking risk-adjusted financial returns, detached from the real-world ripple effects of their allocations."
            newPremise="The financier is a Systemic Designer. Drawing on Bohm&rsquo;s concept of &ldquo;active information,&rdquo; we understand that money does not merely represent value&mdash;it shapes the material conditions of human life. Financiers must be structurally accountable for the social and ecological ripples of their capital."
          />
          <PremiseBlock
            number="3"
            label="The Role of People"
            oldPremise="People are &ldquo;human capital&rdquo; or &ldquo;consumers&rdquo;&mdash;isolated economic units to be optimized."
            newPremise="Drawing on the Japanese philosophy of Gapponism, people are entangled co-creators. Economic equality is not a luxury; it is a moral prerequisite. Without baseline security, individuals cannot participate in the co-creation of a thriving society."
          />
          <PremiseBlock
            number="4"
            label="The Role of Nature"
            oldPremise="Nature is an externality, a bottomless sink for waste, or a passive asset class to be priced via carbon offsets."
            newPremise="Nature is the foundational substrate of all capital. If nature degrades, capital degrades. Financial products must be structurally tethered to ecological regeneration, not abstract accounting tricks."
          />
        </Section>

        {/* HOW WE OPERATE */}
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

        {/* A NEW STANDARD FOR ENDOWMENT RETURNS */}
        <Section title="A New Standard for Endowment Returns">
          <p>Traditional endowments often target high nominal returns by heavily weighting illiquid venture capital and leveraged buyouts&mdash;strategies that frequently rely on extraction and the externalization of social costs.</p>
          <p>The Upstream Endowment operates on a new thesis: <em>systemic risk is massively underpriced.</em> Climate disaster, social polarization, and supply chain collapse are not externalities; they are fundamental financial risks.</p>
          <p>By investing exclusively in regenerative structures&mdash;evergreen funds, outcomes-based bonds, and patient SME financing&mdash;we demonstrate that structurally safe, ethical capital deployment generates resilient, sustainable yield over a generational horizon. We reject the false dichotomy that doing good requires losing money. By pricing in true systemic risk, we prove that regeneration is the most prudent long-term investment strategy.</p>
        </Section>

        {/* CONCLUSION */}
        <Section title="Conclusion: Beyond Fragmented Thought">
          <p>As David Bohm warned, we cannot solve our systemic crises using the same fragmented thought that created them. The traditional ecosystem of think tanks and financial institutions is endlessly rearranging the deck chairs on a sinking ship. They debate the mechanics of an engine that is fundamentally destroying the planet.</p>
          <p>The Upstream Institute exists to build an entirely new engine.</p>
          <p>By rooting the role of finance and economy in quantum philosophy, by producing rigorous new research for policymakers and capitalists, and by physically building the financial products&mdash;from SME financing to child poverty bonds&mdash;that execute this vision, we bypass the limits of fragmented thought.</p>
          <p>We do not just analyze the system. We build the tools to replace it.</p>
          <p className="text-white/50" style={{ fontStyle: 'italic' }}>
            From Finland, we invite the world to think upstream.
          </p>
        </Section>

        {/* FOOTER */}
        <footer className="mt-24 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/40" style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.06em' }}>
                The Upstream Institute
              </p>
              <p className="text-white/20" style={{ fontSize: '0.6875rem', fontWeight: 300 }}>
                Helsinki, Finland
              </p>
            </div>
            <a
              href="mailto:hello@upstreaminstitute.org"
              className="text-white/25 hover:text-white/50 transition-colors duration-500"
              style={{ fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.03em' }}
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
  return (
    <section className="mb-16 md:mb-20">
      <h2
        className="text-white mb-8"
        style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
          fontWeight: 400,
          letterSpacing: '0.02em',
          lineHeight: 1.35,
        }}
      >
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3
        className="text-white/80 mb-3"
        style={{
          fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          lineHeight: 1.45,
        }}
      >
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function AuthorBlock({ name, role, children }: { name: string; role: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-white/90" style={{ fontWeight: 400, lineHeight: 1.5 }}>
        <span dangerouslySetInnerHTML={{ __html: name }} />
        <span className="text-white/30 ml-2" style={{ fontSize: '0.875em' }}>
          | {role}
        </span>
      </p>
      <p className="mt-2">{children}</p>
    </div>
  )
}

function PremiseBlock({ number, label, oldPremise, newPremise }: {
  number: string
  label: string
  oldPremise: string
  newPremise: string
}) {
  return (
    <div className="my-8 pl-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
      <p className="text-white/90 mb-3" style={{ fontWeight: 400, lineHeight: 1.4 }}>
        <span className="text-white/30 mr-2">{number}.</span>
        {label}
      </p>
      <p className="mb-2" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9em' }}>
        <span className="text-white/25 uppercase" style={{ fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 400 }}>The Old Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: oldPremise }} />
      </p>
      <p style={{ color: 'rgba(255,255,255,0.72)' }}>
        <span className="text-white/50 uppercase" style={{ fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 400 }}>The Upstream Premise: </span>
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

  if (view === 'white-paper') return <WhitePaper />
  return <ComingSoon />
}