'use client'

import { useEffect, useState } from 'react'

export default function Home() {
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
        {/* Institute name */}
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

        {/* Divider */}
        <div
          className="w-12 bg-white/20 my-8"
          style={{ height: '1px' }}
        />

        {/* Tagline */}
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

        {/* Status */}
        <div
          className="mt-10 flex items-center gap-2"
          style={{ animationDelay: '800ms' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-white/60"
            style={{
              animation: 'pulse 2.5s ease-in-out infinite',
            }}
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

        {/* Contact */}
        <a
          href="mailto:hello@upstreaminstitute.org"
          className="mt-8 text-white/25 hover:text-white/60 transition-colors duration-700"
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.06em',
            fontWeight: 300,
          }}
        >
          hello@upstreaminstitute.org
        </a>
      </div>

      {/* Bottom register mark */}
      <div className="absolute bottom-6">
        <span
          className="text-white/10"
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            fontWeight: 300,
          }}
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