import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import emailjs from 'emailjs-com';
import { auth, googleProvider } from '../firebase';
import { useTheme } from '../ThemeContext';

const EMAILJS_SERVICE_ID  = "service_xkajwad";
const EMAILJS_TEMPLATE_ID = "template_lgaf479";
const EMAILJS_PUBLIC_KEY  = "barenH6VgMtFo51tb";

const Styles = ({ dk }) => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn   { from{opacity:0;} to{opacity:1;} }
    @keyframes float1   { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(14px,-22px) scale(1.04);} }
    @keyframes float2   { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-12px,18px);} }
    @keyframes spin     { to{transform:rotate(360deg);} }
    @keyframes spin-slow{ to{transform:rotate(360deg);} }
    @keyframes checkPop { 0%{transform:scale(0);opacity:0;} 70%{transform:scale(1.2);opacity:1;} 100%{transform:scale(1);opacity:1;} }
    @keyframes ripple   { 0%{transform:scale(1);opacity:0.5;} 100%{transform:scale(2.4);opacity:0;} }
    @keyframes gradShift{ 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
    @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
    @keyframes float-icon{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

    .ls-card { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }

    .ls-input {
      width:100%; padding:11px 14px 11px 40px;
      border:1.5px solid ${dk?'#475569':'#e0e7ff'}; border-radius:10px;
      font-size:13px; font-family:'DM Sans',sans-serif;
      color:${dk?'#e2e8f0':'#1e293b'}; background:${dk?'#0f172a':'#fafbff'}; outline:none;
      transition:all 0.2s ease;
    }
    @media (min-width: 640px) {
      .ls-input { padding:13px 16px 13px 44px; border-radius:12px; font-size:14px; }
    }
    .ls-input:focus {
      border-color:var(--accent);
      background:${dk?'#1e293b':'#fff'};
      box-shadow:0 0 0 4px ${dk?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.12)'};
    }
    .ls-input.err { border-color:#f87171; box-shadow:0 0 0 3px rgba(248,113,113,0.15); }
    .ls-input::placeholder { color:${dk?'#475569':'#cbd5e1'}; }

    .ls-label {
      display:block; font-size:11.5px; font-weight:700;
      color:var(--accent); margin-bottom:7px;
      letter-spacing:0.7px; text-transform:uppercase;
      font-family:'DM Sans',sans-serif;
    }

    .ls-btn-primary {
      width:100%; padding:12px;
      background:linear-gradient(135deg,var(--gradient-from),var(--gradient-to));
      background-size:200% 200%;
      color:#fff; border:none; border-radius:10px;
      font-size:14px; font-weight:700;
      font-family:'DM Sans',sans-serif; cursor:pointer;
      box-shadow:0 6px 24px rgba(37,99,235,0.35);
      transition:all 0.25s ease;
      display:flex; align-items:center; justify-content:center; gap:9px;
      animation: gradShift 4s ease infinite;
    }
    @media (min-width: 640px) { .ls-btn-primary { padding:14px; border-radius:12px; font-size:15px; } }
    .ls-btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(37,99,235,0.45); }
    .ls-btn-primary:disabled { opacity:0.7; cursor:not-allowed; }

    .ls-btn-google {
      width:100%; padding:11px; color:${dk?'#e2e8f0':'#334155'};
      background:${dk?'#0f172a':'#fff'};
      border:1.5px solid ${dk?'#475569':'#e0e7ff'}; border-radius:10px;
      font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif;
      cursor:pointer; box-shadow:0 2px 8px ${dk?'rgba(0,0,0,0.2)':'rgba(0,0,0,0.05)'};
      transition:all 0.2s ease;
      display:flex; align-items:center; justify-content:center; gap:9px;
    }
    @media (min-width: 640px) { .ls-btn-google { padding:13px; border-radius:12px; font-size:14px; } }
    .ls-btn-google:hover:not(:disabled) {
      border-color:var(--accent-border);
      box-shadow:0 4px 16px ${dk?'rgba(99,102,241,0.2)':'rgba(99,102,241,0.15)'};
      transform:translateY(-1px);
    }
    .ls-btn-google:disabled { opacity:0.7; cursor:not-allowed; }

    .tab-pill {
      flex:1; padding:10px 0; border:none; border-radius:10px;
      font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600;
      cursor:pointer; transition:all 0.25s;
      color:${dk?'#94a3b8':'#64748b'}; background:transparent;
    }
    .tab-pill.active {
      background:linear-gradient(135deg,var(--gradient-from),var(--gradient-to));
      color:#fff;
      box-shadow:0 4px 14px rgba(37,99,235,0.35);
    }
    .tab-pill:not(.active):hover { background:${dk?'rgba(255,255,255,0.05)':'#eef2ff'}; color:var(--accent); }

    .spinner { width:17px; height:17px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; flex-shrink:0; }
    .spinner-indigo { width:15px; height:15px; border:2.5px solid rgba(99,102,241,0.2); border-top-color:var(--accent); border-radius:50%; animation:spin 0.7s linear infinite; flex-shrink:0; }

    .check-icon { animation:checkPop 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .ripple-ring { position:absolute; inset:-5px; border-radius:50%; border:2.5px solid var(--accent); animation:ripple 1.3s ease-out infinite; }

    .pw-toggle { position:absolute; right:13px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:${dk?'#64748b':'#94a3b8'}; display:flex; align-items:center; transition:color 0.15s; padding:0; }
    .pw-toggle:hover { color:var(--accent); }

    .back-btn {
      position:fixed; top:12px; left:12px; z-index:50;
      display:flex; align-items:center; gap:4px;
      background:${dk?'#1e293b':'white'}; border:1.5px solid ${dk?'#475569':'#e0e7ff'}; border-radius:10px;
      padding:6px 12px; font-size:12px; font-weight:600; color:var(--accent);
      cursor:pointer; box-shadow:0 2px 12px ${dk?'rgba(0,0,0,0.3)':'rgba(99,102,241,0.10)'};
      transition:all 0.2s; font-family:'DM Sans',sans-serif;
    }
    @media (min-width: 640px) { .back-btn { top:20px; left:20px; gap:6px; border-radius:12px; padding:8px 16px; font-size:13.5px; } }
    .back-btn:hover { background:${dk?'#334155':'#eef2ff'}; border-color:var(--accent-border); transform:translateY(-1px); }

    .feature-pill {
      display:inline-flex; align-items:center; gap:5px;
      font-size:12px; font-weight:600; color:var(--accent);
      padding:4px 12px; border-radius:999px;
      background:${dk?'rgba(99,102,241,0.08)':'rgba(99,102,241,0.08)'}; border:1px solid ${dk?'rgba(99,102,241,0.2)':'rgba(99,102,241,0.15)'};
    }

    .loader-bg { background:${dk?'#0f172a':'linear-gradient(135deg,var(--primary-bg),var(--accent-light))'}; }
    .loader-icon { animation:float-icon 2s ease-in-out infinite; }
    .loader-pulse { animation:pulse 1.5s ease-in-out infinite; }
    .loader-ring { width:52px; height:52px; border:4px solid ${dk?'#334155':'var(--primary-light)'}; border-top-color:var(--accent); border-radius:50%; animation:spin 0.8s linear infinite; }
  `}</style>
);

const Blobs = ({ dk }) => (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <div style={{ position:'absolute', top:'-8%', left:'-6%', width:380, height:380, borderRadius:'50%', background:`radial-gradient(circle,${dk?'rgba(37,99,235,0.04)':'rgba(37,99,235,0.09)'} 0%,transparent 70%)`, animation:'float1 8s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', bottom:'-6%', right:'-5%', width:440, height:440, borderRadius:'50%', background:`radial-gradient(circle,${dk?'rgba(124,58,237,0.04)':'rgba(124,58,237,0.08)'} 0%,transparent 70%)`, animation:'float2 10s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', top:'35%', right:'5%', width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle,${dk?'rgba(99,102,241,0.03)':'rgba(99,102,241,0.07)'} 0%,transparent 70%)`, animation:'float1 7s ease-in-out 1s infinite' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(99,102,241,${dk?'0.015':'0.03'}) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,${dk?'0.015':'0.03'}) 1px,transparent 1px)`, backgroundSize:'44px 44px' }}/>
        <div style={{ position:'absolute', top:'10%', right:'10%', width:70, height:70, borderRadius:'50%', border:`2px dashed ${dk?'rgba(99,102,241,0.08)':'rgba(99,102,241,0.15)'}`, animation:'spin-slow 18s linear infinite' }}/>
        <div style={{ position:'absolute', bottom:'15%', left:'8%', width:45, height:45, borderRadius:'50%', border:`2px dashed ${dk?'rgba(37,99,235,0.06)':'rgba(37,99,235,0.12)'}`, animation:'spin-slow 12s linear reverse infinite' }}/>
    </div>
);

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const IconEye = ({ off }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {off ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
             : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
    </svg>
);

const Field = ({ label, icon, type='text', placeholder, value, onChange, error, showToggle, showPw, onTogglePw }) => (
    <div style={{ marginBottom:16 }}>
        <label className="ls-label">{label}</label>
        <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
            <span style={{ position:'absolute', left:14, display:'flex', alignItems:'center', pointerEvents:'none' }}>{icon}</span>
            <input className={`ls-input${error?' err':''}`} type={showToggle?(showPw?'text':'password'):type}
                placeholder={placeholder} value={value} onChange={onChange} autoComplete="off"
                style={{ paddingRight: showToggle ? 44 : 16 }}/>
            {showToggle && <button type="button" className="pw-toggle" onClick={onTogglePw}><IconEye off={showPw}/></button>}
        </div>
        {error && <p style={{ margin:'5px 0 0', fontSize:12, color:'#ef4444', fontFamily:"'DM Sans',sans-serif" }}>{error}</p>}
    </div>
);

const formatError = (msg='') => {
    if (msg.includes('email-already-in-use'))  return 'This email is already registered.';
    if (msg.includes('wrong-password'))         return 'Incorrect password. Please try again.';
    if (msg.includes('user-not-found'))         return 'No account found with this email.';
    if (msg.includes('weak-password'))          return 'Password must be at least 6 characters.';
    if (msg.includes('invalid-email'))          return 'Please enter a valid email address.';
    if (msg.includes('too-many-requests'))      return 'Too many attempts. Please wait a moment.';
    if (msg.includes('popup-closed-by-user'))   return 'Google sign-in was cancelled.';
    if (msg.includes('invalid-credential'))     return 'Incorrect email or password.';
    return 'Something went wrong. Please try again.';
};

const LoginSignup = () => {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const dk = darkMode;
    const [tab,      setTab]      = useState('login');
    const [loading,  setLoading]  = useState(false);
    const [gLoading, setGLoading] = useState(false);
    const [done,     setDone]     = useState(false);
    const [showPw,   setShowPw]   = useState(false);
    const [showCPw,  setShowCPw]  = useState(false);
    const [form,     setForm]     = useState({ name:'', email:'', password:'', confirm:'' });
    const [errors,   setErrors]   = useState({});
    const [apiErr,   setApiErr]   = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => { if (user) navigate('/', { replace:true }); });
        return () => unsub();
    }, [navigate]);

    const set = (f) => (e) => { setForm(p=>({...p,[f]:e.target.value})); setErrors(p=>({...p,[f]:''})); setApiErr(''); };

    const validate = () => {
        const e = {};
        if (tab==='signup' && !form.name.trim())              e.name     = 'Full name is required.';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email    = 'Enter a valid email address.';
        if (form.password.length < 6)                         e.password = 'Min. 6 characters required.';
        if (tab==='signup' && form.password!==form.confirm)   e.confirm  = 'Passwords do not match.';
        setErrors(e); return Object.keys(e).length === 0;
    };

    const onSuccess = () => { setDone(true); setTimeout(() => { window.location.href = '/'; }, 2200); };

    const handleSubmit = async (e) => {
        e.preventDefault(); if (!validate()) return;
        setLoading(true); setApiErr('');
        try {
            if (tab==='login') { await signInWithEmailAndPassword(auth, form.email, form.password); onSuccess(); }
            else {
                const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
                await updateProfile(user, { displayName: form.name });
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { to_name:form.name, to_email:form.email }, EMAILJS_PUBLIC_KEY).catch(console.warn);
                onSuccess();
            }
        } catch(err) { setApiErr(formatError(err.message)); } finally { setLoading(false); }
    };

    const handleGoogle = async () => {
        setGLoading(true); setApiErr('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (result._tokenResponse?.isNewUser)
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { to_name:result.user.displayName||'there', to_email:result.user.email }, EMAILJS_PUBLIC_KEY).catch(console.warn);
            onSuccess();
        } catch(err) { setApiErr(formatError(err.message)); } finally { setGLoading(false); }
    };

    const switchTab = (t) => { setTab(t); setErrors({}); setApiErr(''); setDone(false); setForm({name:'',email:'',password:'',confirm:''}); };

    if (loading || gLoading) return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 loader-bg"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>
            <Styles dk={dk}/>
            <div className="loader-icon mb-5 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background:`linear-gradient(135deg,var(--gradient-from),var(--gradient-to))`, boxShadow:'0 8px 32px rgba(37,99,235,0.35)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            </div>
            <div className="loader-ring mb-4"/>
            <p className="loader-pulse font-bold text-sm tracking-widest uppercase" style={{ color:'var(--accent)' }}>
                {gLoading ? 'Connecting with Google...' : tab==='login' ? 'Signing you in...' : 'Creating your account...'}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen transition-colors duration-300" style={{
            fontFamily:"'DM Sans',sans-serif",
            background: dk ? '#0f172a' : 'linear-gradient(135deg,#f0f7ff 0%,#eef2ff 50%,#f5f3ff 100%)',
            position:'relative',
        }}>
            <Styles dk={dk}/>
            <Blobs dk={dk}/>

            <button className="back-btn" onClick={() => navigate(-1)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
            </button>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'16px 12px', position:'relative', zIndex:1 }}>

                <div className="ls-card" style={{
                    width:'100%', maxWidth:440, borderRadius:20, overflow:'hidden',
                    boxShadow: dk ? '0 12px 50px rgba(0,0,0,0.4)' : '0 12px 50px rgba(99,102,241,0.15), 0 4px 12px rgba(0,0,0,0.06)',
                }}>

                    <div style={{ height:5, background:`linear-gradient(90deg,var(--primary-dark),var(--accent),var(--gradient-to),var(--accent),var(--primary-dark))`, backgroundSize:'200% 100%', animation:'gradShift 4s ease infinite' }}/>

                    <div style={{ background: dk ? '#1e293b' : 'white', padding:'24px 20px 28px' }} className="sm:!p-[36px_40px_40px]">

                        <div style={{ textAlign:'center', marginBottom:28 }}>
                            <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:56, height:56, borderRadius:16, background:`linear-gradient(135deg,var(--gradient-from),var(--gradient-to))`, marginBottom:14, boxShadow:'0 6px 20px rgba(99,102,241,0.40)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                                </svg>
                            </div>
                            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, color: dk ? '#f1f5f9' : '#0f172a', marginBottom:6, letterSpacing:-0.3 }} className="text-lg sm:text-[22px]">
                                MyResume.io
                            </h2>
                            <p style={{ fontSize:13.5, color: dk ? '#94a3b8' : '#64748b' }}>
                                {tab==='login' ? 'Welcome back! Sign in to continue.' : 'Create your free account today.'}
                            </p>
                        </div>

                        <div style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', marginBottom:24 }}>
                            {['✓ Free', '✓ Instant PDF', '✓ Pro Templates'].map((f,i) => (
                                <span key={i} className="feature-pill">{f}</span>
                            ))}
                        </div>

                        <div style={{ display:'flex', gap:4, background: dk ? '#0f172a' : '#f1f5f9', borderRadius:13, padding:4, marginBottom:26 }}>
                            <button className={`tab-pill${tab==='login'?' active':''}`} onClick={()=>switchTab('login')}>Sign In</button>
                            <button className={`tab-pill${tab==='signup'?' active':''}`} onClick={()=>switchTab('signup')}>Create Account</button>
                        </div>

                        {done ? (
                            <div style={{ textAlign:'center', padding:'32px 0' }}>
                                <div style={{ position:'relative', width:72, height:72, margin:'0 auto 20px' }}>
                                    <div style={{ width:72, height:72, borderRadius:'50%', background: dk ? 'rgba(99,102,241,0.1)' : 'linear-gradient(135deg,var(--primary-bg),var(--accent-light))', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${dk ? '#475569' : 'var(--accent-light)'}` }}>
                                        <svg className="check-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                    </div>
                                    <div className="ripple-ring"/>
                                </div>
                                <p style={{ fontSize:18, fontWeight:800, color: dk ? '#f1f5f9' : '#0f172a', marginBottom:8, fontFamily:"'Poppins',sans-serif" }}>
                                    {tab==='login' ? 'Welcome back! 👋' : 'Account created! 🎉'}
                                </p>
                                <p style={{ fontSize:13.5, color: dk ? '#94a3b8' : '#64748b' }}>
                                    {tab==='signup' ? '✉️ Check your inbox! Redirecting…' : 'Redirecting you now…'}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                {apiErr && (
                                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, background: dk ? 'rgba(239,68,68,0.1)' : '#fef2f2', border:`1.5px solid ${dk ? 'rgba(248,113,113,0.3)' : '#fca5a5'}`, borderRadius:10, padding:'11px 14px', marginBottom:18 }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0, marginTop:1 }}>
                                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                        </svg>
                                        <span style={{ fontSize:13, color:'#ef4444' }}>{apiErr}</span>
                                    </div>
                                )}

                                {tab==='signup' && <Field label="Full Name" icon={<IconUser/>} placeholder="e.g. Ankit Ameta" value={form.name} onChange={set('name')} error={errors.name}/>}
                                <Field label="Email Address" icon={<IconMail/>} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} error={errors.email}/>
                                <Field label="Password" icon={<IconLock/>} placeholder={tab==='signup'?'Min. 6 characters':'Enter your password'}
                                    value={form.password} onChange={set('password')} error={errors.password} showToggle showPw={showPw} onTogglePw={()=>setShowPw(p=>!p)}/>
                                {tab==='signup' && <Field label="Confirm Password" icon={<IconLock/>} placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} showToggle showPw={showCPw} onTogglePw={()=>setShowCPw(p=>!p)}/>}

                                {tab==='login' && (
                                    <div style={{ textAlign:'right', marginTop:-8, marginBottom:20 }}>
                                        <span style={{ fontSize:12.5, cursor:'pointer', fontWeight:600, color:'var(--accent)' }}>Forgot password?</span>
                                    </div>
                                )}

                                {tab==='signup' && (
                                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:20, marginTop:4 }}>
                                        <input type="checkbox" id="terms" required style={{ marginTop:3, accentColor:'var(--accent)', width:15, height:15, flexShrink:0, cursor:'pointer' }}/>
                                        <label htmlFor="terms" style={{ fontSize:12.5, color: dk ? '#94a3b8' : '#64748b', lineHeight:1.6, cursor:'pointer' }}>
                                            I agree to the <span style={{ fontWeight:700, color:'var(--accent)', cursor:'pointer' }}>Terms of Service</span> and <span style={{ fontWeight:700, color:'var(--accent)', cursor:'pointer' }}>Privacy Policy</span>
                                        </label>
                                    </div>
                                )}

                                <button type="submit" className="ls-btn-primary" style={{ marginBottom:14 }}>
                                    {tab==='login' ? 'Sign In' : 'Create Account'}
                                </button>

                                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                                    <div style={{ flex:1, height:1, background: dk ? '#334155' : '#e0e7ff' }}/>
                                    <span style={{ fontSize:12.5, color:'#94a3b8', fontWeight:500, whiteSpace:'nowrap' }}>or continue with</span>
                                    <div style={{ flex:1, height:1, background: dk ? '#334155' : '#e0e7ff' }}/>
                                </div>

                                <button type="button" className="ls-btn-google" onClick={handleGoogle}>
                                    <GoogleIcon/> Continue with Google
                                </button>
                            </form>
                        )}

                        {!done && (
                            <p style={{ textAlign:'center', marginTop:24, fontSize:13.5, color: dk ? '#94a3b8' : '#64748b' }}>
                                {tab==='login' ? "Don't have an account? " : 'Already have an account? '}
                                <span style={{ fontWeight:700, cursor:'pointer', color:'var(--accent)' }}
                                    onClick={()=>switchTab(tab==='login'?'signup':'login')}>
                                    {tab==='login' ? 'Sign up free →' : '← Sign in'}
                                </span>
                            </p>
                        )}
                    </div>

                    <div style={{ background: dk ? '#0f172a' : 'linear-gradient(135deg,#f5f3ff,var(--primary-bg))', borderTop:`1px solid ${dk ? '#334155' : 'var(--accent-light)'}`, padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={dk ? '#475569' : '#a5b4fc'} strokeWidth="2.5" strokeLinecap="round">
                            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span style={{ fontSize:12, color: dk ? '#475569' : '#94a3b8', fontWeight:500 }}>Secured by Firebase Authentication</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;