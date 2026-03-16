import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Briefcase, GraduationCap, Zap, FileText, ChevronRight, ChevronLeft, Plus, X, Check } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { auth, db } from "../firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const steps = [
  { label: "Personal",   icon: User },
  { label: "Experience", icon: Briefcase },
  { label: "Education",  icon: GraduationCap },
  { label: "Skills",     icon: Zap },
  { label: "Summary",    icon: FileText },
];

const FormC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.formData;
  const editId = location.state?.editId;

  const [step, setStep] = useState(0);
  const { darkMode } = useTheme();
  const [form, setForm] = useState(initialData || {
    fullName: "", role: "", email: "", phone: "", location: "", website: "",
    company: "", jobTitle: "", startDate: "", endDate: "", jobDesc: "",
    school: "", degree: "", gradYear: "",
    summary: "", skill: "",
  });
  const [skills, setSkills] = useState(location.state?.skills || []);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addSkill = () => {
    if (form.skill.trim()) { setSkills([...skills, form.skill.trim()]); setForm({ ...form, skill: "" }); }
  };
  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));
  const saveToFirestore = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      const resumeData = {
        userId: user.uid,
        formData: form,
        skills,
        updatedAt: serverTimestamp(),
        title: form.role ? `${form.role} Resume` : 'My Resume'
      };
      if (editId) {
        await updateDoc(doc(db, "resumes", editId), resumeData);
        return editId;
      } else {
        const docRef = await addDoc(collection(db, "resumes"), { ...resumeData, createdAt: serverTimestamp() });
        return docRef.id;
      }
    } catch (error) {
      console.error("Error saving resume to Firestore: ", error);
      return null;
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    await saveToFirestore();
    setLoading(false);
    setDone(true);
  };

  const handlePreview = async () => {
    setLoading(true);
    const newId = await saveToFirestore();
    setTimeout(() => navigate("/FinalPage", { state: { formData: form, skills, editId: newId || editId } }), 500); // Reduced from 1000ms to 500ms
  };

  const dk = darkMode;

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 px-4"
      style={{ background: dk ? '#0f172a' : 'linear-gradient(135deg, var(--primary-bg), var(--accent-light))', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .loader-ring { width:52px; height:52px; border:4px solid ${dk?'#334155':'var(--primary-light)'}; border-top-color:var(--primary); border-radius:50%; animation:spin 0.8s linear infinite; }
        .pulse-text { animation:pulse 1.5s ease-in-out infinite; }
        .icon-float { animation:float 2s ease-in-out infinite; }
      `}</style>
      <div className="icon-float mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
        style={{ background:`linear-gradient(135deg,var(--gradient-from),var(--gradient-to))`, boxShadow:'0 8px 32px rgba(37,99,235,0.35)' }}>
        <FileText size={26} color="white" />
      </div>
      <div className="loader-ring mb-4" />
      <p className="pulse-text font-bold text-xs sm:text-sm tracking-widest uppercase" style={{ color:'var(--primary)' }}>Preparing Preview...</p>
      <p className="text-xs mt-1" style={{ color: dk ? '#64748b' : '#9ca3af' }}>Generating your resume</p>
    </div>
  );

  return (
    <div className="min-h-screen transition-colors duration-300" style={{
      background: dk ? '#0f172a' : 'linear-gradient(135deg, #f0f7ff 0%, var(--accent-light) 50%, #f5f3ff 100%)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes spin-slow { to{transform:rotate(360deg);} }
        .form-card { animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .form-input {
          width:100%; padding:11px 14px; border-radius:10px;
          font-size:13px; font-family:'DM Sans',sans-serif;
          outline:none; transition:border-color 0.2s, box-shadow 0.2s;
          border:1.5px solid ${dk?'#334155':'var(--accent-light)'};
          color:${dk?'#e2e8f0':'#1e293b'};
          background:${dk?'#1e293b':'white'};
        }
        @media (min-width: 640px) { .form-input { padding: 12px 16px; border-radius: 12px; font-size: 13.5px; } }
        .form-input:focus { border-color:var(--primary); box-shadow:0 0 0 4px ${dk?'rgba(37,99,235,0.15)':'rgba(37,99,235,0.10)'}; }
        .form-input::placeholder { color:${dk?'#475569':'#cbd5e1'}; }
        .form-label {
          display:block; font-size:10px; font-weight:700;
          color:var(--accent); margin-bottom:5px;
          letter-spacing:0.8px; text-transform:uppercase;
        }
        @media (min-width: 640px) { .form-label { font-size: 11px; margin-bottom: 6px; } }
        .step-item { transition: all 0.3s ease; cursor:pointer; }
        .step-item:hover .step-icon-wrap { transform: scale(1.08); }
        .nav-btn-primary {
          background:linear-gradient(135deg,var(--gradient-from),var(--gradient-to));
          border:none; border-radius:999px;
          padding:10px 20px; color:white;
          font-weight:700; font-size:13px;
          cursor:pointer; display:inline-flex; align-items:center; gap:6px;
          transition:all 0.3s ease; font-family:'DM Sans',sans-serif;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        @media (min-width: 640px) { .nav-btn-primary { padding: 12px 28px; font-size: 14px; gap: 8px; } }
        .nav-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(37,99,235,0.4); }
        .nav-btn-back {
          background:${dk?'#1e293b':'white'}; border:1.5px solid ${dk?'#334155':'var(--accent-light)'}; border-radius:999px;
          padding:9px 16px; color:var(--accent);
          font-weight:600; font-size:13px;
          cursor:pointer; display:inline-flex; align-items:center; gap:5px;
          transition:all 0.2s ease; font-family:'DM Sans',sans-serif;
        }
        @media (min-width: 640px) { .nav-btn-back { padding: 11px 22px; font-size: 14px; gap: 6px; } }
        .nav-btn-back:hover { border-color:var(--accent-border); background:${dk?'#334155':'#f5f3ff'}; }
        .skill-tag {
          display:inline-flex; align-items:center; gap:6px;
          background:${dk?'rgba(255,255,255,0.05)':'linear-gradient(135deg,var(--primary-bg),var(--accent-light))'};
          border:1.5px solid ${dk?'rgba(255,255,255,0.1)':'var(--accent-border)'}; border-radius:999px;
          padding:5px 12px; font-size:11.5px; font-weight:600; color:var(--accent);
        }
        @media (min-width: 640px) { .skill-tag { padding: 6px 14px; font-size: 12.5px; } }
      `}</style>

      <div className="hidden md:block" style={{ position:'fixed', top:-80, left:-80, width:320, height:320, borderRadius:'50%', background:`radial-gradient(circle,${dk?'rgba(37,99,235,0.04)':'rgba(37,99,235,0.07)'} 0%,transparent 70%)`, pointerEvents:'none' }}/>
      <div className="hidden md:block" style={{ position:'fixed', bottom:-60, right:-60, width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle,${dk?'rgba(124,58,237,0.04)':'rgba(124,58,237,0.07)'} 0%,transparent 70%)`, pointerEvents:'none' }}/>

      {!done ? (
        <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-16 sm:pb-24 pt-6 sm:pt-10">
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4"
              style={{ background: dk ? 'rgba(255,255,255,0.05)' : 'white', border: `1.5px solid ${dk ? 'rgba(255,255,255,0.1)' : 'var(--accent-light)'}`, boxShadow: `0 2px 8px ${dk ? 'rgba(0,0,0,0.2)' : 'rgba(99,102,241,0.08)'}` }}>
              <span style={{ fontSize:10, fontWeight:700, color:'var(--accent)', letterSpacing:1 }} className="sm:text-[11px]">RESUME BUILDER</span>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, color: dk ? '#f1f5f9' : '#0f172a', marginBottom:8 }}
              className="text-xl sm:text-2xl md:text-[2rem]">
              Let's Build Your Resume
            </h1>
            <p style={{ color: dk ? '#64748b' : '#94a3b8' }} className="text-xs sm:text-sm">Fill in each section below — takes about 3 minutes</p>
          </div>

          <div className="flex items-center justify-between mb-6 sm:mb-10 px-0 sm:px-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div key={i} className="step-item flex flex-col items-center gap-1 sm:gap-1.5" onClick={() => i < step && setStep(i)}>
                  <div className="step-icon-wrap flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300"
                    style={{
                      background: isDone || isActive ? `linear-gradient(135deg,var(--gradient-from),var(--gradient-to))` : dk ? '#1e293b' : 'white',
                      border: isActive || isDone ? 'none' : `1.5px solid ${dk ? '#334155' : 'var(--accent-light)'}`,
                      boxShadow: isActive ? '0 4px 16px rgba(37,99,235,0.35)' : isDone ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
                    }}>
                    {isDone ? <Check size={14} color="white" strokeWidth={3} /> : <Icon size={14} color={isActive ? 'white' : dk ? '#64748b' : '#94a3b8'} />}
                  </div>
                  <span className="hidden sm:inline text-[10.5px]" style={{ fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--accent)' : isDone ? 'var(--primary)' : dk ? '#64748b' : '#94a3b8', letterSpacing:0.3 }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full h-1 sm:h-1.5 rounded-full mb-5 sm:mb-8" style={{ background: dk ? '#334155' : 'var(--accent-light)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width:`${((step + 1) / steps.length) * 100}%`, background:`linear-gradient(90deg,var(--gradient-from),var(--gradient-to))` }}/>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            {(() => { const Icon = steps[step].icon; return <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center" style={{ background:`linear-gradient(135deg,var(--gradient-from),var(--gradient-to))` }}><Icon size={14} color="white" /></div>; })()}
            <div>
              <p style={{ fontSize:10, fontWeight:700, color:'var(--accent)', letterSpacing:1, textTransform:'uppercase' }} className="sm:text-[11px]">Step {step + 1} of {steps.length}</p>
              <h2 style={{ fontWeight:800, color: dk ? '#f1f5f9' : '#0f172a' }} className="text-base sm:text-lg md:text-[1.2rem]">{steps[step].label}</h2>
            </div>
          </div>

          <div className="form-card rounded-2xl sm:rounded-3xl p-5 sm:p-8" style={{
            background: dk ? '#1e293b' : 'white',
            boxShadow: dk ? '0 8px 40px rgba(0,0,0,0.3)' : '0 8px 40px rgba(99,102,241,0.10), 0 1px 3px rgba(0,0,0,0.04)',
            border: `1px solid ${dk ? '#334155' : 'rgba(224,231,255,0.8)'}`,
          }}>

            {step === 0 && (
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="form-label">Full Name</label><input className="form-input" name="fullName" value={form.fullName} onChange={set} placeholder="Jane Doe" /></div>
                  <div><label className="form-label">Professional Title</label><input className="form-input" name="role" value={form.role} onChange={set} placeholder="UX Designer" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="form-label">Email</label><input className="form-input" name="email" value={form.email} onChange={set} placeholder="jane@email.com" /></div>
                  <div><label className="form-label">Phone</label><input className="form-input" name="phone" value={form.phone} onChange={set} placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="form-label">Location</label><input className="form-input" name="location" value={form.location} onChange={set} placeholder="New York, NY" /></div>
                  <div><label className="form-label">Website / LinkedIn</label><input className="form-input" name="website" value={form.website} onChange={set} placeholder="janedoe.com" /></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="form-label">Company</label><input className="form-input" name="company" value={form.company} onChange={set} placeholder="Acme Inc." /></div>
                  <div><label className="form-label">Job Title</label><input className="form-input" name="jobTitle" value={form.jobTitle} onChange={set} placeholder="Lead Designer" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="form-label">Start Date</label><input className="form-input" name="startDate" value={form.startDate} onChange={set} placeholder="Jan 2021" /></div>
                  <div><label className="form-label">End Date</label><input className="form-input" name="endDate" value={form.endDate} onChange={set} placeholder="Present" /></div>
                </div>
                <div>
                  <label className="form-label">Key Responsibilities</label>
                  <textarea className="form-input resize-none" rows={4} name="jobDesc" value={form.jobDesc} onChange={set} placeholder="• Led a team of 5 designers&#10;• Increased conversion by 30%" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-5">
                <div><label className="form-label">Institution</label><input className="form-input" name="school" value={form.school} onChange={set} placeholder="Yale University" /></div>
                <div><label className="form-label">Degree / Field of Study</label><input className="form-input" name="degree" value={form.degree} onChange={set} placeholder="B.F.A. Graphic Design" /></div>
                <div className="w-full sm:w-1/2"><label className="form-label">Graduation Year</label><input className="form-input" name="gradYear" value={form.gradYear} onChange={set} placeholder="2019" /></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input className="form-input flex-1" name="skill" value={form.skill} onChange={set} placeholder="e.g. Figma, React, Python..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                  <button onClick={addSkill} className="nav-btn-primary" style={{ padding:'10px 16px', borderRadius:12 }}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.map((s, i) => (
                      <span key={i} className="skill-tag">{s}
                        <button onClick={() => removeSkill(i)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', padding:0 }}>
                          <X size={13} color="var(--accent)" /></button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-10 rounded-2xl" style={{ border: `2px dashed ${dk ? '#334155' : 'var(--accent-light)'}` }}>
                    <Zap size={24} color={dk ? '#475569' : 'var(--accent-border)'} style={{ margin:'0 auto 8px' }} />
                    <p style={{ color: dk ? '#64748b' : '#94a3b8', fontSize:12 }}>Add your top skills above ↑</p>
                    <p style={{ color: dk ? '#334155' : 'var(--accent-border)', marginTop:4 }} className="text-[10px] sm:text-[11.5px]">Press Enter or click Add</p>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="form-label">Professional Summary</label>
                  <textarea className="form-input resize-none" rows={5} name="summary" value={form.summary} onChange={set}
                    placeholder="A results-driven designer with 5+ years of experience..." />
                </div>
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl"
                  style={{ background: dk ? 'rgba(255,255,255,0.03)' : '#f5f3ff', border: `1px solid ${dk ? '#334155' : 'var(--accent-light)'}` }}>
                  <span style={{ fontSize:14 }}>💡</span>
                  <p className="text-[11px] sm:text-[12.5px] leading-relaxed" style={{ color:'var(--accent)' }}>
                    <strong>Pro tip:</strong> Keep it to 2–3 sentences. Lead with your years of experience, top skill, and a career achievement.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6" style={{ borderTop: `1.5px solid ${dk ? '#334155' : '#f0f4ff'}` }}>
              {step > 0 ? (
                <button className="nav-btn-back" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={14} /> Back
                </button>
              ) : <div />}
              {step < steps.length - 1 ? (
                <button className="nav-btn-primary" onClick={() => setStep(step + 1)}>
                  Continue <ChevronRight size={14} />
                </button>
              ) : (
                <button className="nav-btn-primary" onClick={handleFinish}>
                  <Check size={14} /> Finish
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-1 mt-4 sm:mt-5">
            {steps.map((s, i) => (
              <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300"
                style={{ background: i === step ? 'var(--accent)' : i < step ? 'var(--accent-border)' : dk ? '#334155' : 'var(--accent-light)', transform: i === step ? 'scale(1.3)' : 'scale(1)' }} />
            ))}
          </div>
        </div>

      ) : (
        <div className="max-w-lg mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="form-card rounded-2xl sm:rounded-3xl p-8 sm:p-12" style={{
            background: dk ? '#1e293b' : 'white',
            boxShadow: dk ? '0 8px 40px rgba(0,0,0,0.3)' : '0 8px 40px rgba(99,102,241,0.12)',
            border: `1px solid ${dk ? '#334155' : 'rgba(224,231,255,0.8)'}`,
          }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
              style={{ background:`linear-gradient(135deg,var(--gradient-from),var(--gradient-to))`, boxShadow:'0 8px 32px rgba(37,99,235,0.35)' }}>
              <Check size={28} color="white" strokeWidth={3} />
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, color: dk ? '#f1f5f9' : '#0f172a', marginBottom:8 }}
              className="text-xl sm:text-2xl md:text-[1.8rem]">
              All Done! 🎉
            </h2>
            <p style={{ color: dk ? '#94a3b8' : '#64748b', lineHeight:1.7, marginBottom:24 }} className="text-xs sm:text-sm">
              Your resume details are ready. Preview it with a template or go back to edit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="nav-btn-back" onClick={() => { setDone(false); setStep(0); }}>Edit Again</button>
              <button className="nav-btn-primary" onClick={handlePreview}>Preview Resume <ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormC;