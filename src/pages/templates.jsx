import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useTheme } from "../ThemeContext";

const LazyThumbnail = ({ component, formData, skills }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        rootMargin: "300px",
        threshold: 0.01 
      }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const Component = component;
  
  return (
    <div ref={ref} style={{ width: '100%', minHeight: '400px' }}>
      {isVisible ? (
        <Component formData={formData} skills={skills} />
      ) : (
        <div style={{ 
          width: '100%', 
          minHeight: '400px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#f8faff',
        }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid #dbeafe',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   THEME TOKENS
───────────────────────────────────────────────────────────────────────────── */
const B = {
  blue: "#2563eb",
  blueDark: "#1d4ed8",
  blueLight: "#dbeafe",
  blueMid: "#93c5fd",
  sky: "#e0f0ff",
  white: "#ffffff",
  offWhite: "#f8faff",
  slate: "#64748b",
  dark: "#1e293b",
  text: "#334155",
  border: "#e2e8f0",
};

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=Poppins:wght@600;700&family=Raleway:wght@300;400;600;700;800&family=Merriweather:wght@300;400;700&family=Roboto+Slab:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600;700&family=Nunito:wght@400;600;700;800&family=Josefin+Sans:wght@300;400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@300;400;600;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&family=Bitter:wght@300;400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@400;600;700;800&display=swap');

    @keyframes spin       { to { transform:rotate(360deg); } }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn     { from{opacity:0;} to{opacity:1;} }
    @keyframes slideIn    { from{opacity:0;transform:translateX(20px);} to{opacity:1;transform:translateX(0);} }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 6px 24px rgba(37,99,235,0.35);} 50%{box-shadow:0 10px 36px rgba(37,99,235,0.55);} }
    @keyframes gradShift  { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
    @keyframes spin-slow  { to{transform:rotate(360deg);} }
    @keyframes float      { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.05);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }
    .dark ::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.05);
    }

    /* Scrollable Templates Container */
    .templates-scroll-container {
      position: relative;
    }
    
    .templates-scroll-container::-webkit-scrollbar {
      width: 6px;
    }
    
    .templates-scroll-container::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .templates-scroll-container::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
      border-radius: 10px;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 1024px) {
      .templates-main-container {
        flex-direction: column !important;
        height: auto !important;
        gap: 16px !important;
        padding: 12px !important;
      }

      .templates-left-panel {
        flex: 1 !important;
        max-width: 100% !important;
      }

      .templates-scroll-container {
        max-height: 60vh !important;
      }

      .templates-right-panel {
        display: none !important;
      }

      .tmpl-card {
        border-radius: 12px !important;
      }

      .thumbnail-wrapper {
        height: 200px !important;
      }
    }

    @media (max-width: 640px) {
      .templates-scroll-container {
        max-height: 50vh !important;
        padding-right: 4px !important;
      }

      .thumbnail-wrapper {
        height: 180px !important;
      }

      .section-label {
        font-size: 9px !important;
      }

      h1 {
        font-size: 20px !important;
      }

      p {
        font-size: 12px !important;
      }
    }

    /* Thumbnail Wrapper - ensures proper scaling */
    .thumbnail-wrapper {
      position: relative;
      overflow: hidden;
      background: #ffffff;
    }
    
    .thumbnail-inner {
      position: relative;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .tmpl-card {
      cursor: pointer;
      border-radius: 16px;
      transition: all 0.25s ease;
      border: 2px solid transparent;
      overflow: hidden;
      position: relative;
    }
    .tmpl-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(37,99,235,0.18) !important;
    }
    .tmpl-card.active {
      border-color: var(--accent);
      box-shadow: 0 8px 32px rgba(99,102,241,0.30) !important;
    }

    .dl-btn {
      cursor:pointer; border:none; outline:none;
      font-family:'DM Sans',sans-serif;
      transition:all 0.25s ease;
      background: linear-gradient(135deg,var(--gradient-from),var(--gradient-to));
      background-size: 200% 200%;
      animation: gradShift 4s ease infinite;
    }
    .dl-btn:hover:not(:disabled) {
      transform:translateY(-2px);
      box-shadow:0 10px 32px rgba(37,99,235,0.50) !important;
    }
    .dl-btn:disabled { opacity:0.7; cursor:not-allowed; }

    .spinner {
      display:inline-block; width:15px; height:15px;
      border:2.5px solid rgba(255,255,255,0.3);
      border-top-color:#fff; border-radius:50%;
      animation:spin 0.7s linear infinite; vertical-align:middle;
    }

    .section-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
  `}</style>
);

/* ─── PDF libs loader ─── */
let _libsLoaded = false;
const loadPdfLibs = () => new Promise((resolve, reject) => {
  if (_libsLoaded) return resolve();
  const load = (src) => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
  load("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
    .then(() => load("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"))
    .then(() => { _libsLoaded = true; resolve(); })
    .catch(reject);
});

/* ═══════════════════════════════════════════════════════════════════════════
   TEMPLATES (50+)
═══════════════════════════════════════════════════════════════════════════ */

/* 1 ── Classic Professional */
const Template1 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 32px rgba(37,99,235,0.10)", border: `1px solid ${B.border}` }}>
    <div style={{ background: B.blue, padding: "32px 40px 28px" }}>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: "#fff", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 12, color: B.blueMid, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ background: B.blueLight, padding: "11px 40px", display: "flex", gap: 22, flexWrap: "wrap", borderBottom: `1px solid ${B.border}` }}>
      {[formData.email, formData.phone, formData.location, formData.website].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: B.blue, fontWeight: 500 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding: "28px 40px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 8, paddingBottom: 6, borderBottom: `2px solid ${B.blueLight}` }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${B.blueLight}` }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "4px 14px", background: B.blueLight, color: B.blueDark, borderRadius: 4, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 2 ── Sidebar Split */
