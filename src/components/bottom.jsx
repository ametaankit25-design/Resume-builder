import React, { useState } from "react";
import { MoveRight, Sparkles, FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bottom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => navigate("/formPage"), 1500);
  };

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ fontFamily: "'DM Sans', sans-serif", background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .loader-ring {
          width: 56px; height: 56px;
          border: 4px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .pulse-text { animation: pulse 1.5s ease-in-out infinite; }
        .icon-float { animation: float 2s ease-in-out infinite; }
      `}</style>
      <div className="icon-float mb-6 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow: '0 8px 32px rgba(37,99,235,0.35)' }}>
        <FileText size={28} color="white" />
      </div>
      <div className="loader-ring mb-5" />
      <p className="pulse-text font-bold text-sm tracking-widest uppercase"
        style={{ color: '#2563eb' }}>Building Your Resume...</p>
      <p className="text-gray-400 text-xs mt-2">Hang tight, almost there!</p>
    </div>
  );

  return (
    <div className="relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #f5f3ff 100%)',
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
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .cta-btn {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none; border-radius: 999px;
          padding: 16px 40px;
          color: white; font-weight: 700; font-size: 16px;
          cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.3s ease;
          animation: pulse-glow 2.5s ease-in-out infinite;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.2px;
        }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); }

        .step-pill {
          display: flex; align-items: center; gap: 10px;
          background: white; border-radius: 16px;
          padding: 14px 18px;
          border: 1.5px solid #dbeafe;
          box-shadow: 0 4px 16px rgba(37,99,235,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .step-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.14);
        }

        .cta-section { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Decorative blobs */}
      <div style={{
        position:'absolute', top:-60, left:-60, width:300, height:300,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute', bottom:-40, right:-40, width:240, height:240,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents:'none',
      }}/>
      {/* Spinning ring */}
      <div style={{
        position:'absolute', top:30, right:'12%', width:60, height:60,
        borderRadius:'50%', border:'2px dashed rgba(37,99,235,0.15)',
        animation:'spin-slow 14s linear infinite', pointerEvents:'none',
      }}/>

      <div className="cta-section relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">

        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
          style={{ background:'white', border:'1.5px solid #dbeafe', boxShadow:'0 2px 8px rgba(37,99,235,0.08)' }}>
          <Sparkles size={14} color="#7c3aed" />
          <span style={{ fontSize:12.5, fontWeight:700, color:'#7c3aed', letterSpacing:0.5 }}>
            START FOR FREE
          </span>
        </div>

        {/* Heading */}
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, lineHeight:1.15, color:'#0f172a', marginBottom:16 }}>
          Your Dream Job is One{' '}
          <span style={{
            background:'linear-gradient(135deg,#2563eb,#7c3aed)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            Resume Away
          </span>
        </h2>

        <p style={{ color:'#64748b', fontSize:16, lineHeight:1.7, maxWidth:480, margin:'0 auto 40px' }}>
          Join thousands of professionals who landed their dream job using MyResume.io.
          It takes less than 5 minutes.
        </p>

        {/* How it works */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: '📝', step: '01', title: 'Fill the Form', desc: 'Enter your details' },
            { icon: '🎨', step: '02', title: 'Pick a Template', desc: 'Choose your style' },
            { icon: '📥', step: '03', title: 'Download PDF', desc: 'Ready in seconds' },
          ].map((s, i) => (
            <div key={i} className="step-pill" style={{ minWidth: 160 }}>
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background:'linear-gradient(135deg,#eff6ff,#e0e7ff)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:18,
              }}>{s.icon}</div>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', letterSpacing:1, textTransform:'uppercase' }}>Step {s.step}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#1e293b' }}>{s.title}</div>
                <div style={{ fontSize:11.5, color:'#94a3b8' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="cta-btn" onClick={handleNavigate}>
          <Sparkles size={18} />
          Let's Create My Resume
          <MoveRight size={18} />
        </button>

        <p style={{ marginTop:16, fontSize:12.5, color:'#94a3b8' }}>
          ✓ Free &nbsp;·&nbsp; ✓ No account needed &nbsp;·&nbsp; ✓ Download instantly
        </p>
      </div>
    </div>
  );
};

export default Bottom;