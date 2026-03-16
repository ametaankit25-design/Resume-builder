import React, { useState } from "react";
import { MoveRight, Sparkles, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Bottom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => navigate("/formPage"), 800); // Reduced from 1500ms to 800ms
  };

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 px-4"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: darkMode ? '#0f172a' : 'linear-gradient(135deg, var(--primary-bg) 0%, var(--accent-light) 100%)',
      }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .loader-ring { width: 56px; height: 56px; border: 4px solid ${darkMode ? '#334155' : 'var(--primary-light)'}; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
        .pulse-text { animation: pulse 1.5s ease-in-out infinite; }
        .icon-float { animation: float 2s ease-in-out infinite; }
      `}</style>
      <div className="icon-float mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`, boxShadow: '0 8px 32px rgba(37,99,235,0.35)' }}>
        <FileText size={26} color="white" />
      </div>
      <div className="loader-ring mb-5" />
      <p className="pulse-text font-bold text-xs sm:text-sm tracking-widest uppercase text-center"
        style={{ color: 'var(--primary)' }}>Building Your Resume...</p>
      <p className="text-xs mt-2" style={{ color: darkMode ? '#64748b' : '#9ca3af' }}>Hang tight, almost there!</p>
    </div>
  );

  return (
    <div className="relative overflow-hidden transition-colors duration-300" style={{
      background: darkMode
        ? '#0f172a'
        : 'linear-gradient(135deg, var(--primary-bg) 0%, var(--accent-light) 50%, #f5f3ff 100%)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 8px 32px rgba(37,99,235,0.35); }
          50%      { box-shadow: 0 12px 48px rgba(37,99,235,0.55); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        .cta-btn {
          background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
          border: none; border-radius: 999px;
          padding: 14px 28px;
          color: white; font-weight: 700; font-size: 14px;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.3s ease;
          animation: pulse-glow 2.5s ease-in-out infinite;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.2px;
        }
        @media (min-width: 640px) { .cta-btn { padding: 16px 40px; font-size: 16px; gap: 10px; } }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); }

        .step-pill {
          display: flex; align-items: center; gap: 8px;
          border-radius: 14px; padding: 12px 14px;
          border: 1.5px solid ${darkMode ? '#334155' : 'var(--primary-light)'};
          box-shadow: 0 4px 16px ${darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(37,99,235,0.08)'};
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: ${darkMode ? '#1e293b' : 'white'};
        }
        @media (min-width: 640px) { .step-pill { gap: 10px; border-radius: 16px; padding: 14px 18px; } }
        .step-pill:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(37,99,235,0.14)'}; }

        .cta-section { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Decorative blobs */}
      <div className="hidden sm:block" style={{
        position:'absolute', top:-60, left:-60, width:300, height:300,
        borderRadius:'50%', background:`radial-gradient(circle, ${darkMode ? 'rgba(37,99,235,0.04)' : 'rgba(37,99,235,0.08)'} 0%, transparent 70%)`,
        pointerEvents:'none',
      }}/>
      <div className="hidden sm:block" style={{
        position:'absolute', bottom:-40, right:-40, width:240, height:240,
        borderRadius:'50%', background:`radial-gradient(circle, ${darkMode ? 'rgba(124,58,237,0.04)' : 'rgba(124,58,237,0.08)'} 0%, transparent 70%)`,
        pointerEvents:'none',
      }}/>
      <div className="hidden md:block" style={{
        position:'absolute', top:30, right:'12%', width:60, height:60,
        borderRadius:'50%', border:`2px dashed ${darkMode ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.15)'}`,
        animation:'spin-slow 14s linear infinite', pointerEvents:'none',
      }}/>

      <div className="cta-section relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
            border: `1.5px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'var(--primary-light)'}`,
            boxShadow: `0 2px 8px ${darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(37,99,235,0.08)'}`,
          }}>
          <Sparkles size={14} color="var(--accent)" />
          <span style={{ fontSize:11, fontWeight:700, color:'var(--accent)', letterSpacing:0.5 }} className="sm:text-[12.5px]">
            START FOR FREE
          </span>
        </div>

        <h2 style={{ fontFamily:"'Playfair Display', serif", fontWeight:900, lineHeight:1.15, color: darkMode ? '#f1f5f9' : '#0f172a', marginBottom:16 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem]">
          Your Dream Job is One{' '}
          <span style={{
            background:`linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            Resume Away
          </span>
        </h2>

        <p className="text-sm sm:text-base mx-auto mb-8 sm:mb-10" style={{ color: darkMode ? '#94a3b8' : '#64748b', lineHeight:1.7, maxWidth:480 }}>
          Join thousands of professionals who landed their dream job using MyResume.io.
          It takes less than 5 minutes.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {[
            { icon: '📝', step: '01', title: 'Fill the Form', desc: 'Enter your details' },
            { icon: '🎨', step: '02', title: 'Pick a Template', desc: 'Choose your style' },
            { icon: '📥', step: '03', title: 'Download PDF', desc: 'Ready in seconds' },
          ].map((s, i) => (
            <div key={i} className="step-pill" style={{ minWidth: 140 }}>
              <div style={{
                width:34, height:34, borderRadius:10, flexShrink:0,
                background: darkMode
                  ? 'rgba(255,255,255,0.05)'
                  : `linear-gradient(135deg, var(--primary-bg), var(--accent-light))`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
              }}>{s.icon}</div>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:9, fontWeight:700, color: darkMode ? '#64748b' : '#94a3b8', letterSpacing:1, textTransform:'uppercase' }} className="sm:text-[10px]">Step {s.step}</div>
                <div style={{ fontSize:12.5, fontWeight:700, color: darkMode ? '#e2e8f0' : '#1e293b' }} className="sm:text-[13.5px]">{s.title}</div>
                <div style={{ fontSize:10.5, color: darkMode ? '#64748b' : '#94a3b8' }} className="sm:text-[11.5px]">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="cta-btn" onClick={handleNavigate}>
          <Sparkles size={16} className="sm:hidden" />
          <Sparkles size={18} className="hidden sm:block" />
          Let's Create My Resume
          <MoveRight size={16} className="sm:hidden" />
          <MoveRight size={18} className="hidden sm:block" />
        </button>

        <p className="mt-3 sm:mt-4 text-[11px] sm:text-[12.5px]" style={{ color: darkMode ? '#475569' : '#94a3b8' }}>
          ✓ Free &nbsp;·&nbsp; ✓ No account needed &nbsp;·&nbsp; ✓ Download instantly
        </p>
      </div>
    </div>
  );
};

export default Bottom;