const Template2 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 32px rgba(37,99,235,0.12)", minHeight: 460 }}>
    <div style={{ width: 210, background: B.blue, padding: "36px 24px", display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: B.blueMid, textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
        {[formData.email, formData.phone, formData.location, formData.website].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.82)", marginBottom: 7, wordBreak: "break-all" }}>{v}</div>
        ))}
      </div>
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: B.blueMid, textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginBottom: 6, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: B.blueMid, flexShrink: 0 }} />{s}
          </div>
        ))}
      </div>}
    </div>
    <div style={{ flex: 1, background: B.white, padding: "36px 32px" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, color: B.dark }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 12, color: B.blue, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      {formData.summary && <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <div style={{ width: 32, height: 2, background: B.blue, marginBottom: 12 }} />
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.85, color: B.text }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

/* 3 ── Modern Serif */
const Template3 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", padding: "48px 52px", boxSizing: "border-box", boxShadow: "0 2px 24px rgba(37,99,235,0.08)", border: `1px solid ${B.border}` }}>
    <div style={{ textAlign: "center", marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${B.border}` }}>
      <h1 style={{ margin: 0, fontSize: 38, fontWeight: 700, fontFamily: "'Playfair Display',serif", color: B.dark, letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: B.blue, fontWeight: 500 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: B.slate }}>
            {i > 0 && <span style={{ margin: "0 10px", color: B.border }}>|</span>}{v}
          </span>
        ))}
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 44px" }}>
      <div>
        {formData.summary && <div style={{ marginBottom: 22 }}>
          <h2 style={{ margin: "0 0 10px", fontSize: 10, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase" }}>About</h2>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.85, color: B.text }}>{formData.summary}</p>
        </div>}
      </div>
      {skills?.length > 0 && <div>
        <h2 style={{ margin: "0 0 10px", fontSize: 10, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase" }}>Skills</h2>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 12.5, color: B.text, padding: "7px 0", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {s}<span style={{ width: 16, height: 2, background: B.blue, display: "inline-block" }} />
          </div>
        ))}
      </div>}
    </div>
  </div>
);

/* 4 ── Bold Banner */
const Template4 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 32px rgba(37,99,235,0.10)", overflow: "hidden", border: `1px solid ${B.border}` }}>
    <div style={{ background: `linear-gradient(135deg,${B.blue} 0%,#1e40af 100%)`, padding: "40px 44px 36px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", right: 30, bottom: -60, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <h1 style={{ margin: 0, fontSize: 40, fontWeight: 800, color: "#fff", fontFamily: "'Syne',sans-serif", letterSpacing: -1.5, lineHeight: 1 }}>{formData.fullName || "YOUR NAME"}</h1>
      <div style={{ marginTop: 10, fontSize: 12, color: B.blueMid, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 20 }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: B.sky, border: `1px solid ${B.blueMid}`, color: B.blueDark, borderRadius: 4, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 5 ── Timeline Stripe */
const Template5 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", display: "flex", boxShadow: "0 4px 32px rgba(37,99,235,0.10)", border: `1px solid ${B.border}` }}>
    <div style={{ width: 6, background: `linear-gradient(to bottom,${B.blue},${B.blueMid})`, flexShrink: 0 }} />
    <div style={{ flex: 1, padding: "40px 44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: B.dark, letterSpacing: -0.8 }}>{formData.fullName || "Your Name"}</h1>
          <div style={{ marginTop: 5, fontSize: 12, color: B.blue, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <div key={i} style={{ fontSize: 11.5, color: B.slate, marginBottom: 4 }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 1, background: B.border, marginBottom: 22 }} />
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: B.blue }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase" }}>Summary</div>
        </div>
        <p style={{ margin: "0 0 0 18px", fontSize: 13, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: B.blue }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase" }}>Skills</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginLeft: 18 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: B.blueLight, color: B.blueDark, borderRadius: 20, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 6 ── Card Grid */
const Template6 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.sky, fontFamily: "'DM Sans',sans-serif", padding: "36px 32px", boxSizing: "border-box", boxShadow: "0 4px 32px rgba(37,99,235,0.10)" }}>
    <div style={{ background: B.white, borderRadius: 12, padding: "24px 28px", marginBottom: 14, border: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: B.dark }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 4, fontSize: 11, color: B.blue, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ width: 52, height: 52, borderRadius: 10, background: B.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
      {[["📧", formData.email], ["📱", formData.phone], ["📍", formData.location]].filter(([, v]) => v).map(([icon, v], i) => (
        <div key={i} style={{ background: B.white, borderRadius: 8, padding: "12px 14px", border: `1px solid ${B.border}` }}>
          <div style={{ fontSize: 10, color: B.slate, marginBottom: 4 }}>{icon}</div>
          <div style={{ fontSize: 11.5, color: B.text, fontWeight: 500 }}>{v}</div>
        </div>
      ))}
    </div>
    {formData.summary && <div style={{ background: B.white, borderRadius: 8, padding: "18px 22px", marginBottom: 14, border: `1px solid ${B.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div style={{ background: B.white, borderRadius: 8, padding: "18px 22px", border: `1px solid ${B.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: B.blueLight, color: B.blueDark, borderRadius: 6, fontWeight: 500 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 7 ── Two-Tone Split */
const Template7 = ({ formData, skills }) => (
  <div style={{ width: 680, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 32px rgba(37,99,235,0.14)", overflow: "hidden", border: `1px solid ${B.border}` }}>
    <div style={{ background: "#0f172a", padding: "40px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#fff", letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 7, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: B.blueMid, fontWeight: 500 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 18, display: "flex", gap: 22, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ background: B.white, padding: "32px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 3, height: 16, background: B.blue, borderRadius: 2 }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase" }}>Profile</div>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 3, height: 16, background: B.blue, borderRadius: 2 }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase" }}>Skills</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: B.offWhite, border: `1px solid ${B.border}`, color: B.text, borderRadius: 4, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 8 ── Minimalist Line */
const Template8 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", padding: "52px 56px", boxSizing: "border-box", boxShadow: "0 2px 20px rgba(37,99,235,0.07)", border: `1px solid ${B.border}` }}>
    <div style={{ borderBottom: `3px solid ${B.blue}`, paddingBottom: 20, marginBottom: 24 }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: B.dark, letterSpacing: -0.8 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: B.blue, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</span>
        <span style={{ fontSize: 11.5, color: B.slate }}>{[formData.email, formData.phone].filter(Boolean).join("  ·  ")}</span>
      </div>
    </div>
    {formData.location && <div style={{ fontSize: 12, color: B.slate, marginBottom: 22 }}>{formData.location}{formData.website && ` · ${formData.website}`}</div>}
    {formData.summary && <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase", marginBottom: 10 }}>Summary</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: B.text }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase", marginBottom: 12 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {skills.map((s, i) => (
          <span key={i} style={{ fontSize: 12.5, color: B.text }}>
            {s}{i < skills.length - 1 && <span style={{ color: B.blueMid, margin: "0 10px" }}>·</span>}
          </span>
        ))}
      </div>
    </div>}
  </div>
);

/* 9 ── Accent Corner */
const Template9 = ({ formData, skills }) => (
  <div style={{ width: 680, background: B.white, fontFamily: "'DM Sans',sans-serif", position: "relative", boxShadow: "0 4px 32px rgba(37,99,235,0.10)", border: `1px solid ${B.border}`, overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, background: B.blue, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
    <div style={{ position: "absolute", top: 16, right: 20, fontSize: 30, fontWeight: 800, color: "rgba(255,255,255,0.25)", fontFamily: "'Syne',sans-serif" }}>{(formData.fullName || "?")[0]}</div>
    <div style={{ padding: "44px 48px" }}>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: B.dark, letterSpacing: -0.8, maxWidth: 440 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 12, color: B.blue, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 11.5, color: B.slate, padding: "3px 10px", background: B.sky, borderRadius: 3 }}>{v}</span>
        ))}
      </div>
      <div style={{ width: "100%", height: 1, background: B.border, margin: "22px 0" }} />
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 8 }}>About Me</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: B.blue, textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: B.blueLight, color: B.blueDark, borderRadius: 20, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 10 ── Elegant Lora */
const Template10 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fefefe", fontFamily: "'DM Sans',sans-serif", padding: "52px 56px", boxSizing: "border-box", boxShadow: "0 2px 24px rgba(37,99,235,0.08)", border: `1px solid ${B.border}` }}>
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <div style={{ fontSize: 9, letterSpacing: 6, color: B.blue, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Résumé</div>
      <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, fontFamily: "'Lora',serif", color: B.dark, letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 13, color: B.slate, fontStyle: "italic", fontFamily: "'Lora',serif" }}>{formData.role || "Your Role"}</div>
      <div style={{ width: 60, height: 2, background: B.blue, margin: "14px auto 0" }} />
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 26, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: B.slate }}>{v}</span>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "0 40px" }}>
      <div>
        {formData.summary && <div style={{ marginBottom: 22 }}>
          <h2 style={{ margin: "0 0 10px", fontSize: 10, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase" }}>Profile</h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: B.text, fontFamily: "'Lora',serif" }}>{formData.summary}</p>
        </div>}
      </div>
      {skills?.length > 0 && <div>
        <h2 style={{ margin: "0 0 12px", fontSize: 10, fontWeight: 700, letterSpacing: 4, color: B.blue, textTransform: "uppercase" }}>Skills</h2>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 12.5, color: B.text, padding: "6px 0", borderBottom: `1px solid ${B.border}` }}>{s}</div>
        ))}
      </div>}
    </div>
  </div>
);

/* 11 ── Forest Green */
const Template11 = ({ formData, skills }) => (
  <div style={{ width: 680, fontFamily: "'Raleway',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
    <div style={{ background: "#14532d", padding: "38px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#86efac", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 16, display: "flex", gap: 18, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ background: "#f0fdf4", padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#15803d", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 2, background: "#16a34a" }} /> Summary
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#15803d", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 2, background: "#16a34a" }} /> Skills
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#dcfce7", color: "#14532d", borderRadius: 4, fontWeight: 600, border: "1px solid #86efac" }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 12 ── Burgundy Executive */
const Template12 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Merriweather',serif", padding: "50px 56px", boxSizing: "border-box", border: "1px solid #e7e0e0", boxShadow: "0 2px 20px rgba(120,0,30,0.07)" }}>
    <div style={{ borderLeft: "4px solid #9f1239", paddingLeft: 20, marginBottom: 28 }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "#1c1917", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#9f1239", fontWeight: 300, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ display: "flex", gap: 22, marginBottom: 28, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 11.5, color: "#78716c", fontFamily: "'Source Sans 3',sans-serif" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#9f1239", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Source Sans 3',sans-serif" }}>Professional Summary</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 2, color: "#44403c" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#9f1239", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Source Sans 3',sans-serif" }}>Core Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
        {skills.map((s, i) => (
          <span key={i} style={{ fontSize: 12.5, color: "#44403c", fontFamily: "'Source Sans 3',sans-serif" }}>
            {s}{i < skills.length - 1 && <span style={{ color: "#d4b4be", margin: "0 12px" }}>◆</span>}
          </span>
        ))}
      </div>
    </div>}
  </div>
);

/* 13 ── Teal Minimal */
const Template13 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#f0fdfa", fontFamily: "'Work+Sans',sans-serif", boxShadow: "0 4px 28px rgba(13,148,136,0.12)", overflow: "hidden" }}>
    <div style={{ background: "#0f766e", padding: "36px 44px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 11, color: "#5eead4", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
    </div>
    <div style={{ background: "#ccfbf1", padding: "12px 44px", display: "flex", gap: 20, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#0f766e", fontWeight: 500 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding: "26px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0f766e", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0f766e", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#ccfbf1", color: "#0f766e", borderRadius: 20, fontWeight: 600, border: "1px solid #5eead4" }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 14 ── Tech Dark */
const Template14 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#0d1117", fontFamily: "'Space Mono',monospace", boxShadow: "0 4px 40px rgba(0,0,0,0.5)", overflow: "hidden" }}>
    <div style={{ padding: "36px 44px", borderBottom: "1px solid #21262d" }}>
      <div style={{ fontSize: 10, color: "#58a6ff", marginBottom: 8, letterSpacing: 2 }}>{"// resume.json"}</div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#e6edf3", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#7ee787", letterSpacing: 2 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", gap: 18, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 11, color: "#8b949e" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, color: "#58a6ff", marginBottom: 10, letterSpacing: 2 }}>{"/* about */"}</div>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.9, color: "#c9d1d9" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, color: "#58a6ff", marginBottom: 10, letterSpacing: 2 }}>{"/* skills */"}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", background: "#161b22", color: "#7ee787", border: "1px solid #21262d", borderRadius: 4, fontWeight: 700 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 15 ── Rose Gold Luxury */
const Template15 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff5f0", fontFamily: "'Cormorant+Garamond',serif", padding: "52px 56px", boxSizing: "border-box", boxShadow: "0 4px 32px rgba(194,100,80,0.10)", border: "1px solid #fde8e0" }}>
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 9, letterSpacing: 8, color: "#c26450", textTransform: "uppercase", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Curriculum Vitae</div>
      <h1 style={{ margin: 0, fontSize: 44, fontWeight: 600, color: "#1c1917", letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 14, color: "#c26450", fontStyle: "italic" }}>{formData.role || "Your Role"}</div>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to right,transparent,#c26450,transparent)", margin: "16px auto" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#78716c", fontFamily: "'DM Sans',sans-serif" }}>{v}</span>
        ))}
      </div>
    </div>
    {formData.summary && <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#c26450", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>Profile</div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 2, color: "#44403c" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#c26450", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Expertise</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 13, padding: "5px 16px", background: "#fff", color: "#c26450", border: "1px solid #fca5a5", borderRadius: 3, fontStyle: "italic" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 16 ── Purple Creative */
const Template16 = ({ formData, skills }) => (
  <div style={{ width: 680, fontFamily: "'Nunito',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(88,28,135,0.14)" }}>
    <div style={{ background: "linear-gradient(135deg,#581c87 0%,#7c3aed 100%)", padding: "40px 44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#fff" }}>{formData.fullName || "Your Name"}</h1>
          <div style={{ marginTop: 6, fontSize: 11, color: "#d8b4fe", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
        </div>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff", fontWeight: 800 }}>
          {(formData.fullName || "?")[0]}
        </div>
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 20 }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ background: "#faf5ff", padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#ede9fe", color: "#581c87", borderRadius: 20, fontWeight: 700 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 17 ── Orange Impact */
const Template17 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Montserrat',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(234,88,12,0.12)", border: "1px solid #fed7aa" }}>
    <div style={{ background: "#ea580c", padding: "0 0 0 10px", display: "flex" }}>
      <div style={{ width: 6, background: "#c2410c", flexShrink: 0 }} />
      <div style={{ flex: 1, padding: "36px 40px" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 6, fontSize: 11, color: "#fed7aa", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      </div>
    </div>
    <div style={{ background: "#fff7ed", padding: "12px 44px 12px 56px", display: "flex", gap: 22, flexWrap: "wrap", borderBottom: "1px solid #fed7aa" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#c2410c", fontWeight: 500 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding: "26px 44px 26px 56px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#ea580c", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <div style={{ width: 32, height: 3, background: "#ea580c", marginBottom: 12, borderRadius: 2 }} />
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#ea580c", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ width: 32, height: 3, background: "#ea580c", marginBottom: 12, borderRadius: 2 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#fff7ed", color: "#ea580c", border: "1px solid #fdba74", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 18 ── Slate Academic */
const Template18 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'PT Serif',serif", padding: "56px 60px", boxSizing: "border-box", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <h1 style={{ margin: 0, fontSize: 42, fontWeight: 700, color: "#111827", letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 10, fontSize: 13, color: "#475569", fontStyle: "italic" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Source Sans 3',sans-serif" }}>
            {i > 0 && <span style={{ margin: "0 12px" }}>—</span>}{v}
          </span>
        ))}
      </div>
    </div>
    <div style={{ borderTop: "1.5px double #d1d5db", borderBottom: "1.5px double #d1d5db", padding: "4px 0", marginBottom: 28 }} />
    {formData.summary && <div style={{ marginBottom: 26 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#1f2937", fontFamily: "'PT Serif',serif" }}>Profile</h2>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 2, color: "#374151" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <h2 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#1f2937" }}>Skills & Expertise</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
        {skills.map((s, i) => (
          <span key={i} style={{ fontSize: 13, color: "#374151", fontFamily: "'Source Sans 3',sans-serif" }}>
            {s}{i < skills.length - 1 && <span style={{ margin: "0 10px", color: "#9ca3af" }}>·</span>}
          </span>
        ))}
      </div>
    </div>}
  </div>
);

/* 19 ── Indigo Sidebar */
const Template19 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Josefin+Sans',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(55,48,163,0.14)", minHeight: 440 }}>
    <div style={{ width: 220, background: "#312e81", padding: "36px 22px", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ width: 72, height: 72, borderRadius: 16, background: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#e0e7ff", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#a5b4fc", textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 7, wordBreak: "break-all" }}>{v}</div>
        ))}
      </div>
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#a5b4fc", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11, color: "#e0e7ff", marginBottom: 7, padding: "4px 0", borderBottom: "1px solid rgba(165,180,252,0.2)" }}>{s}</div>
        ))}
      </div>}
    </div>
    <div style={{ flex: 1, background: "#eef2ff", padding: "36px 30px" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#1e1b4b", letterSpacing: 1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#4338ca", fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ width: "100%", height: 2, background: "linear-gradient(to right,#4338ca,transparent)", margin: "18px 0" }} />
      {formData.summary && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#4338ca", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.85, color: "#374151" }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

/* 20 ── Gold Classic */
const Template20 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#1c1400", fontFamily: "'Raleway',sans-serif", padding: "48px 52px", boxSizing: "border-box", boxShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to right,transparent,#d4af37,transparent)", margin: "0 auto 16px" }} />
      <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#d4af37", letterSpacing: 2, textTransform: "uppercase" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 11, color: "rgba(212,175,55,0.6)", letterSpacing: 5, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to right,transparent,#d4af37,transparent)", margin: "16px auto 0" }} />
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 24, borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#d4af37", textTransform: "uppercase", marginBottom: 10 }}>Summary</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.7)" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#d4af37", textTransform: "uppercase", marginBottom: 12 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 3, fontWeight: 600, letterSpacing: 0.5 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 21 ── Newspaper Editorial */
const Template21 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fffef5", fontFamily: "'Libre+Baskerville',serif", padding: "40px 48px", boxSizing: "border-box", border: "2px solid #1c1917", boxShadow: "4px 4px 0 #1c1917" }}>
    <div style={{ borderBottom: "3px double #1c1917", paddingBottom: 16, marginBottom: 20 }}>
      <div style={{ fontSize: 9, letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", color: "#78716c", marginBottom: 10, textAlign: "center" }}>Curriculum Vitae</div>
      <h1 style={{ margin: 0, fontSize: 44, fontWeight: 700, color: "#1c1917", textAlign: "center", letterSpacing: -1, lineHeight: 1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "#78716c", fontFamily: "'DM Sans',sans-serif", fontStyle: "italic" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 11.5, color: "#44403c", fontFamily: "'DM Sans',sans-serif" }}>
          {i > 0 && <span style={{ margin: "0 10px", color: "#d6d3d1" }}>|</span>}{v}
        </span>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "0 32px" }}>
      {formData.summary && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", color: "#78716c", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 2, color: "#1c1917" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", color: "#78716c", marginBottom: 10 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 12.5, color: "#1c1917", padding: "5px 0", borderBottom: "1px solid #e7e5e4" }}>{s}</div>
        ))}
      </div>}
    </div>
  </div>
);

/* 22 ── Sky Blue Airy */
const Template22 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#f0f9ff", fontFamily: "'Karla',sans-serif", padding: "44px 48px", boxSizing: "border-box", boxShadow: "0 2px 24px rgba(14,165,233,0.10)", border: "1px solid #bae6fd" }}>
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 28 }}>
      <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg,#0284c7,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff", fontWeight: 800, flexShrink: 0 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0c4a6e" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 12, color: "#0284c7", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
        <div style={{ marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: 12, color: "#0369a1" }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
    <div style={{ height: 1, background: "linear-gradient(to right,#0284c7,transparent)", marginBottom: 24 }} />
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0284c7", textTransform: "uppercase", marginBottom: 8 }}>About</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#0c4a6e" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0284c7", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#e0f2fe", color: "#0284c7", borderRadius: 20, fontWeight: 700, border: "1px solid #7dd3fc" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 23 ── Brutalist Bold */
const Template23 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Syne',sans-serif", border: "3px solid #000", boxShadow: "6px 6px 0 #000" }}>
    <div style={{ background: "#000", padding: "36px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: -2, lineHeight: 0.9 }}>{(formData.fullName || "YOUR NAME").toUpperCase()}</h1>
      <div style={{ marginTop: 10, fontSize: 13, color: "#fbbf24", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ padding: "16px 44px", background: "#fbbf24", display: "flex", gap: 20, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#000", fontWeight: 700 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: "#000", textTransform: "uppercase", marginBottom: 10, borderBottom: "3px solid #000", paddingBottom: 6 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: "#1c1917" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: "#000", textTransform: "uppercase", marginBottom: 12, borderBottom: "3px solid #000", paddingBottom: 6 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#000", color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 24 ── Pastel Soft */
const Template24 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fdf2f8", fontFamily: "'Nunito',sans-serif", padding: "44px 48px", boxSizing: "border-box", boxShadow: "0 4px 32px rgba(219,39,119,0.08)", border: "1px solid #fce7f3" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#831843" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 12, color: "#db2777", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#ec4899,#f472b6)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", fontWeight: 800 }}>
        {(formData.fullName || "?")[0]}
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#9d174d", background: "#fce7f3", padding: "3px 10px", borderRadius: 20 }}>{v}</span>
      ))}
    </div>
    <div style={{ height: 2, background: "linear-gradient(to right,#ec4899,#f9a8d4,transparent)", marginBottom: 22 }} />
    {formData.summary && <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#db2777", textTransform: "uppercase", marginBottom: 8 }}>About Me</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#4a044e" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#db2777", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#fce7f3", color: "#831843", borderRadius: 20, fontWeight: 700, border: "1px solid #f9a8d4" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 25 ── Navy & Cream */
const Template25 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Bitter',serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(30,27,75,0.14)", minHeight: 420 }}>
    <div style={{ width: 230, background: "#1e1b4b", padding: "40px 24px 40px 28px" }}>
      <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#e0e7ff", lineHeight: 1.25 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ fontSize: 10, color: "#818cf8", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 22 }}>{formData.role || "Your Role"}</div>
      <div style={{ width: 30, height: 2, background: "#818cf8", marginBottom: 20 }} />
      <div style={{ fontSize: 8, letterSpacing: 4, color: "#818cf8", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Contact</div>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <div key={i} style={{ fontSize: 11, color: "rgba(224,231,255,0.75)", marginBottom: 7, lineHeight: 1.5, wordBreak: "break-all", fontFamily: "'DM Sans',sans-serif" }}>{v}</div>
      ))}
      {skills?.length > 0 && <>
        <div style={{ width: 30, height: 2, background: "#818cf8", margin: "20px 0 16px" }} />
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#818cf8", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11.5, color: "#e0e7ff", padding: "5px 0", borderBottom: "1px solid rgba(129,140,248,0.2)", fontFamily: "'DM Sans',sans-serif" }}>{s}</div>
        ))}
      </>}
    </div>
    <div style={{ flex: 1, background: "#fffbeb", padding: "40px 32px" }}>
      <div style={{ width: 32, height: 3, background: "#1e1b4b", marginBottom: 14 }} />
      {formData.summary && <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#1e1b4b", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: "#44403c" }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

/* 26 ── Mint Fresh */
const Template26 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Work+Sans',sans-serif", overflow: "hidden", boxShadow: "0 4px 28px rgba(5,150,105,0.10)", border: "1px solid #d1fae5" }}>
    <div style={{ background: "linear-gradient(135deg,#059669 0%,#10b981 100%)", padding: "36px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 11, color: "#a7f3d0", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#059669", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <div style={{ width: 28, height: 2, background: "#10b981", marginBottom: 12 }} />
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#059669", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#ecfdf5", color: "#059669", border: "1px solid #6ee7b7", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 27 ── Swiss Grid */
const Template27 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Raleway',sans-serif", padding: "0", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.10)", border: "1px solid #e5e7eb" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ background: "#e5e7eb", padding: "36px 32px" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 6, fontSize: 10, color: "#6b7280", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ background: "#111827", padding: "36px 32px" }}>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 11.5, color: "#d1d5db", marginBottom: 6 }}>{v}</div>
        ))}
      </div>
    </div>
    <div style={{ padding: "28px 32px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#374151", textTransform: "uppercase", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #e5e7eb" }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#4b5563" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#374151", textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e5e7eb" }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#f3f4f6", color: "#111827", border: "1px solid #d1d5db", borderRadius: 3, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 28 ── Retro Typewriter */
const Template28 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#faf9f0", fontFamily: "'Space Mono',monospace", padding: "48px 52px", boxSizing: "border-box", border: "2px solid #a8a29e", boxShadow: "inset 0 0 0 6px #faf9f0, inset 0 0 0 8px #a8a29e" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#1c1917", letterSpacing: 2 }}>{(formData.fullName || "Your Name").toUpperCase()}</h1>
      <div style={{ marginTop: 8, fontSize: 10, color: "#78716c", letterSpacing: 4 }}>{(formData.role || "Your Role").toUpperCase()}</div>
      <div style={{ borderTop: "1px solid #a8a29e", borderBottom: "1px solid #a8a29e", margin: "14px 0 0", padding: "8px 0" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap" }}>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: 10, color: "#57534e" }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
    {formData.summary && <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: "#78716c", textTransform: "uppercase", marginBottom: 10 }}>[ Profile ]</div>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 2, color: "#292524" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, letterSpacing: 4, color: "#78716c", textTransform: "uppercase", marginBottom: 10 }}>[ Skills ]</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {skills.map((s, i) => (
          <span key={i} style={{ fontSize: 11, color: "#292524" }}>
            {s}{i < skills.length - 1 && <span style={{ margin: "0 8px", color: "#a8a29e" }}>//</span>}
          </span>
        ))}
      </div>
    </div>}
  </div>
);

/* 29 ── Gradient Mesh */
const Template29 = ({ formData, skills }) => (
  <div style={{ width: 680, fontFamily: "'Poppins',sans-serif", overflow: "hidden", boxShadow: "0 8px 40px rgba(124,58,237,0.20)" }}>
    <div style={{ background: "linear-gradient(135deg,#7c3aed 0%,#db2777 50%,#ea580c 100%)", padding: "44px 48px" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.15)", padding: "4px 14px", borderRadius: 20 }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ background: "#18181b", padding: "28px 48px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#d4d4d8" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 30 ── Amber Warm */
const Template30 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fffbeb", fontFamily: "'Karla',sans-serif", padding: "48px 52px", boxSizing: "border-box", border: "1px solid #fde68a", boxShadow: "0 2px 24px rgba(245,158,11,0.10)" }}>
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 28 }}>
      <div style={{ width: 68, height: 68, borderRadius: 16, background: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", fontWeight: 800, flexShrink: 0 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#78350f" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 4, fontSize: 11, color: "#d97706", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#92400e", background: "#fef3c7", padding: "4px 12px", borderRadius: 20, fontWeight: 500, border: "1px solid #fde68a" }}>{v}</span>
      ))}
    </div>
    <div style={{ height: 2, background: "linear-gradient(to right,#d97706,#fcd34d,transparent)", marginBottom: 22 }} />
    {formData.summary && <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#b45309", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#44403c" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#b45309", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 31 ── Charcoal Modern */
const Template31 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#27272a", fontFamily: "'Montserrat',sans-serif", padding: "44px 48px", boxSizing: "border-box", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#f4f4f5", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#71717a", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ display: "flex", gap: 18, marginBottom: 26, flexWrap: "wrap", paddingBottom: 24, borderBottom: "1px solid #3f3f46" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#a1a1aa" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#71717a", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#d4d4d8" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#71717a", textTransform: "uppercase", marginBottom: 12 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#3f3f46", color: "#e4e4e7", borderRadius: 4, fontWeight: 600, border: "1px solid #52525b" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 32 ── Cyan Neon */
const Template32 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#0c0c14", fontFamily: "'DM Sans',sans-serif", overflow: "hidden", boxShadow: "0 0 60px rgba(0,255,255,0.08)" }}>
    <div style={{ borderLeft: "3px solid #00e5ff", padding: "36px 44px 36px 40px" }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#e0f7fa", letterSpacing: -0.3 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#00e5ff", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 11.5, color: "rgba(224,247,250,0.5)" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "0 44px 36px 43px", borderLeft: "3px solid rgba(0,229,255,0.2)" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#00e5ff", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "rgba(224,247,250,0.7)" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#00e5ff", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(0,229,255,0.07)", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.25)", borderRadius: 4, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 33 ── Monochrome Print */
const Template33 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Roboto+Slab',serif", padding: "52px 56px", boxSizing: "border-box", border: "1px solid #000" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "4px solid #000", paddingBottom: 18, marginBottom: 22 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#000", letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 11, color: "#444", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        {[formData.email, formData.phone].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 11.5, color: "#444", marginBottom: 3, fontFamily: "'DM Sans',sans-serif" }}>{v}</div>
        ))}
      </div>
    </div>
    {formData.location && <div style={{ fontSize: 12, color: "#666", marginBottom: 22, fontFamily: "'DM Sans',sans-serif" }}>{formData.location}</div>}
    {formData.summary && <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#000", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>Summary</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 2, color: "#333" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#000", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "4px 14px", border: "1px solid #000", color: "#000", borderRadius: 0, fontFamily: "'DM Sans',sans-serif" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 34 ── Crimson Italic */
const Template34 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Crimson+Text',serif", padding: "52px 56px", boxSizing: "border-box", border: "1px solid #e5e7eb", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ margin: 0, fontSize: 46, fontWeight: 600, color: "#111827", fontStyle: "italic", letterSpacing: -1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 13, color: "#dc2626", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 16, display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans',sans-serif" }}>{v}</span>
        ))}
      </div>
      <div style={{ width: "100%", height: 1, background: "linear-gradient(to right,#dc2626,transparent)", marginTop: 18 }} />
    </div>
    {formData.summary && <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#dc2626", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9, color: "#374151", fontStyle: "italic" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#dc2626", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 14, color: "#374151", fontStyle: "italic" }}>
          {s}{i < skills.length - 1 && <span style={{ margin: "0 10px", color: "#dc2626", fontStyle: "normal" }}>·</span>}
        </span>)}
      </div>
    </div>}
  </div>
);

