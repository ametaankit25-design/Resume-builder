import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, GraduationCap, Zap, FileText, ChevronRight, ChevronLeft, Plus, X, Check } from "lucide-react";

const steps = [
  { label: "Personal",   icon: User },
  { label: "Experience", icon: Briefcase },
  { label: "Education",  icon: GraduationCap },
  { label: "Skills",     icon: Zap },
  { label: "Summary",    icon: FileText },
];

const FormC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "", role: "", email: "", phone: "", location: "", website: "",
    company: "", jobTitle: "", startDate: "", endDate: "", jobDesc: "",
    school: "", degree: "", gradYear: "",
    summary: "", skill: "",
  });
  const [skills, setSkills] = useState([]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addSkill = () => {
    if (form.skill.trim()) {
      setSkills([...skills, form.skill.trim()]);
      setForm({ ...form, skill: "" });
    }
  };

  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));

  const handlePreview = () => {
    setLoading(true);
    setTimeout(() => navigate("/FinalPage", { state: { formData: form, skills } }), 1500);
  };

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .loader-ring { width:52px; height:52px; border:4px solid #dbeafe; border-top-color:#2563eb; border-radius:50%; animation:spin 0.8s linear infinite; }
        .pulse-text { animation:pulse 1.5s ease-in-out infinite; }
        .icon-float { animation:float 2s ease-in-out infinite; }
      `}</style>
      <div className="icon-float mb-5 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background:'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow:'0 8px 32px rgba(37,99,235,0.35)' }}>
        <FileText size={28} color="white" />
      </div>
      <div className="loader-ring mb-4" />
      <p className="pulse-text font-bold text-sm tracking-widest uppercase" style={{ color:'#2563eb' }}>Preparing Preview...</p>
      <p className="text-gray-400 text-xs mt-1">Generating your resume</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0f7ff 0%, #eef2ff 50%, #f5f3ff 100%)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes spin-slow { to{transform:rotate(360deg);} }

        .form-card { animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }

        .form-input {
          width:100%; padding:12px 16px;
          border:1.5px solid #e0e7ff; border-radius:12px;
          font-size:13.5px; font-family:'DM Sans',sans-serif;
          color:#1e293b; background:white; outline:none;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color:#2563eb;
          box-shadow:0 0 0 4px rgba(37,99,235,0.10);
        }
        .form-input::placeholder { color:#cbd5e1; }

        .form-label {
          display:block; font-size:11px; font-weight:700;
          color:#6366f1; margin-bottom:6px;
          letter-spacing:0.8px; text-transform:uppercase;
        }

        .step-item { transition: all 0.3s ease; cursor:pointer; }
        .step-item:hover .step-icon-wrap { transform: scale(1.08); }

        .nav-btn-primary {
          background:linear-gradient(135deg,#2563eb,#7c3aed);
          border:none; border-radius:999px;
          padding:12px 28px; color:white;
          font-weight:700; font-size:14px;
          cursor:pointer; display:inline-flex; align-items:center; gap:8px;
          transition:all 0.3s ease; font-family:'DM Sans',sans-serif;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        .nav-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(37,99,235,0.4); }

        .nav-btn-back {
          background:white; border:1.5px solid #e0e7ff; border-radius:999px;
          padding:11px 22px; color:#6366f1;
          font-weight:600; font-size:14px;
          cursor:pointer; display:inline-flex; align-items:center; gap:6px;
          transition:all 0.2s ease; font-family:'DM Sans',sans-serif;
        }
        .nav-btn-back:hover { border-color:#a5b4fc; background:#f5f3ff; }

        .skill-tag {
          display:inline-flex; align-items:center; gap:6px;
          background:linear-gradient(135deg,#eff6ff,#eef2ff);
          border:1.5px solid #c7d2fe; border-radius:999px;
          padding:6px 14px; font-size:12.5px; font-weight:600; color:#4f46e5;
        }
      `}</style>

      {/* Decorative bg elements */}
      <div style={{ position:'fixed', top:-80, left:-80, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', bottom:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', top:'35%', right:'2%', width:60, height:60, borderRadius:'50%', border:'2px dashed rgba(99,102,241,0.15)', animation:'spin-slow 16s linear infinite', pointerEvents:'none' }}/>

      {!done ? (
        <div className="max-w-2xl mx-auto px-4 pb-24 pt-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background:'white', border:'1.5px solid #e0e7ff', boxShadow:'0 2px 8px rgba(99,102,241,0.08)' }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#6366f1', letterSpacing:1 }}>RESUME BUILDER</span>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:900, color:'#0f172a', marginBottom:8 }}>
              Let's Build Your Resume
            </h1>
            <p style={{ color:'#94a3b8', fontSize:14 }}>Fill in each section below — takes about 3 minutes</p>
          </div>

          {/* Step progress */}
          <div className="flex items-center justify-between mb-10 px-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div key={i} className="step-item flex flex-col items-center gap-1.5" onClick={() => i < step && setStep(i)}>
                  <div className="step-icon-wrap flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                    style={{
                      background: isDone ? 'linear-gradient(135deg,#2563eb,#7c3aed)' : isActive ? 'linear-gradient(135deg,#2563eb,#7c3aed)' : 'white',
                      border: isActive || isDone ? 'none' : '1.5px solid #e0e7ff',
                      boxShadow: isActive ? '0 4px 16px rgba(37,99,235,0.35)' : isDone ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
                    }}>
                    {isDone
                      ? <Check size={16} color="white" strokeWidth={3} />
                      : <Icon size={16} color={isActive ? 'white' : '#94a3b8'} />
                    }
                  </div>
                  <span style={{ fontSize:10.5, fontWeight: isActive ? 700 : 500, color: isActive ? '#4f46e5' : isDone ? '#2563eb' : '#94a3b8', letterSpacing:0.3 }}>
                    {s.label}
                  </span>
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div style={{
                      position:'absolute', display:'none',
                    }}/>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full mb-8" style={{ background:'#e0e7ff' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width:`${((step + 1) / steps.length) * 100}%`, background:'linear-gradient(90deg,#2563eb,#7c3aed)' }}/>
          </div>

          {/* Step label */}
          <div className="flex items-center gap-3 mb-6">
            {(() => { const Icon = steps[step].icon; return <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#2563eb,#7c3aed)' }}><Icon size={16} color="white"/></div>; })()}
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:'#6366f1', letterSpacing:1, textTransform:'uppercase' }}>Step {step + 1} of {steps.length}</p>
              <h2 style={{ fontSize:'1.2rem', fontWeight:800, color:'#0f172a' }}>{steps[step].label}</h2>
            </div>
          </div>

          {/* Form card */}
          <div className="form-card rounded-3xl p-8" style={{
            background:'white',
            boxShadow:'0 8px 40px rgba(99,102,241,0.10), 0 1px 3px rgba(0,0,0,0.04)',
            border:'1px solid rgba(224,231,255,0.8)',
          }}>

            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Full Name</label><input className="form-input" name="fullName" value={form.fullName} onChange={set} placeholder="Jane Doe" /></div>
                  <div><label className="form-label">Professional Title</label><input className="form-input" name="role" value={form.role} onChange={set} placeholder="UX Designer" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Email</label><input className="form-input" name="email" value={form.email} onChange={set} placeholder="jane@email.com" /></div>
                  <div><label className="form-label">Phone</label><input className="form-input" name="phone" value={form.phone} onChange={set} placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Location</label><input className="form-input" name="location" value={form.location} onChange={set} placeholder="New York, NY" /></div>
                  <div><label className="form-label">Website / LinkedIn</label><input className="form-input" name="website" value={form.website} onChange={set} placeholder="janedoe.com" /></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Company</label><input className="form-input" name="company" value={form.company} onChange={set} placeholder="Acme Inc." /></div>
                  <div><label className="form-label">Job Title</label><input className="form-input" name="jobTitle" value={form.jobTitle} onChange={set} placeholder="Lead Designer" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Start Date</label><input className="form-input" name="startDate" value={form.startDate} onChange={set} placeholder="Jan 2021" /></div>
                  <div><label className="form-label">End Date</label><input className="form-input" name="endDate" value={form.endDate} onChange={set} placeholder="Present" /></div>
                </div>
                <div>
                  <label className="form-label">Key Responsibilities</label>
                  <textarea className="form-input resize-none" rows={5} name="jobDesc" value={form.jobDesc} onChange={set} placeholder="• Led a team of 5 designers&#10;• Increased conversion by 30%&#10;• Built design system from scratch" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div><label className="form-label">Institution</label><input className="form-input" name="school" value={form.school} onChange={set} placeholder="Yale University" /></div>
                <div><label className="form-label">Degree / Field of Study</label><input className="form-input" name="degree" value={form.degree} onChange={set} placeholder="B.F.A. Graphic Design" /></div>
                <div className="w-1/2"><label className="form-label">Graduation Year</label><input className="form-input" name="gradYear" value={form.gradYear} onChange={set} placeholder="2019" /></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="flex gap-3">
                  <input
                    className="form-input flex-1"
                    name="skill" value={form.skill} onChange={set}
                    placeholder="e.g. Figma, React, Python..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <button onClick={addSkill} className="nav-btn-primary" style={{ padding:'12px 20px', borderRadius:12 }}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.map((s, i) => (
                      <span key={i} className="skill-tag">
                        {s}
                        <button onClick={() => removeSkill(i)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', padding:0 }}>
                          <X size={13} color="#6366f1" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 rounded-2xl" style={{ border:'2px dashed #e0e7ff' }}>
                    <Zap size={28} color="#c7d2fe" style={{ margin:'0 auto 8px' }} />
                    <p style={{ color:'#94a3b8', fontSize:13 }}>Add your top skills above ↑</p>
                    <p style={{ color:'#c7d2fe', fontSize:11.5, marginTop:4 }}>Press Enter or click Add</p>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    className="form-input resize-none" rows={7}
                    name="summary" value={form.summary} onChange={set}
                    placeholder="A results-driven designer with 5+ years of experience crafting user-centered digital products. Passionate about clean design and measurable outcomes..."
                  />
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background:'#f5f3ff', border:'1px solid #e0e7ff' }}>
                  <span style={{ fontSize:16 }}>💡</span>
                  <p style={{ fontSize:12.5, color:'#6366f1', lineHeight:1.6 }}>
                    <strong>Pro tip:</strong> Keep it to 2–3 sentences. Lead with your years of experience, top skill, and a career achievement.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop:'1.5px solid #f0f4ff' }}>
              {step > 0 ? (
                <button className="nav-btn-back" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <button className="nav-btn-primary" onClick={() => setStep(step + 1)}>
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button className="nav-btn-primary" onClick={() => setDone(true)}>
                  <Check size={16} /> Finish
                </button>
              )}
            </div>
          </div>

          {/* Step labels row */}
          <div className="flex justify-center gap-1 mt-5">
            {steps.map((s, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === step ? '#4f46e5' : i < step ? '#a5b4fc' : '#e0e7ff', transform: i === step ? 'scale(1.3)' : 'scale(1)' }} />
            ))}
          </div>
        </div>

      ) : (
        /* Done state */
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="form-card rounded-3xl p-12" style={{
            background:'white',
            boxShadow:'0 8px 40px rgba(99,102,241,0.12)',
            border:'1px solid rgba(224,231,255,0.8)',
          }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background:'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow:'0 8px 32px rgba(37,99,235,0.35)' }}>
              <Check size={36} color="white" strokeWidth={3} />
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', fontWeight:900, color:'#0f172a', marginBottom:8 }}>
              All Done! 🎉
            </h2>
            <p style={{ color:'#64748b', fontSize:14, lineHeight:1.7, marginBottom:32 }}>
              Your resume details are ready. Preview it with a template or go back to edit.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="nav-btn-back" onClick={() => { setDone(false); setStep(0); }}>
                Edit Again
              </button>
              <button className="nav-btn-primary" onClick={handlePreview}>
                Preview Resume <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormC;