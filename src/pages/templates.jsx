import React, { useRef, useState } from "react";
import Navbar from "../components/navbar";

/* ─────────────────────────────────────────────────────────────────────────────
   THEME TOKENS
───────────────────────────────────────────────────────────────────────────── */
const B = {
  blue:      "#2563eb",
  blueDark:  "#1d4ed8",
  blueLight: "#dbeafe",
  blueMid:   "#93c5fd",
  sky:       "#e0f0ff",
  white:     "#ffffff",
  offWhite:  "#f8faff",
  slate:     "#64748b",
  dark:      "#1e293b",
  text:      "#334155",
  border:    "#e2e8f0",
};

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=Poppins:wght@600;700&display=swap');

    @keyframes spin       { to { transform:rotate(360deg); } }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn     { from{opacity:0;} to{opacity:1;} }
    @keyframes slideIn    { from{opacity:0;transform:translateX(20px);} to{opacity:1;transform:translateX(0);} }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 6px 24px rgba(37,99,235,0.35);} 50%{box-shadow:0 10px 36px rgba(37,99,235,0.55);} }
    @keyframes gradShift  { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
    @keyframes spin-slow  { to{transform:rotate(360deg);} }
    @keyframes float      { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

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
      border-color: #6366f1;
      box-shadow: 0 8px 32px rgba(99,102,241,0.30) !important;
    }
    .tmpl-card .check-badge {
      position: absolute; top: 10px; right: 10px;
      width: 24px; height: 24px; border-radius: 50%;
      background: linear-gradient(135deg,#2563eb,#7c3aed);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: scale(0.6);
      transition: all 0.2s ease;
    }
    .tmpl-card.active .check-badge {
      opacity: 1; transform: scale(1);
    }

    .dl-btn {
      cursor:pointer; border:none; outline:none;
      font-family:'DM Sans',sans-serif;
      transition:all 0.25s ease;
      background: linear-gradient(135deg,#2563eb,#7c3aed);
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
      animation:spin 0.7s linear infinite;
      vertical-align:middle; margin-right:8px;
    }

    .preview-frame {
      animation: fadeIn 0.35s ease;
    }

    .toast {
      animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1);
    }

    .section-label {
      font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; font-family: 'DM Sans', sans-serif;
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
   TEMPLATES (unchanged designs)
═══════════════════════════════════════════════════════════════════════════ */

const Template1 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 32px rgba(37,99,235,0.10)", border:`1px solid ${B.border}` }}>
    <div style={{ background:B.blue, padding:"32px 40px 28px" }}>
      <h1 style={{ margin:0, fontSize:30, fontWeight:600, color:"#fff", letterSpacing:-0.5 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:6, fontSize:12, color:B.blueMid, letterSpacing:3, textTransform:"uppercase", fontWeight:500 }}>{formData.role||"Your Role"}</div>
    </div>
    <div style={{ background:B.blueLight, padding:"11px 40px", display:"flex", gap:22, flexWrap:"wrap", borderBottom:`1px solid ${B.border}` }}>
      {[formData.email,formData.phone,formData.location,formData.website].filter(Boolean).map((v,i)=>(
        <span key={i} style={{ fontSize:12, color:B.blue, fontWeight:500 }}>{v}</span>
      ))}
    </div>
    <div style={{ padding:"28px 40px" }}>
      {formData.summary&&<div style={{ marginBottom:22 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:8, paddingBottom:6, borderBottom:`2px solid ${B.blueLight}` }}>Summary</div>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length>0&&<div>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:10, paddingBottom:6, borderBottom:`2px solid ${B.blueLight}` }}>Skills</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"4px 14px", background:B.blueLight, color:B.blueDark, borderRadius:4, fontWeight:500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

const Template2 = ({ formData, skills }) => (
  <div style={{ width:680, display:"flex", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 32px rgba(37,99,235,0.12)", minHeight:460 }}>
    <div style={{ width:210, background:B.blue, padding:"36px 24px", display:"flex", flexDirection:"column", gap:26 }}>
      <div style={{ width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"3px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", fontWeight:700 }}>
        {(formData.fullName||"?")[0]}
      </div>
      <div>
        <div style={{ fontSize:8, letterSpacing:4, color:B.blueMid, textTransform:"uppercase", marginBottom:10 }}>Contact</div>
        {[formData.email,formData.phone,formData.location,formData.website].filter(Boolean).map((v,i)=>(
          <div key={i} style={{ fontSize:11, color:"rgba(255,255,255,0.82)", marginBottom:7, wordBreak:"break-all" }}>{v}</div>
        ))}
      </div>
      {skills?.length>0&&<div>
        <div style={{ fontSize:8, letterSpacing:4, color:B.blueMid, textTransform:"uppercase", marginBottom:10 }}>Skills</div>
        {skills.map((s,i)=>(
          <div key={i} style={{ fontSize:11, color:"rgba(255,255,255,0.85)", marginBottom:6, display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:4, height:4, borderRadius:"50%", background:B.blueMid, flexShrink:0 }}/>{s}
          </div>
        ))}
      </div>}
    </div>
    <div style={{ flex:1, background:B.white, padding:"36px 32px" }}>
      <h1 style={{ margin:0, fontSize:26, fontWeight:600, color:B.dark }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:5, fontSize:12, color:B.blue, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>{formData.role||"Your Role"}</div>
      {formData.summary&&<div style={{ marginTop:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:8 }}>Profile</div>
        <div style={{ width:32, height:2, background:B.blue, marginBottom:12 }}/>
        <p style={{ margin:0, fontSize:12.5, lineHeight:1.85, color:B.text }}>{formData.summary}</p>
      </div>}
    </div>
  </div>
);

const Template3 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", padding:"48px 52px", boxSizing:"border-box", boxShadow:"0 2px 24px rgba(37,99,235,0.08)", border:`1px solid ${B.border}` }}>
    <div style={{ textAlign:"center", marginBottom:32, paddingBottom:28, borderBottom:`1px solid ${B.border}` }}>
      <h1 style={{ margin:0, fontSize:38, fontWeight:700, fontFamily:"'Playfair Display',serif", color:B.dark, letterSpacing:-1 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:8, fontSize:12, letterSpacing:5, textTransform:"uppercase", color:B.blue, fontWeight:500 }}>{formData.role||"Your Role"}</div>
      <div style={{ marginTop:14, display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
        {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
          <span key={i} style={{ fontSize:12, color:B.slate }}>
            {i>0&&<span style={{ margin:"0 10px", color:B.border }}>|</span>}{v}
          </span>
        ))}
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 44px" }}>
      <div>
        {formData.summary&&<div style={{ marginBottom:22 }}>
          <h2 style={{ margin:"0 0 10px", fontSize:10, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase" }}>About</h2>
          <p style={{ margin:0, fontSize:12.5, lineHeight:1.85, color:B.text }}>{formData.summary}</p>
        </div>}
      </div>
      {skills?.length>0&&<div>
        <h2 style={{ margin:"0 0 10px", fontSize:10, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase" }}>Skills</h2>
        {skills.map((s,i)=>(
          <div key={i} style={{ fontSize:12.5, color:B.text, padding:"7px 0", borderBottom:`1px solid ${B.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            {s}<span style={{ width:16, height:2, background:B.blue, display:"inline-block" }}/>
          </div>
        ))}
      </div>}
    </div>
  </div>
);

const Template4 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 32px rgba(37,99,235,0.10)", overflow:"hidden", border:`1px solid ${B.border}` }}>
    <div style={{ background:`linear-gradient(135deg,${B.blue} 0%,#1e40af 100%)`, padding:"40px 44px 36px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-40, top:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
      <div style={{ position:"absolute", right:30, bottom:-60, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
      <h1 style={{ margin:0, fontSize:40, fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif", letterSpacing:-1.5, lineHeight:1 }}>{formData.fullName||"YOUR NAME"}</h1>
      <div style={{ marginTop:10, fontSize:12, color:B.blueMid, letterSpacing:4, textTransform:"uppercase", fontWeight:600 }}>{formData.role||"Your Role"}</div>
      <div style={{ marginTop:18, display:"flex", gap:10, flexWrap:"wrap" }}>
        {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
          <span key={i} style={{ fontSize:11.5, color:"rgba(255,255,255,0.85)", background:"rgba(255,255,255,0.1)", padding:"4px 12px", borderRadius:20 }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ padding:"28px 44px" }}>
      {formData.summary&&<div style={{ marginBottom:22 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:8 }}>Summary</div>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length>0&&<div>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:10 }}>Skills</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"5px 14px", background:B.sky, border:`1px solid ${B.blueMid}`, color:B.blueDark, borderRadius:4, fontWeight:500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

const Template5 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", display:"flex", boxShadow:"0 4px 32px rgba(37,99,235,0.10)", border:`1px solid ${B.border}` }}>
    <div style={{ width:6, background:`linear-gradient(to bottom,${B.blue},${B.blueMid})`, flexShrink:0 }}/>
    <div style={{ flex:1, padding:"40px 44px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <h1 style={{ margin:0, fontSize:30, fontWeight:700, color:B.dark, letterSpacing:-0.8 }}>{formData.fullName||"Your Name"}</h1>
          <div style={{ marginTop:5, fontSize:12, color:B.blue, fontWeight:600, letterSpacing:3, textTransform:"uppercase" }}>{formData.role||"Your Role"}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
            <div key={i} style={{ fontSize:11.5, color:B.slate, marginBottom:4 }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ width:"100%", height:1, background:B.border, marginBottom:22 }}/>
      {formData.summary&&<div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:B.blue }}/>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase" }}>Summary</div>
        </div>
        <p style={{ margin:"0 0 0 18px", fontSize:13, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length>0&&<div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:B.blue }}/>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase" }}>Skills</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginLeft:18 }}>
          {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"5px 14px", background:B.blueLight, color:B.blueDark, borderRadius:20, fontWeight:500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

const Template6 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.sky, fontFamily:"'DM Sans',sans-serif", padding:"36px 32px", boxSizing:"border-box", boxShadow:"0 4px 32px rgba(37,99,235,0.10)" }}>
    <div style={{ background:B.white, borderRadius:12, padding:"24px 28px", marginBottom:14, border:`1px solid ${B.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:700, color:B.dark }}>{formData.fullName||"Your Name"}</h1>
        <div style={{ marginTop:4, fontSize:11, color:B.blue, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>{formData.role||"Your Role"}</div>
      </div>
      <div style={{ width:52, height:52, borderRadius:10, background:B.blue, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#fff", fontWeight:700 }}>
        {(formData.fullName||"?")[0]}
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:14 }}>
      {[["📧",formData.email],["📱",formData.phone],["📍",formData.location]].filter(([,v])=>v).map(([icon,v],i)=>(
        <div key={i} style={{ background:B.white, borderRadius:8, padding:"12px 14px", border:`1px solid ${B.border}` }}>
          <div style={{ fontSize:10, color:B.slate, marginBottom:4 }}>{icon}</div>
          <div style={{ fontSize:11.5, color:B.text, fontWeight:500 }}>{v}</div>
        </div>
      ))}
    </div>
    {formData.summary&&<div style={{ background:B.white, borderRadius:8, padding:"18px 22px", marginBottom:14, border:`1px solid ${B.border}` }}>
      <div style={{ fontSize:9, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:8 }}>Summary</div>
      <p style={{ margin:0, fontSize:12.5, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
    </div>}
    {skills?.length>0&&<div style={{ background:B.white, borderRadius:8, padding:"18px 22px", border:`1px solid ${B.border}` }}>
      <div style={{ fontSize:9, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:10 }}>Skills</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"5px 14px", background:B.blueLight, color:B.blueDark, borderRadius:6, fontWeight:500 }}>{s}</span>)}
      </div>
    </div>}
  </div>
);

const Template7 = ({ formData, skills }) => (
  <div style={{ width:680, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 32px rgba(37,99,235,0.14)", overflow:"hidden", border:`1px solid ${B.border}` }}>
    <div style={{ background:"#0f172a", padding:"40px 44px" }}>
      <h1 style={{ margin:0, fontSize:34, fontWeight:800, fontFamily:"'Syne',sans-serif", color:"#fff", letterSpacing:-1 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:7, fontSize:12, letterSpacing:4, textTransform:"uppercase", color:B.blueMid, fontWeight:500 }}>{formData.role||"Your Role"}</div>
      <div style={{ marginTop:18, display:"flex", gap:22, flexWrap:"wrap" }}>
        {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
          <span key={i} style={{ fontSize:11.5, color:"rgba(255,255,255,0.65)" }}>{v}</span>
        ))}
      </div>
    </div>
    <div style={{ background:B.white, padding:"32px 44px" }}>
      {formData.summary&&<div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:3, height:16, background:B.blue, borderRadius:2 }}/>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase" }}>Profile</div>
        </div>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length>0&&<div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:3, height:16, background:B.blue, borderRadius:2 }}/>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase" }}>Skills</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"5px 14px", background:B.offWhite, border:`1px solid ${B.border}`, color:B.text, borderRadius:4, fontWeight:500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

const Template8 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", padding:"52px 56px", boxSizing:"border-box", boxShadow:"0 2px 20px rgba(37,99,235,0.07)", border:`1px solid ${B.border}` }}>
    <div style={{ borderBottom:`3px solid ${B.blue}`, paddingBottom:20, marginBottom:24 }}>
      <h1 style={{ margin:0, fontSize:32, fontWeight:700, color:B.dark, letterSpacing:-0.8 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:6, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, color:B.blue, fontWeight:600, letterSpacing:3, textTransform:"uppercase" }}>{formData.role||"Your Role"}</span>
        <span style={{ fontSize:11.5, color:B.slate }}>{[formData.email,formData.phone].filter(Boolean).join("  ·  ")}</span>
      </div>
    </div>
    {formData.location&&<div style={{ fontSize:12, color:B.slate, marginBottom:22 }}>{formData.location}{formData.website&&` · ${formData.website}`}</div>}
    {formData.summary&&<div style={{ marginBottom:26 }}>
      <div style={{ fontSize:9, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase", marginBottom:10 }}>Summary</div>
      <p style={{ margin:0, fontSize:13, lineHeight:1.9, color:B.text }}>{formData.summary}</p>
    </div>}
    {skills?.length>0&&<div>
      <div style={{ fontSize:9, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase", marginBottom:12 }}>Skills</div>
      <div style={{ display:"flex", flexWrap:"wrap" }}>
        {skills.map((s,i)=>(
          <span key={i} style={{ fontSize:12.5, color:B.text }}>
            {s}{i<skills.length-1&&<span style={{ color:B.blueMid, margin:"0 10px" }}>·</span>}
          </span>
        ))}
      </div>
    </div>}
  </div>
);

const Template9 = ({ formData, skills }) => (
  <div style={{ width:680, background:B.white, fontFamily:"'DM Sans',sans-serif", position:"relative", boxShadow:"0 4px 32px rgba(37,99,235,0.10)", border:`1px solid ${B.border}`, overflow:"hidden" }}>
    <div style={{ position:"absolute", top:0, right:0, width:160, height:160, background:B.blue, clipPath:"polygon(100% 0,0 0,100% 100%)" }}/>
    <div style={{ position:"absolute", top:16, right:20, fontSize:30, fontWeight:800, color:"rgba(255,255,255,0.25)", fontFamily:"'Syne',sans-serif" }}>{(formData.fullName||"?")[0]}</div>
    <div style={{ padding:"44px 48px" }}>
      <h1 style={{ margin:0, fontSize:30, fontWeight:700, color:B.dark, letterSpacing:-0.8, maxWidth:440 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:6, fontSize:12, color:B.blue, fontWeight:600, letterSpacing:3, textTransform:"uppercase" }}>{formData.role||"Your Role"}</div>
      <div style={{ marginTop:14, display:"flex", gap:8, flexWrap:"wrap" }}>
        {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
          <span key={i} style={{ fontSize:11.5, color:B.slate, padding:"3px 10px", background:B.sky, borderRadius:3 }}>{v}</span>
        ))}
      </div>
      <div style={{ width:"100%", height:1, background:B.border, margin:"22px 0" }}/>
      {formData.summary&&<div style={{ marginBottom:20 }}>
        <div style={{ fontSize:9, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:8 }}>About Me</div>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:B.text }}>{formData.summary}</p>
      </div>}
      {skills?.length>0&&<div>
        <div style={{ fontSize:9, fontWeight:700, letterSpacing:3, color:B.blue, textTransform:"uppercase", marginBottom:10 }}>Skills</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {skills.map((s,i)=><span key={i} style={{ fontSize:12, padding:"5px 14px", background:B.blueLight, color:B.blueDark, borderRadius:20, fontWeight:500 }}>{s}</span>)}
        </div>
      </div>}
    </div>
  </div>
);

const Template10 = ({ formData, skills }) => (
  <div style={{ width:680, background:"#fefefe", fontFamily:"'DM Sans',sans-serif", padding:"52px 56px", boxSizing:"border-box", boxShadow:"0 2px 24px rgba(37,99,235,0.08)", border:`1px solid ${B.border}` }}>
    <div style={{ textAlign:"center", marginBottom:30 }}>
      <div style={{ fontSize:9, letterSpacing:6, color:B.blue, textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>Résumé</div>
      <h1 style={{ margin:0, fontSize:40, fontWeight:600, fontFamily:"'Lora',serif", color:B.dark, letterSpacing:-0.5 }}>{formData.fullName||"Your Name"}</h1>
      <div style={{ marginTop:8, fontSize:13, color:B.slate, fontStyle:"italic", fontFamily:"'Lora',serif" }}>{formData.role||"Your Role"}</div>
      <div style={{ width:60, height:2, background:B.blue, margin:"14px auto 0" }}/>
    </div>
    <div style={{ display:"flex", justifyContent:"center", gap:24, marginBottom:26, flexWrap:"wrap" }}>
      {[formData.email,formData.phone,formData.location].filter(Boolean).map((v,i)=>(
        <span key={i} style={{ fontSize:12, color:B.slate }}>{v}</span>
      ))}
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:"0 40px" }}>
      <div>
        {formData.summary&&<div style={{ marginBottom:22 }}>
          <h2 style={{ margin:"0 0 10px", fontSize:10, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase" }}>Profile</h2>
          <p style={{ margin:0, fontSize:13, lineHeight:1.9, color:B.text, fontFamily:"'Lora',serif" }}>{formData.summary}</p>
        </div>}
      </div>
      {skills?.length>0&&<div>
        <h2 style={{ margin:"0 0 12px", fontSize:10, fontWeight:700, letterSpacing:4, color:B.blue, textTransform:"uppercase" }}>Skills</h2>
        {skills.map((s,i)=>(
          <div key={i} style={{ fontSize:12.5, color:B.text, padding:"6px 0", borderBottom:`1px solid ${B.border}` }}>{s}</div>
        ))}
      </div>}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   TEMPLATE REGISTRY
═══════════════════════════════════════════════════════════════════════════ */
const templateMeta = [
  { name:"Classic Professional", tag:"Popular",  component:Template1 },
  { name:"Sidebar Split",        tag:"Creative", component:Template2 },
  { name:"Modern Serif",         tag:"Elegant",  component:Template3 },
  { name:"Bold Banner",          tag:"Bold",     component:Template4 },
  { name:"Timeline Stripe",      tag:"Clean",    component:Template5 },
  { name:"Card Grid",            tag:"Modern",   component:Template6 },
  { name:"Two-Tone Split",       tag:"Dark",     component:Template7 },
  { name:"Minimalist Line",      tag:"Simple",   component:Template8 },
  { name:"Accent Corner",        tag:"Unique",   component:Template9 },
  { name:"Elegant Lora",         tag:"Classic",  component:Template10 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN TEMPLATES PAGE
═══════════════════════════════════════════════════════════════════════════ */
const Templates = ({ formData={}, skills=[], selectedTemplate=0, setSelectedTemplate=()=>{} }) => {
  const SelectedComp = templateMeta[selectedTemplate]?.component || Template1;
  const resumeRef   = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [toast,       setToast]       = useState(null);

  const showToast = (msg, ok=true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3200);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || downloading) return;
    setDownloading(true);
    try {
      await loadPdfLibs();
      const { jsPDF } = window.jspdf;
      const canvas = await window.html2canvas(resumeRef.current, {
        scale:2, useCORS:true, backgroundColor:"#ffffff", logging:false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfW = 210;
      const pdfH = (canvas.height * pdfW) / canvas.width;
      const pdf = new jsPDF({ orientation: pdfH > pdfW ? "portrait" : "landscape", unit:"mm", format:[pdfW, pdfH] });
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH, "", "FAST");
      const fileName = `${(formData.fullName||"Resume").replace(/\s+/g,"_")}_Resume.pdf`;
      pdf.save(fileName);
      showToast("✓ PDF downloaded successfully!", true);
    } catch(err) {
      showToast("✗ Download failed. Please try again.", false);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#f0f7ff 0%,#eef2ff 50%,#f5f3ff 100%)", fontFamily:"'DM Sans',sans-serif" }}>
      <Navbar/>
      <FontStyle/>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{
          position:"fixed", top:24, right:24, zIndex:9999,
          padding:"13px 22px", borderRadius:12, fontSize:13.5, fontWeight:600,
          fontFamily:"'DM Sans',sans-serif",
          background: toast.ok ? "#f0fdf4" : "#fef2f2",
          color:       toast.ok ? "#15803d"  : "#b91c1c",
          border:`1.5px solid ${toast.ok ? "#86efac" : "#fca5a5"}`,
          boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
          display:"flex", alignItems:"center", gap:8,
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── Page header ── */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"32px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:999, background:"white", border:"1.5px solid #e0e7ff", marginBottom:10 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"linear-gradient(135deg,#2563eb,#7c3aed)", display:"inline-block" }}/>
              <span className="section-label" style={{ color:"#6366f1" }}>Choose Your Style</span>
            </div>
            <h1 style={{ margin:0, fontSize:"1.9rem", fontWeight:900, color:"#0f172a", fontFamily:"'Poppins',sans-serif", letterSpacing:-0.5 }}>
              Pick a Template
            </h1>
            <p style={{ margin:"6px 0 0", fontSize:14, color:"#64748b" }}>
              {templateMeta.length} professional templates — click any to preview
            </p>
          </div>

          {/* Download button */}
          <button
            className="dl-btn"
            onClick={handleDownloadPDF}
            disabled={downloading}
            style={{
              padding:"14px 30px", borderRadius:14, fontSize:14.5, fontWeight:700,
              color:"#fff", letterSpacing:0.3,
              display:"flex", alignItems:"center", gap:10,
              boxShadow:"0 6px 24px rgba(37,99,235,0.35)",
            }}
          >
            {downloading ? (
              <><span className="spinner"/>Generating PDF…</>
            ) : (
              <>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Template grid selector ── */}
      <div style={{ maxWidth:900, margin:"24px auto 0", padding:"0 24px" }}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",
          gap:12,
        }}>
          {templateMeta.map((t, i) => {
            const isActive = selectedTemplate === i;
            const MiniComp = t.component;
            return (
              <div
                key={i}
                className={`tmpl-card${isActive?" active":""}`}
                onClick={() => setSelectedTemplate(i)}
                style={{
                  background:"white",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(99,102,241,0.30)"
                    : "0 2px 12px rgba(37,99,235,0.08)",
                }}
              >
                {/* Mini thumbnail */}
                <div style={{ height:110, overflow:"hidden", background:"#f8faff", position:"relative" }}>
                  <div style={{
                    transform:"scale(0.22)",
                    transformOrigin:"top left",
                    width:680,
                    pointerEvents:"none",
                    position:"absolute", top:0, left:0,
                  }}>
                    <MiniComp
                      formData={{ fullName:"Jane Doe", role:"Product Designer", email:"jane@email.com", phone:"+1 555 0000", location:"New York", summary:"Experienced designer with a passion for clean interfaces." }}
                      skills={["Figma","React","UX"]}
                    />
                  </div>
                </div>

                {/* Card footer */}
                <div style={{ padding:"10px 12px 12px", borderTop:"1px solid #f1f5f9" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color: isActive ? "#4f46e5" : "#1e293b", lineHeight:1.3 }}>{t.name}</div>
                      <div style={{
                        marginTop:4, display:"inline-block",
                        fontSize:9.5, fontWeight:700, letterSpacing:0.5,
                        padding:"2px 8px", borderRadius:999,
                        background: isActive ? "#eef2ff" : "#f1f5f9",
                        color: isActive ? "#6366f1" : "#94a3b8",
                      }}>{t.tag}</div>
                    </div>
                    {/* Check badge */}
                    <div className="check-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Active template label ── */}
      <div style={{ maxWidth:900, margin:"28px auto 12px", padding:"0 24px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ flex:1, height:1, background:"#e0e7ff" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, background:"white", border:"1.5px solid #e0e7ff", boxShadow:"0 2px 8px rgba(99,102,241,0.08)" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg,#2563eb,#7c3aed)" }}/>
          <span className="section-label" style={{ color:"#6366f1" }}>
            Previewing: {templateMeta[selectedTemplate]?.name}
          </span>
        </div>
        <div style={{ flex:1, height:1, background:"#e0e7ff" }}/>
      </div>

      {/* ── Full preview ── */}
      <div style={{ display:"flex", justifyContent:"center", padding:"0 24px 80px" }}>
        <div className="preview-frame" style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 20px 70px rgba(99,102,241,0.18), 0 4px 16px rgba(0,0,0,0.06)" }}>
          <div ref={resumeRef}>
            <SelectedComp formData={formData} skills={skills}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
export { Template1,Template2,Template3,Template4,Template5,Template6,Template7,Template8,Template9,Template10 };