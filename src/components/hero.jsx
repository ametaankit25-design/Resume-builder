import React from 'react'
import { useTheme } from '../ThemeContext'

const Hero = () => {
  const { darkMode } = useTheme()

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative overflow-hidden min-h-[60vh] sm:min-h-[75vh] md:min-h-[88vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 transition-colors duration-300"
      data-dark={darkMode}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        [data-dark="false"] { background: var(--primary-bg); }
        [data-dark="true"]  { background: #0f172a; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(37,99,235,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .hero-sub { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hero-badges { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .hero-card { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s both, float 5s ease-in-out 1.5s infinite; }
        .hero-card-b { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.55s both, floatB 6s ease-in-out 1.8s infinite; }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--gradient-from) 40%, var(--gradient-to) 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        .stat-card {
          backdrop-filter: blur(12px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.18);
        }

        .blob-1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%);
          width: 280px; height: 280px; top: -60px; left: -60px;
        }
        .blob-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
          width: 250px; height: 250px; bottom: -50px; right: -50px;
        }
        .blob-3 {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          width: 180px; height: 180px; top: 40%; right: 5%;
          animation: float 7s ease-in-out 1s infinite;
        }
        [data-dark="true"] .blob-1 { background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%); }
        [data-dark="true"] .blob-2 { background: radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%); }
        [data-dark="true"] .blob-3 { background: radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%); }
        @media (min-width: 640px) {
          .blob-1 { width: 400px; height: 400px; top: -80px; left: -100px; }
          .blob-2 { width: 320px; height: 320px; bottom: -60px; right: -60px; }
        }
        @media (min-width: 1024px) {
          .blob-1 { width: 520px; height: 520px; top: -100px; left: -120px; }
          .blob-2 { width: 400px; height: 400px; bottom: -80px; right: -80px; }
          .blob-3 { width: 280px; height: 280px; }
        }
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        [data-dark="true"] .grid-bg {
          background-image:
            linear-gradient(rgba(37,99,235,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.02) 1px, transparent 1px);
        }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1.5px solid var(--primary-light);
          border-radius: 999px; padding: 5px 14px;
          font-size: 11px; font-weight: 600; color: var(--primary);
          box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        }
        [data-dark="false"] .tag-pill { background: white; }
        [data-dark="true"] .tag-pill { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: var(--primary-mid); }
        @media (min-width: 640px) { .tag-pill { font-size: 12.5px; } }

        .tag-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--primary);
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>

      <div className="blob-1" />
      <div className="blob-2" />
      <div className="blob-3" />
      <div className="grid-bg" />

      {/* Spinning decorative ring - hidden on small screens */}
      <div className="hidden md:block" style={{
        position: 'absolute', top: '12%', right: '8%',
        width: 80, height: 80, borderRadius: '50%',
        border: `2px dashed ${darkMode ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.2)'}`,
        animation: 'spin-slow 18s linear infinite', pointerEvents: 'none',
      }} />
      <div className="hidden md:block" style={{
        position: 'absolute', bottom: '18%', left: '6%',
        width: 48, height: 48, borderRadius: '50%',
        border: `2px dashed ${darkMode ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.2)'}`,
        animation: 'spin-slow 12s linear infinite reverse', pointerEvents: 'none',
      }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-2">
        <div className="hero-badges mb-4 sm:mb-6">
          <span className="tag-pill">
            <span className="tag-dot" />
            <span className="hidden sm:inline">Free Resume Builder — No sign-up required to start</span>
            <span className="sm:hidden">Free Resume Builder — No sign-up needed</span>
          </span>
        </div>

        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-1 sm:mb-2"
          style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>
          Build Your
        </h1>
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-1 sm:mb-2">
          <span className="gradient-text">Professional</span>
        </h1>
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6"
          style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>
          Resume Effortlessly
        </h1>

        <p className="hero-sub text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8 md:mb-10 px-2"
          style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
          Create a standout resume in minutes. Choose from beautiful templates,
          fill in your details, and download a polished PDF — ready for your dream job.
        </p>

        <div className="hero-badges flex items-center gap-3 sm:gap-4 flex-wrap justify-center mb-6 sm:mb-8 md:mb-10">
          {[
            { value: '10K+', label: 'Resumes Created' },
            { value: '15+', label: 'Templates' },
            { value: '4.9★', label: 'User Rating' },
          ].map((s, i) => (
            <div key={i} className="stat-card rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3 text-center shadow-sm"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.04)' : 'white',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'var(--primary-light)'}`,
              }}>
              <div style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)' }}
                className="text-lg sm:text-xl md:text-2xl font-black">{s.value}</div>
              <div className="text-[10px] sm:text-xs font-medium mt-0.5"
                style={{ color: darkMode ? '#64748b' : '#9ca3af' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-badges flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {['✦ ATS Friendly', '✦ PDF Export', '✦ Multiple Templates', '✦ Instant Preview'].map((f, i) => (
            <span key={i} style={{
              background: darkMode
                ? 'rgba(255,255,255,0.04)'
                : `linear-gradient(135deg, var(--primary-bg), var(--accent-light))`,
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'var(--accent-border)'}`,
              borderRadius: 999, padding: '3px 10px',
              fontSize: 11, fontWeight: 600,
              color: darkMode ? 'var(--primary-mid)' : 'var(--accent-text)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Floating cards - hidden on mobile */}
      <div className="hero-card hidden lg:block" style={{
        position: 'absolute', right: '4%', top: '20%',
        background: darkMode ? '#1e293b' : 'white', borderRadius: 16,
        padding: '14px 18px', width: 160,
        boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(37,99,235,0.13)',
        border: `1px solid ${darkMode ? '#334155' : '#dbeafe'}`,
      }}>
        <div style={{ width: '60%', height: 8, borderRadius: 4, background: darkMode ? 'var(--primary)' : 'var(--primary-mid)', marginBottom: 6, opacity: darkMode ? 0.5 : 1 }} />
        <div style={{ width: '90%', height: 5, borderRadius: 4, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 4 }} />
        <div style={{ width: '75%', height: 5, borderRadius: 4, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 4 }} />
        <div style={{ width: '50%', height: 5, borderRadius: 4, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 10 }} />
        <div style={{ width: '40%', height: 7, borderRadius: 4, background: darkMode ? 'var(--primary)' : 'var(--primary-mid)', marginBottom: 6, opacity: darkMode ? 0.5 : 1 }} />
        <div style={{ width: '85%', height: 4, borderRadius: 4, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 3 }} />
        <div style={{ width: '70%', height: 4, borderRadius: 4, background: darkMode ? '#334155' : 'var(--primary-bg)' }} />
        <div style={{
          position: 'absolute', top: -10, right: -10,
          background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`, color: 'white',
          borderRadius: '50%', width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
          boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
        }}>✓</div>
      </div>

      <div className="hero-card-b hidden lg:block" style={{
        position: 'absolute', left: '3%', bottom: '22%',
        background: darkMode ? '#1e293b' : 'white', borderRadius: 14,
        padding: '12px 16px', width: 140,
        boxShadow: darkMode ? '0 8px 28px rgba(0,0,0,0.3)' : '0 8px 28px rgba(124,58,237,0.12)',
        border: `1px solid ${darkMode ? '#334155' : '#e0e7ff'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))` }} />
          <div>
            <div style={{ width: 60, height: 6, borderRadius: 3, background: darkMode ? '#475569' : 'var(--accent-border)', marginBottom: 3 }} />
            <div style={{ width: 40, height: 4, borderRadius: 3, background: darkMode ? '#334155' : 'var(--accent-light)' }} />
          </div>
        </div>
        <div style={{ width: '100%', height: 4, borderRadius: 3, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 3 }} />
        <div style={{ width: '80%', height: 4, borderRadius: 3, background: darkMode ? '#334155' : 'var(--primary-bg)', marginBottom: 3 }} />
        <div style={{ width: '60%', height: 4, borderRadius: 3, background: darkMode ? '#334155' : 'var(--primary-bg)' }} />
      </div>

    </div>
  )
}

export default Hero