/* 35 ── Diagonal Band */
const Template35 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Raleway',sans-serif", overflow: "hidden", position: "relative", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", border: "1px solid #e5e7eb" }}>
    <div style={{ position: "absolute", top: 0, left: 0, width: 280, height: 280, background: "#1e40af", clipPath: "polygon(0 0,75% 0,35% 100%,0 100%)", zIndex: 0 }} />
    <div style={{ position: "relative", zIndex: 1, padding: "44px 48px" }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#fff", maxWidth: 250, lineHeight: 1.2 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 8, fontSize: 10, color: "#93c5fd", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 100, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#374151", background: "#f3f4f6", padding: "3px 10px", borderRadius: 3 }}>{v}</span>
        ))}
      </div>
      <div style={{ height: 1, background: "#e5e7eb", margin: "20px 0" }} />
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#1e40af", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#1e40af", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#dbeafe", color: "#1e40af", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 36 ── Stone & Sand */
const Template36 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fafaf9", fontFamily: "'Source Sans 3',sans-serif", padding: "50px 56px", boxSizing: "border-box", border: "1px solid #e7e5e4", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
    <div style={{ display: "flex", gap: 26, alignItems: "flex-start", marginBottom: 30 }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#1c1917", letterSpacing: -0.3 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 11, color: "#78716c", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ background: "#292524", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#e7e5e4", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap", paddingBottom: 22, borderBottom: "1px solid #e7e5e4" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#57534e" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#57534e", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#44403c" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#57534e", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#f5f5f4", color: "#292524", border: "1px solid #d6d3d1", borderRadius: 3 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 37 ── Bold Left Column */
const Template37 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Poppins',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", minHeight: 440 }}>
    <div style={{ width: 50, background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap", fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", fontWeight: 700 }}>
        {formData.role || "Your Role"}
      </div>
    </div>
    <div style={{ flex: 1, background: "#fff", padding: "40px 36px" }}>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#1c1917", letterSpacing: -0.3 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#57534e" }}>{v}</span>
        ))}
      </div>
      <div style={{ height: 2, background: "#dc2626", margin: "20px 0" }} />
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "4px 12px", background: "#fee2e2", color: "#991b1b", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 38 ── Dusty Rose */
const Template38 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff1f2", fontFamily: "'Raleway',sans-serif", padding: "48px 52px", boxSizing: "border-box", border: "1px solid #ffe4e6", boxShadow: "0 4px 28px rgba(225,29,72,0.07)" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#e11d48,#fb7185)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff", fontWeight: 700, margin: "0 auto 16px" }}>
        {(formData.fullName || "?")[0]}
      </div>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#881337" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#e11d48", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#9f1239" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ height: 1, background: "linear-gradient(to right,transparent,#fb7185,transparent)", marginBottom: 24 }} />
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#e11d48", textTransform: "uppercase", marginBottom: 8 }}>About</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#44403c" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#e11d48", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#ffe4e6", color: "#9f1239", border: "1px solid #fda4af", borderRadius: 20, fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 39 ── Forest Sidebar */
const Template39 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Nunito',sans-serif", overflow: "hidden", boxShadow: "0 4px 28px rgba(20,83,45,0.12)", minHeight: 440 }}>
    <div style={{ width: 200, background: "#14532d", padding: "36px 20px" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#166534", border: "3px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#bbf7d0", fontWeight: 800, marginBottom: 20 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div style={{ fontSize: 8, letterSpacing: 4, color: "#4ade80", textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <div key={i} style={{ fontSize: 10.5, color: "rgba(187,247,208,0.8)", marginBottom: 6, wordBreak: "break-all" }}>{v}</div>
      ))}
      {skills?.length > 0 && <>
        <div style={{ height: 1, background: "rgba(74,222,128,0.2)", margin: "18px 0" }} />
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#4ade80", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11, color: "#bbf7d0", marginBottom: 6, padding: "3px 0", borderBottom: "1px solid rgba(74,222,128,0.15)" }}>{s}</div>
        ))}
      </>}
    </div>
    <div style={{ flex: 1, background: "#f0fdf4", padding: "36px 28px" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#14532d" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 11, color: "#16a34a", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ height: 2, background: "#16a34a", margin: "16px 0", width: 40 }} />
      {formData.summary && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#166534", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

/* 40 ── Lilac Minimal */
const Template40 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#faf5ff", fontFamily: "'Source Sans 3',sans-serif", padding: "50px 56px", boxSizing: "border-box", border: "1px solid #e9d5ff", boxShadow: "0 2px 20px rgba(124,58,237,0.06)" }}>
    <div style={{ marginBottom: 26 }}>
      <h1 style={{ margin: 0, fontSize: 36, fontWeight: 700, color: "#3b0764", letterSpacing: -0.5, fontFamily: "'Cormorant+Garamond',serif" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 24, height: 2, background: "#7c3aed" }} />
        <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#6b21a8", background: "#f3e8ff", padding: "3px 10px", borderRadius: 3 }}>{v}</span>
      ))}
    </div>
    <div style={{ height: 1, background: "#e9d5ff", marginBottom: 22 }} />
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.9, color: "#44403c", fontFamily: "'Cormorant+Garamond',serif" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 16px", background: "#f3e8ff", color: "#6b21a8", border: "1px solid #d8b4fe", borderRadius: 20, fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 41 ── Corporate Blue Right */
const Template41 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Montserrat',sans-serif", overflow: "hidden", boxShadow: "0 4px 28px rgba(29,78,216,0.10)", minHeight: 420 }}>
    <div style={{ flex: 1, background: "#fff", padding: "40px 32px" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#1e293b", letterSpacing: -0.3 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 4, fontSize: 10, color: "#1d4ed8", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ height: 2, background: "#1d4ed8", margin: "16px 0", width: 36 }} />
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#1d4ed8", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
    </div>
    <div style={{ width: 200, background: "#1e3a8a", padding: "40px 20px" }}>
      <div style={{ fontSize: 8, letterSpacing: 4, color: "#93c5fd", textTransform: "uppercase", marginBottom: 14 }}>Contact</div>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <div key={i} style={{ fontSize: 10.5, color: "rgba(219,234,254,0.8)", marginBottom: 8, wordBreak: "break-all" }}>{v}</div>
      ))}
      {skills?.length > 0 && <>
        <div style={{ height: 1, background: "rgba(147,197,253,0.2)", margin: "18px 0" }} />
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#93c5fd", textTransform: "uppercase", marginBottom: 14 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11, color: "#bfdbfe", marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#60a5fa", flexShrink: 0 }} />{s}
          </div>
        ))}
      </>}
    </div>
  </div>
);

/* 42 ── Olive Earthy */
const Template42 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fefce8", fontFamily: "'Bitter',serif", padding: "48px 52px", boxSizing: "border-box", border: "1px solid #d9f99d", boxShadow: "0 2px 20px rgba(77,124,15,0.08)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#1a2e05" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 6, fontSize: 11, color: "#4d7c0f", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ width: 54, height: 54, background: "#3f6212", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#d9f99d", fontWeight: 700 }}>
        {(formData.fullName || "?")[0]}
      </div>
    </div>
    <div style={{ display: "flex", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#365314", fontFamily: "'DM Sans',sans-serif" }}>{v}</span>
      ))}
    </div>
    <div style={{ height: 2, background: "linear-gradient(to right,#65a30d,transparent)", marginBottom: 22 }} />
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#4d7c0f", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 8 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#1a2e05" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#4d7c0f", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#ecfccb", color: "#3f6212", border: "1px solid #a3e635", borderRadius: 4, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 43 ── Midnight Purple */
const Template43 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#0f0621", fontFamily: "'Josefin+Sans',sans-serif", padding: "44px 48px", boxSizing: "border-box", boxShadow: "0 4px 40px rgba(88,28,135,0.3)" }}>
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 28 }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#e9d5ff" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 11, color: "#a855f7", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
        <div style={{ marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: 11.5, color: "rgba(233,213,255,0.5)" }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
    <div style={{ height: 1, background: "rgba(168,85,247,0.3)", marginBottom: 22 }} />
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#a855f7", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "rgba(233,213,255,0.75)" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#a855f7", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 44 ── Ice Blue Clean */
const Template44 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'DM Sans',sans-serif", overflow: "hidden", boxShadow: "0 2px 20px rgba(14,165,233,0.08)", border: "1px solid #e0f2fe" }}>
    <div style={{ background: "#f0f9ff", padding: "36px 44px", borderBottom: "1px solid #bae6fd" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#0c4a6e" }}>{formData.fullName || "Your Name"}</h1>
          <div style={{ marginTop: 5, fontSize: 11, color: "#0ea5e9", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <div key={i} style={{ fontSize: 12, color: "#0369a1", marginBottom: 3 }}>{v}</div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #e0f2fe" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0ea5e9", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0ea5e9", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#e0f2fe", color: "#0284c7", border: "1px solid #bae6fd", borderRadius: 20, fontWeight: 500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 45 ── Warm Terracotta */
const Template45 = ({ formData, skills }) => (
  <div style={{ width: 680, fontFamily: "'Raleway',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)" }}>
    <div style={{ background: "#c2410c", padding: "38px 44px 28px" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#fff" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#fed7aa", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ background: "#fff7ed", padding: "14px 44px", display: "flex", gap: 20, flexWrap: "wrap", borderBottom: "1px solid #fed7aa" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#9a3412", fontWeight: 500 }}>{v}</span>
      ))}
    </div>
    <div style={{ background: "#fff", padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#c2410c", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#44403c" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#c2410c", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 46 ── Arctic Mono */
const Template46 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#f8fafc", fontFamily: "'Space Mono',monospace", padding: "44px 48px", boxSizing: "border-box", border: "1px solid #e2e8f0", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
    <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "2px solid #0f172a" }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: "#64748b", marginBottom: 8 }}>{">"} cv.json</div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 11, color: "#2563eb", letterSpacing: 2 }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ display: "flex", gap: 22, marginBottom: 24, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 11, color: "#475569" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, color: "#64748b", marginBottom: 8, letterSpacing: 3 }}>["profile"]</div>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.9, color: "#334155" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, color: "#64748b", marginBottom: 10, letterSpacing: 3 }}>["skills"]</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", background: "#f1f5f9", color: "#0f172a", border: "1px solid #e2e8f0", borderRadius: 3, fontWeight: 700 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 47 ── Sunset Split */
