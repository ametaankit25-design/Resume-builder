import React, { useEffect, useRef } from 'react'

const Hero = () => {
  const badgeRef = useRef(null)

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative overflow-hidden bg-blue-50 min-h-[88vh] flex flex-col items-center justify-center px-4 py-20"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(37,99,235,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .hero-sub {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .hero-badges {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }
        .hero-card {
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s both, float 5s ease-in-out 1.5s infinite;
        }
        .hero-card-b {
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.55s both, floatB 6s ease-in-out 1.8s infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #7c3aed 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        .shimmer-badge {
          background: linear-gradient(90deg, #dbeafe 0%, #eff6ff 40%, #dbeafe 60%, #dbeafe 100%);
          background-size: 400px 100%;
          animation: shimmer 2.5s infinite linear;
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
          width: 520px; height: 520px; top: -100px; left: -120px;
          animation: float 8s ease-in-out infinite;
        }
        .blob-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
          width: 400px; height: 400px; bottom: -80px; right: -80px;
          animation: floatB 10s ease-in-out infinite;
        }
        .blob-3 {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          width: 280px; height: 280px; top: 40%; right: 5%;
          animation: float 7s ease-in-out 1s infinite;
        }
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: white; border: 1.5px solid #dbeafe;
          border-radius: 999px; padding: 5px 14px;
          font-size: 12.5px; font-weight: 600; color: #2563eb;
          box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        }
        .tag-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #2563eb;
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background layers */}
      <div className="blob-1" />
      <div className="blob-2" />
      <div className="blob-3" />
      <div className="grid-bg" />

      {/* Spinning decorative ring */}
      <div style={{
        position: 'absolute', top: '12%', right: '8%',
        width: 80, height: 80, borderRadius: '50%',
        border: '2px dashed rgba(37,99,235,0.2)',
        animation: 'spin-slow 18s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '18%', left: '6%',
        width: 48, height: 48, borderRadius: '50%',
        border: '2px dashed rgba(124,58,237,0.2)',
        animation: 'spin-slow 12s linear infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

        {/* Top badge */}
        <div className="hero-badges mb-6">
          <span className="tag-pill">
            <span className="tag-dot" />
            Free Resume Builder — No sign-up required to start
          </span>
        </div>

        {/* Main heading */}
        <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight mb-2 text-gray-900">
          Build Your
        </h1>
        <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight mb-2">
          <span className="gradient-text">Professional</span>
        </h1>
        <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-900">
          Resume Effortlessly
        </h1>

        {/* Subtext */}
        <p className="hero-sub text-gray-500 text-lg leading-relaxed max-w-xl mb-10">
          Create a standout resume in minutes. Choose from beautiful templates,
          fill in your details, and download a polished PDF — ready for your dream job.
        </p>

        {/* Stats row */}
        <div className="hero-badges flex items-center gap-4 flex-wrap justify-center mb-10">
          {[
            { value: '10K+', label: 'Resumes Created' },
            { value: '15+', label: 'Templates' },
            { value: '4.9★', label: 'User Rating' },
          ].map((s, i) => (
            <div key={i} className="stat-card bg-white border border-blue-100 rounded-2xl px-5 py-3 text-center shadow-sm shadow-blue-100">
              <div style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-black text-blue-600">{s.value}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature chips */}
        <div className="hero-badges flex flex-wrap gap-2 justify-center">
          {['✦ ATS Friendly', '✦ PDF Export', '✦ Multiple Templates', '✦ Instant Preview'].map((f, i) => (
            <span key={i} style={{
              background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
              border: '1px solid #c7d2fe',
              borderRadius: 999, padding: '4px 14px',
              fontSize: 12, fontWeight: 600, color: '#4338ca',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Floating resume card decorations */}
      <div className="hero-card" style={{
        position: 'absolute', right: '4%', top: '20%',
        background: 'white', borderRadius: 16,
        padding: '14px 18px', width: 160,
        boxShadow: '0 8px 32px rgba(37,99,235,0.13)',
        border: '1px solid #dbeafe',
      }}>
        <div style={{ width: '60%', height: 8, borderRadius: 4, background: '#bfdbfe', marginBottom: 6 }} />
        <div style={{ width: '90%', height: 5, borderRadius: 4, background: '#eff6ff', marginBottom: 4 }} />
        <div style={{ width: '75%', height: 5, borderRadius: 4, background: '#eff6ff', marginBottom: 4 }} />
        <div style={{ width: '50%', height: 5, borderRadius: 4, background: '#eff6ff', marginBottom: 10 }} />
        <div style={{ width: '40%', height: 7, borderRadius: 4, background: '#bfdbfe', marginBottom: 6 }} />
        <div style={{ width: '85%', height: 4, borderRadius: 4, background: '#eff6ff', marginBottom: 3 }} />
        <div style={{ width: '70%', height: 4, borderRadius: 4, background: '#eff6ff' }} />
        <div style={{
          position: 'absolute', top: -10, right: -10,
          background: '#2563eb', color: 'white',
          borderRadius: '50%', width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
          boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
        }}>✓</div>
      </div>

      <div className="hero-card-b" style={{
        position: 'absolute', left: '3%', bottom: '22%',
        background: 'white', borderRadius: 14,
        padding: '12px 16px', width: 140,
        boxShadow: '0 8px 28px rgba(124,58,237,0.12)',
        border: '1px solid #e0e7ff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }} />
          <div>
            <div style={{ width: 60, height: 6, borderRadius: 3, background: '#c7d2fe', marginBottom: 3 }} />
            <div style={{ width: 40, height: 4, borderRadius: 3, background: '#e0e7ff' }} />
          </div>
        </div>
        <div style={{ width: '100%', height: 4, borderRadius: 3, background: '#eff6ff', marginBottom: 3 }} />
        <div style={{ width: '80%', height: 4, borderRadius: 3, background: '#eff6ff', marginBottom: 3 }} />
        <div style={{ width: '60%', height: 4, borderRadius: 3, background: '#eff6ff' }} />
      </div>

    </div>
  )
}

export default Hero