const Template47 = ({ formData, skills }) => (
  <div style={{ width: 680, display: "flex", fontFamily: "'Karla',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.12)", minHeight: 420 }}>
    <div style={{ width: 240, background: "linear-gradient(180deg,#f59e0b 0%,#ef4444 100%)", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", fontWeight: 800 }}>
        {(formData.fullName || "?")[0]}
      </div>
      <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginBottom: 7, wordBreak: "break-all" }}>{v}</div>
        ))}
      </div>
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        {skills.map((s, i) => (
          <div key={i} style={{ fontSize: 11.5, color: "#fff", marginBottom: 6, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>{s}</div>
        ))}
      </div>}
    </div>
    <div style={{ flex: 1, background: "#fff", padding: "40px 30px" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1c1917" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 11, color: "#d97706", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ height: 2, background: "linear-gradient(to right,#f59e0b,#ef4444)", margin: "16px 0", width: 40 }} />
      {formData.summary && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#b45309", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.85, color: "#374151" }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

/* 48 ── Deep Ocean */
const Template48 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#0c1a3d", fontFamily: "'Raleway',sans-serif", padding: "44px 48px", boxSizing: "border-box", boxShadow: "0 4px 40px rgba(0,0,0,0.4)", overflow: "hidden", position: "relative" }}>
    <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: "rgba(59,130,246,0.06)" }} />
    <div style={{ position: "absolute", bottom: -60, left: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(99,102,241,0.06)" }} />
    <div style={{ position: "relative" }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#e0e7ff" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ height: 1, background: "rgba(96,165,250,0.3)", margin: "18px 0" }} />
      <div style={{ display: "flex", gap: 18, marginBottom: 26, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(224,231,255,0.55)" }}>{v}</span>
        ))}
      </div>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#60a5fa", textTransform: "uppercase", marginBottom: 8 }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "rgba(224,231,255,0.75)" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#60a5fa", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 49 ── Warm Linen */
const Template49 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fdf6ee", fontFamily: "'Merriweather',serif", padding: "52px 56px", boxSizing: "border-box", border: "1px solid #e5d9c9", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, paddingBottom: 18, borderBottom: "2px solid #c8b8a2" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 700, color: "#2c1810", letterSpacing: -0.5 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 7, fontSize: 11, color: "#7c5c3e", fontFamily: "'Source Sans 3',sans-serif", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 20, marginBottom: 26, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#7c5c3e", fontFamily: "'Source Sans 3',sans-serif" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#7c5c3e", textTransform: "uppercase", fontFamily: "'Source Sans 3',sans-serif", marginBottom: 10 }}>Profile</div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 2, color: "#2c1810" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, color: "#7c5c3e", textTransform: "uppercase", fontFamily: "'Source Sans 3',sans-serif", marginBottom: 12 }}>Skills</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 12.5, padding: "5px 16px", background: "#f0e6d8", color: "#5c3d1e", border: "1px solid #c8b8a2", borderRadius: 3, fontFamily: "'Source Sans 3',sans-serif" }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 50 ── Neon Hacker */
const Template50 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#020c02", fontFamily: "'Space Mono',monospace", padding: "40px 44px", boxSizing: "border-box", border: "1px solid rgba(0,255,70,0.15)", boxShadow: "0 0 40px rgba(0,255,70,0.05)" }}>
    <div style={{ marginBottom: 22, paddingBottom: 18, borderBottom: "1px solid rgba(0,255,70,0.2)" }}>
      <div style={{ fontSize: 9, color: "rgba(0,255,70,0.5)", marginBottom: 8, letterSpacing: 3 }}>$ whoami</div>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#00ff46" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 5, fontSize: 10, color: "rgba(0,255,70,0.7)", letterSpacing: 2 }}>{"> "}{formData.role || "Your Role"}</div>
    </div>
    <div style={{ display: "flex", gap: 18, marginBottom: 22, flexWrap: "wrap" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 10.5, color: "rgba(0,255,70,0.5)" }}>{v}</span>
      ))}
    </div>
    {formData.summary && <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 9, color: "rgba(0,255,70,0.5)", marginBottom: 8, letterSpacing: 3 }}>$ cat profile.txt</div>
      <p style={{ margin: 0, fontSize: 11.5, lineHeight: 2, color: "rgba(0,255,70,0.8)" }}>{formData.summary}</p>
    </div>}
    {skills?.length > 0 && <div>
      <div style={{ fontSize: 9, color: "rgba(0,255,70,0.5)", marginBottom: 10, letterSpacing: 3 }}>$ ls skills/</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", background: "rgba(0,255,70,0.06)", color: "#00ff46", border: "1px solid rgba(0,255,70,0.2)", borderRadius: 3 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

/* 51 ── Slate Horizontal Rule */
const Template51 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#f8fafc", fontFamily: "'Source Sans 3',sans-serif", padding: "44px 48px", boxSizing: "border-box", border: "1px solid #e2e8f0", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center", marginBottom: 16 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#0f172a" }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 5, fontSize: 11, color: "#475569", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <div key={i} style={{ fontSize: 12, color: "#64748b", marginBottom: 3 }}>{v}</div>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 0 }}>
      {[40, 20, 10, 30].map((w, i) => (
        <div key={i} style={{ height: 4, flex: w, background: ["#0f172a", "#3b82f6", "#94a3b8", "#e2e8f0"][i] }} />
      ))}
    </div>
    <div style={{ paddingTop: 22 }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#64748b", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#334155" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#64748b", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#f1f5f9", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 52 ── Vibrant Blocks */
const Template52 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Nunito',sans-serif", overflow: "hidden", boxShadow: "0 4px 28px rgba(0,0,0,0.10)" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ background: "#7c3aed", padding: "32px 28px" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{formData.fullName || "Your Name"}</h1>
        <div style={{ marginTop: 6, fontSize: 10, color: "#d8b4fe", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      </div>
      <div style={{ background: "#f59e0b", padding: "32px 28px", display: "flex", alignItems: "center" }}>
        <div>
          {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
            <div key={i} style={{ fontSize: 11, color: "#451a03", marginBottom: 5, fontWeight: 600 }}>{v}</div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 32px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: ["#f3e8ff", "#fef3c7", "#dcfce7", "#dbeafe"][i % 4], color: ["#581c87", "#92400e", "#14532d", "#1e3a8a"][i % 4], borderRadius: 6, fontWeight: 700 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 53 ── Corporate Grey */
const Template53 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Roboto+Slab',serif", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
    <div style={{ background: "#374151", padding: "36px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#f9fafb" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#9ca3af", letterSpacing: 4, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>{formData.role || "Your Role"}</div>
    </div>
    <div style={{ background: "#f3f4f6", padding: "12px 44px", display: "flex", gap: 20, flexWrap: "wrap", borderBottom: "1px solid #e5e7eb" }}>
      {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
        <span key={i} style={{ fontSize: 12, color: "#374151", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#374151", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 8, paddingBottom: 6, borderBottom: "2px solid #e5e7eb" }}>Summary</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#4b5563" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#374151", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 10, paddingBottom: 6, borderBottom: "2px solid #e5e7eb" }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#f9fafb", color: "#374151", border: "1px solid #d1d5db", borderRadius: 4, fontFamily: "'DM Sans',sans-serif" }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 54 ── Aqua Wave */
const Template54 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#fff", fontFamily: "'Nunito',sans-serif", overflow: "hidden", boxShadow: "0 4px 32px rgba(6,182,212,0.12)", border: "1px solid #cffafe" }}>
    <div style={{ background: "linear-gradient(135deg,#0891b2 0%,#06b6d4 100%)", padding: "40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -30, bottom: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#fff" }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "#a5f3fc", letterSpacing: 3, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.12)", padding: "3px 12px", borderRadius: 20 }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "28px 44px" }}>
      {formData.summary && <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0891b2", textTransform: "uppercase", marginBottom: 8 }}>About</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#0891b2", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "#cffafe", color: "#0e7490", border: "1px solid #a5f3fc", borderRadius: 20, fontWeight: 700 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* 55 ── Geometric Dark */
const Template55 = ({ formData, skills }) => (
  <div style={{ width: 680, background: "#18181b", fontFamily: "'Josefin+Sans',sans-serif", overflow: "hidden", boxShadow: "0 4px 40px rgba(0,0,0,0.4)", position: "relative" }}>
    <div style={{ position: "absolute", top: 0, left: 0, width: 680, height: 100, background: "linear-gradient(135deg,#dc2626 0%,#7c3aed 50%,#1d4ed8 100%)", zIndex: 0 }} />
    <div style={{ position: "relative", zIndex: 1, padding: "40px 44px" }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>{formData.fullName || "Your Name"}</h1>
      <div style={{ marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 4, textTransform: "uppercase" }}>{formData.role || "Your Role"}</div>
      <div style={{ marginTop: 54, display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {[formData.email, formData.phone, formData.location].filter(Boolean).map((v, i) => (
          <span key={i} style={{ fontSize: 12, color: "#a1a1aa" }}>{v}</span>
        ))}
      </div>
      <div style={{ height: 1, background: "#3f3f46", marginBottom: 22 }} />
      {formData.summary && <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#d4d4d8" }}>{formData.summary}</p>
      </div>}
      {skills?.length > 0 && <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "5px 14px", background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   TEMPLATE REGISTRY
═══════════════════════════════════════════════════════════════════════════ */
const templateMeta = [
  { name: "Classic Professional", tag: "Popular", component: Template1 },
  { name: "Sidebar Split", tag: "Creative", component: Template2 },
  { name: "Modern Serif", tag: "Elegant", component: Template3 },
  { name: "Bold Banner", tag: "Bold", component: Template4 },
  { name: "Timeline Stripe", tag: "Clean", component: Template5 },
  { name: "Card Grid", tag: "Modern", component: Template6 },
  { name: "Two-Tone Split", tag: "Dark", component: Template7 },
  { name: "Minimalist Line", tag: "Simple", component: Template8 },
  { name: "Accent Corner", tag: "Unique", component: Template9 },
  { name: "Elegant Lora", tag: "Classic", component: Template10 },
  { name: "Forest Green", tag: "Nature", component: Template11 },
  { name: "Burgundy Executive", tag: "Executive", component: Template12 },
  { name: "Teal Minimal", tag: "Fresh", component: Template13 },
  { name: "Tech Dark", tag: "Dev", component: Template14 },
  { name: "Rose Gold Luxury", tag: "Luxury", component: Template15 },
  { name: "Purple Creative", tag: "Creative", component: Template16 },
  { name: "Orange Impact", tag: "Vibrant", component: Template17 },
  { name: "Slate Academic", tag: "Academic", component: Template18 },
  { name: "Indigo Sidebar", tag: "Structured", component: Template19 },
  { name: "Gold Classic", tag: "Premium", component: Template20 },
  { name: "Newspaper Editorial", tag: "Editorial", component: Template21 },
  { name: "Sky Blue Airy", tag: "Airy", component: Template22 },
  { name: "Brutalist Bold", tag: "Brutalist", component: Template23 },
  { name: "Pastel Soft", tag: "Pastel", component: Template24 },
  { name: "Navy & Cream", tag: "Classic", component: Template25 },
  { name: "Mint Fresh", tag: "Fresh", component: Template26 },
  { name: "Swiss Grid", tag: "Swiss", component: Template27 },
  { name: "Retro Typewriter", tag: "Retro", component: Template28 },
  { name: "Gradient Mesh", tag: "Gradient", component: Template29 },
  { name: "Amber Warm", tag: "Warm", component: Template30 },
  { name: "Charcoal Modern", tag: "Dark", component: Template31 },
  { name: "Cyan Neon", tag: "Neon", component: Template32 },
  { name: "Monochrome Print", tag: "Print", component: Template33 },
  { name: "Crimson Italic", tag: "Literary", component: Template34 },
  { name: "Diagonal Band", tag: "Dynamic", component: Template35 },
  { name: "Stone & Sand", tag: "Natural", component: Template36 },
  { name: "Bold Left Column", tag: "Bold", component: Template37 },
  { name: "Dusty Rose", tag: "Feminine", component: Template38 },
  { name: "Forest Sidebar", tag: "Earthy", component: Template39 },
  { name: "Lilac Minimal", tag: "Soft", component: Template40 },
  { name: "Corporate Blue Right", tag: "Corporate", component: Template41 },
  { name: "Olive Earthy", tag: "Earthy", component: Template42 },
  { name: "Midnight Purple", tag: "Night", component: Template43 },
  { name: "Ice Blue Clean", tag: "Clean", component: Template44 },
  { name: "Warm Terracotta", tag: "Warm", component: Template45 },
  { name: "Arctic Mono", tag: "Mono", component: Template46 },
  { name: "Sunset Split", tag: "Sunset", component: Template47 },
  { name: "Deep Ocean", tag: "Deep", component: Template48 },
  { name: "Warm Linen", tag: "Classic", component: Template49 },
  { name: "Neon Hacker", tag: "Hacker", component: Template50 },
  { name: "Slate Horizontal", tag: "Clean", component: Template51 },
  { name: "Vibrant Blocks", tag: "Colorful", component: Template52 },
  { name: "Corporate Grey", tag: "Corporate", component: Template53 },
  { name: "Aqua Wave", tag: "Wave", component: Template54 },
  { name: "Geometric Dark", tag: "Geometric", component: Template55 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN TEMPLATES PAGE
═══════════════════════════════════════════════════════════════════════════ */
const Templates = ({ formData = {}, skills = [], selectedTemplate = 0, setSelectedTemplate = () => { } }) => {
  const { darkMode: dk } = useTheme();
  const navigate = useNavigate();
  const SelectedComp = templateMeta[selectedTemplate]?.component || Template1;
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3200);
  };

  const handleEdit = () => {
    // Navigate back to form page with current data
    navigate('/formPage', { state: { formData, skills, editMode: true } });
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || downloading) return;
    setDownloading(true);
    try {
      await loadPdfLibs();
      const { jsPDF } = window.jspdf;
      const canvas = await window.html2canvas(resumeRef.current, {
        scale: 1.5,
        useCORS: true, 
        backgroundColor: "#ffffff", 
        logging: false,
        windowWidth: 680,
        imageTimeout: 0,
      });
      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdfW = 210;
      const pdfH = (canvas.height * pdfW) / canvas.width;
      const pdf = new jsPDF({ orientation: pdfH > pdfW ? "portrait" : "landscape", unit: "mm", format: [pdfW, pdfH] });
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH, "", "FAST");
      const fileName = `${(formData.fullName || "Resume").replace(/\s+/g, "_")}_Resume.pdf`;
      pdf.save(fileName);
      showToast("✓ PDF downloaded successfully!", true);
    } catch {
      showToast("✗ Download failed. Please try again.", false);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: dk ? '#0f172a' : "linear-gradient(135deg,#f0f7ff 0%,#eef2ff 50%,#f5f3ff 100%)", fontFamily: "'DM Sans',sans-serif", transition: 'background-color 0.3s ease' }}>
      <Navbar />
      <FontStyle />

      {/* Toast */}
      {toast && (
        <div className="toast" style={{
          position: "fixed", top: 16, right: 16, zIndex: 9999,
          padding: "12px 18px", borderRadius: 12, fontSize: 13, fontWeight: 600,
          fontFamily: "'DM Sans',sans-serif",
          background: toast.ok ? "#f0fdf4" : "#fef2f2",
          color: toast.ok ? "#15803d" : "#b91c1c",
          border: `1.5px solid ${toast.ok ? "#86efac" : "#fca5a5"}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Main Container - Split Layout */}
      <div className="templates-main-container" style={{ 
        display: 'flex', 
        flexDirection: 'row',
        gap: 24, 
        padding: '20px', 
        maxWidth: '1800px', 
        margin: '0 auto', 
        height: 'calc(100vh - 80px)', 
        overflow: 'hidden' 
      }}>
        
        {/* LEFT SIDE - Template Grid (2 columns) */}
        <div className="templates-left-panel" style={{ 
          flex: '0 0 580px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 16 
        }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: dk ? 'rgba(255,255,255,0.05)' : "white", border: `1.5px solid ${dk ? '#334155' : 'var(--accent-light)'}`, marginBottom: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,var(--gradient-from),var(--gradient-to))", display: "inline-block" }} />
              <span className="section-label" style={{ color: "var(--accent)", fontSize: 10 }}>Choose Your Style</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: dk ? '#f1f5f9' : "#0f172a", fontFamily: "'Poppins',sans-serif", letterSpacing: -0.5 }}>
              Pick a Template
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: dk ? '#94a3b8' : "#64748b" }}>
              {templateMeta.length} professional templates
            </p>
          </div>

          {/* Scrollable Template Container */}
          <div 
            className="templates-scroll-container"
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '100%',
              paddingRight: 8,
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Template Grid - 2 columns */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}>
            {templateMeta.map((t, i) => {
              const isActive = selectedTemplate === i;
              const TemplateComp = t.component;
              return (
                <div
                  key={i}
                  className={`tmpl-card${isActive ? " active" : ""}`}
                  onClick={() => setSelectedTemplate(i)}
                  style={{
                    background: dk ? '#1e293b' : "white",
                    boxShadow: isActive
                      ? `0 8px 32px ${dk ? 'rgba(99,102,241,0.30)' : 'rgba(99,102,241,0.40)'}`
                      : `0 2px 12px ${dk ? 'rgba(0,0,0,0.2)' : 'rgba(37,99,235,0.08)'}`,
                    borderColor: isActive ? 'var(--accent)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Template thumbnail with proper scaling */}
                  <div 
                    className="thumbnail-wrapper"
                    style={{ 
                      width: '100%',
                      height: 240,
                      overflow: "hidden", 
                      background: "#ffffff", 
                      position: "relative",
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <div 
                      className="thumbnail-inner"
                      style={{
                        width: 680,
                        height: 'auto',
                        transform: "scale(0.35)",
                        transformOrigin: "top center",
                        pointerEvents: "none",
                      }}
                    >
                      <TemplateComp
                        formData={{ 
                          fullName: "Jane Doe", 
                          role: "Product Designer", 
                          email: "jane@email.com", 
                          phone: "+1 555 0000", 
                          location: "New York, NY", 
                          website: "janedoe.com",
                          summary: "Experienced product designer with 5+ years creating user-centered digital experiences. Passionate about clean interfaces and accessibility." 
                        }}
                        skills={["Figma", "React", "UX Research", "Prototyping"]}
                      />
                    </div>
                    
                    {/* Active overlay */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(37,99,235,0.08))',
                        border: '3px solid var(--accent)',
                        pointerEvents: 'none',
                        borderRadius: '12px',
                      }} />
                    )}
                  </div>

                  {/* Card footer */}
                  <div style={{ 
                    padding: "14px 16px", 
                    borderTop: `1px solid ${dk ? '#334155' : '#f1f5f9'}`,
                    background: isActive ? (dk ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)') : 'transparent',
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: 14, 
                          fontWeight: 700, 
                          color: isActive ? "var(--accent)" : dk ? '#e2e8f0' : "#1e293b", 
                          lineHeight: 1.3,
                          marginBottom: 6,
                        }}>
                          {t.name}
                        </div>
                        <div style={{
                          display: "inline-flex",
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 10, 
                          fontWeight: 700, 
                          letterSpacing: 0.5,
                          padding: "3px 10px", 
                          borderRadius: 999,
                          background: isActive ? (dk ? 'rgba(99,102,241,0.15)' : 'var(--accent-light)') : dk ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                          color: isActive ? "var(--accent)" : dk ? '#64748b' : "#94a3b8",
                        }}>
                          <span style={{ 
                            width: 5, 
                            height: 5, 
                            borderRadius: '50%', 
                            background: isActive ? 'var(--accent)' : dk ? '#64748b' : '#94a3b8',
                          }} />
                          {t.tag}
                        </div>
                      </div>
                      
                      {/* Check badge */}
                      {isActive && (
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg,var(--gradient-from),var(--gradient-to))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            {/* End of Template Grid */}
          </div>
          {/* End of Scrollable Container */}
        </div>

        {/* RIGHT SIDE - Live Preview */}
        <div className="templates-right-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Preview Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: dk ? 'rgba(255,255,255,0.05)' : "white", border: `1.5px solid ${dk ? '#334155' : 'var(--accent-light)'}`, boxShadow: `0 2px 8px ${dk ? 'rgba(0,0,0,0.2)' : 'rgba(99,102,241,0.08)'}` }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,var(--gradient-from),var(--gradient-to))" }} />
              <span className="section-label" style={{ color: "var(--accent)", fontSize: 11 }}>
                Live Preview: {templateMeta[selectedTemplate]?.name}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={handleEdit}
                style={{
                  padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                  background: dk ? '#1e293b' : 'white',
                  color: dk ? '#e2e8f0' : '#334155',
                  border: `1.5px solid ${dk ? '#334155' : '#e2e8f0'}`,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.2s ease',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <span className="hidden sm:inline">Edit Resume</span>
                <span className="sm:hidden">Edit</span>
              </button>

              <button
                className="dl-btn"
                onClick={handleDownloadPDF}
                disabled={downloading}
                style={{
                  padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                  color: "#fff", letterSpacing: 0.3,
                  display: "flex", alignItems: "center", gap: 8,
                  boxShadow: "0 6px 24px rgba(37,99,235,0.35)",
                  minHeight: '44px',
                }}
              >
                {downloading ? (
                  <><span className="spinner" /><span className="hidden sm:inline">Generating...</span><span className="sm:hidden">...</span></>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-start',
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '20px',
            background: dk ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
            borderRadius: 16,
            border: `1px solid ${dk ? '#334155' : '#e2e8f0'}`,
          }}>
            <div className="preview-frame" style={{ 
              borderRadius: 12, 
              overflow: "hidden", 
              boxShadow: dk ? '0 12px 50px rgba(0,0,0,0.4)' : "0 12px 50px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.06)",
              background: 'white',
            }}>
              <div ref={resumeRef} style={{ minWidth: 680 }}>
                <SelectedComp formData={formData} skills={skills} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
export {
  Template1, Template2, Template3, Template4, Template5,
  Template6, Template7, Template8, Template9, Template10,
  Template11, Template12, Template13, Template14, Template15,
  Template16, Template17, Template18, Template19, Template20,
  Template21, Template22, Template23, Template24, Template25,
  Template26, Template27, Template28, Template29, Template30,
  Template31, Template32, Template33, Template34, Template35,
  Template36, Template37, Template38, Template39, Template40,
  Template41, Template42, Template43, Template44, Template45,
  Template46, Template47, Template48, Template49, Template50,
  Template51, Template52, Template53, Template54, Template55,
};