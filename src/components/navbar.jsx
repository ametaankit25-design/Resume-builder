import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../ThemeContext";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5" fill="none"/><circle cx="8.5" cy="7.5" r="2.5" fill="none"/><circle cx="6.5" cy="12.5" r="2.5" fill="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.24-.3-.39-.65-.39-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.5-9-10-9z"/>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { darkMode, toggleDark, theme, setTheme, themes } = useTheme();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const handler = () => { setDropOpen(false); setThemeOpen(false); };
    if (dropOpen || themeOpen) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [dropOpen, themeOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="py-3 px-4 sm:py-4 sm:px-6 flex items-center transition-colors duration-300"
      style={{
        position:'sticky',
        top: 0,
        zIndex:100,
        background: darkMode ? '#1e293b' : 'var(--primary-light)',
        color: darkMode ? '#e2e8f0' : 'var(--primary)',
      }}>

      {/* Logo */}
      <h1
        className="font-bold capitalize text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer select-none"
        style={{ fontFamily: 'Poppins', color: darkMode ? '#f1f5f9' : 'var(--primary)' }}
        onClick={() => navigate("/")}
      >
        MyResume.io
      </h1>

      {/* Desktop Nav links */}
      <div className="ml-auto hidden sm:flex items-center space-x-2 md:space-x-4 mr-2 md:mr-4" style={{ fontFamily: 'Poppins' }}>

        {/* Theme selector */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setThemeOpen(p => !p); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-0 transition-all duration-200 hover:scale-105"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              color: darkMode ? '#94a3b8' : 'var(--primary)',
            }}
            title="Change theme"
          >
            <PaletteIcon />
          </button>
          {themeOpen && (
            <div onClick={e => e.stopPropagation()}
              className="absolute top-12 right-0 z-50 rounded-xl overflow-hidden min-w-48 shadow-xl"
              style={{
                background: darkMode ? '#1e293b' : 'white',
                border: `1.5px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                boxShadow: darkMode ? '0 12px 40px rgba(0,0,0,0.4)' : '0 12px 40px rgba(99,102,241,0.15)',
              }}>
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${darkMode ? '#334155' : '#f1f5f9'}` }}>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>Color Theme</div>
              </div>
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => { setTheme(key); setThemeOpen(false); }}
                  className="w-full px-4 py-2.5 border-0 text-left text-sm cursor-pointer font-medium flex items-center gap-3 transition-colors"
                  style={{
                    background: theme === key ? (darkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc') : 'transparent',
                    color: darkMode ? '#e2e8f0' : '#334155',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.08)' : '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = theme === key ? (darkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc') : 'transparent'}
                >
                  <div className="flex gap-1.5">
                    <div style={{ width:16, height:16, borderRadius:'50%', background: t.primary, border: theme === key ? '2px solid white' : 'none', boxShadow: theme === key ? `0 0 0 2px ${t.primary}` : 'none' }} />
                    <div style={{ width:16, height:16, borderRadius:'50%', background: t.accent }} />
                  </div>
                  <span>{t.name}</span>
                  {theme === key && <span style={{ marginLeft:'auto', color: t.primary, fontWeight:700 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-0 transition-all duration-200 hover:scale-105"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            color: darkMode ? '#fbbf24' : '#64748b',
          }}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {!user && (
          <h4
            className="font-bold text-base md:text-xl cursor-pointer border-b-2 border-transparent transition duration-300 ml-2"
            style={{ color: darkMode ? '#e2e8f0' : 'var(--primary)' }}
            onClick={() => navigate("/loginPage")}
            onMouseEnter={e => e.currentTarget.style.borderBottomColor = darkMode ? '#e2e8f0' : 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
          >
            Login/Signup
          </h4>
        )}

        {/* Avatar + dropdown */}
        {user && (
          <div className="relative ml-2">
            <button
              onClick={(e) => { e.stopPropagation(); setDropOpen(p => !p); }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white shadow-lg text-white font-bold text-sm cursor-pointer flex items-center justify-center transition-transform hover:scale-105 overflow-hidden"
              style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))` }}
            >
              {user.photoURL
                ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                : initials}
            </button>

            {dropOpen && (
              <div
                onClick={e => e.stopPropagation()}
                className="absolute top-12 md:top-14 right-0 z-50 rounded-xl overflow-hidden min-w-56 shadow-xl"
                style={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#dbeafe'}`,
                }}
              >
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${darkMode ? '#334155' : '#f3f4f6'}` }}>
                  <div className="text-sm font-bold mb-1" style={{ fontFamily: 'Poppins', color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    {user.displayName || 'User'}
                  </div>
                  <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                    {user.email}
                  </div>
                </div>

                {[
                  {
                    label: 'My Resumes',
                    action: () => { navigate('/dashboard'); setDropOpen(false); },
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  },
                  {
                    label: 'Settings',
                    action: () => { navigate('/settings'); setDropOpen(false); },
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  },
                ].map(item => (
                  <button key={item.label} onClick={item.action}
                    className="w-full px-5 py-3 border-0 bg-transparent text-left text-sm cursor-pointer font-medium flex items-center gap-3 transition-colors"
                    style={{ color: darkMode ? '#cbd5e1' : '#475569' }}
                    onMouseEnter={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.05)' : '#f0f9ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}

                <div style={{ borderTop: `1px solid ${darkMode ? '#334155' : '#f3f4f6'}` }}>
                  <button onClick={handleLogout}
                    className="w-full px-5 py-3 border-0 bg-transparent text-left text-sm cursor-pointer font-semibold flex items-center gap-3 transition-colors text-red-600"
                    onMouseEnter={e => e.currentTarget.style.background = darkMode ? 'rgba(239,68,68,0.08)' : '#fef2f2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile: theme + dark toggle + hamburger */}
      <div className="ml-auto sm:hidden flex items-center gap-2">
        {/* Theme selector for mobile */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setThemeOpen(p => !p); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center border-0 cursor-pointer transition-all"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              color: darkMode ? '#94a3b8' : 'var(--primary)',
            }}
          >
            <PaletteIcon />
          </button>
          {themeOpen && (
            <div onClick={e => e.stopPropagation()}
              className="absolute top-11 right-0 z-50 rounded-xl overflow-hidden min-w-44 shadow-xl"
              style={{
                background: darkMode ? '#1e293b' : 'white',
                border: `1.5px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              }}>
              <div className="px-3 py-2" style={{ borderBottom: `1px solid ${darkMode ? '#334155' : '#f1f5f9'}` }}>
                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Theme</div>
              </div>
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => { setTheme(key); setThemeOpen(false); }}
                  className="w-full px-3 py-2 border-0 text-left text-xs cursor-pointer font-medium flex items-center gap-2 transition-colors"
                  style={{
                    background: theme === key ? (darkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc') : 'transparent',
                    color: darkMode ? '#e2e8f0' : '#334155',
                  }}
                >
                  <div style={{ width:14, height:14, borderRadius:'50%', background: t.primary, flexShrink:0 }} />
                  <span>{t.name}</span>
                  {theme === key && <span style={{ marginLeft:'auto', color: t.primary }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle for mobile */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-lg flex items-center justify-center border-0 cursor-pointer transition-all"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            color: darkMode ? '#fbbf24' : '#64748b',
          }}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Hamburger */}
        <button
          className="flex flex-col justify-center items-center w-9 h-9 rounded-lg border-0 cursor-pointer gap-1.5 transition-all"
          onClick={() => setMobileOpen(p => !p)}
          aria-label="Menu"
          style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: darkMode ? '#e2e8f0' : 'var(--primary)' }} />
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: darkMode ? '#e2e8f0' : 'var(--primary)' }} />
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: darkMode ? '#e2e8f0' : 'var(--primary)' }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b-2 shadow-xl z-50 sm:hidden"
          style={{
            fontFamily: 'Poppins',
            background: darkMode ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-bg) 100%)',
            borderColor: darkMode ? '#334155' : 'var(--primary-mid)',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
          <div className="flex flex-col px-4 py-3 gap-1">
            {!user && (
              <button
                className="w-full text-left px-4 py-3 text-base font-bold bg-transparent border-0 cursor-pointer rounded-xl transition-colors"
                style={{ color: darkMode ? '#e2e8f0' : 'var(--primary)', minHeight: '48px' }}
                onClick={() => { navigate("/loginPage"); setMobileOpen(false); }}
              >
                Login / Signup
              </button>
            )}
            {user && (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-1" style={{ borderBottom: `1px solid ${darkMode ? '#334155' : 'rgba(0,0,0,0.08)'}` }}>
                  <div className="w-9 h-9 rounded-full border-2 border-white shadow text-white font-bold text-sm flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))` }}>
                    {user.photoURL
                      ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                      : initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{user.displayName || 'User'}</div>
                    <div className="text-xs truncate max-w-[200px]" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{user.email}</div>
                  </div>
                </div>
                <button className="w-full text-left px-4 py-3 text-sm font-medium bg-transparent border-0 cursor-pointer rounded-xl transition-colors"
                  style={{ color: darkMode ? '#cbd5e1' : '#475569', minHeight: '48px' }}
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                  📄 My Resumes
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium bg-transparent border-0 cursor-pointer rounded-xl transition-colors"
                  style={{ color: darkMode ? '#cbd5e1' : '#475569', minHeight: '48px' }}
                  onClick={() => { navigate('/settings'); setMobileOpen(false); }}>
                  ⚙️ Settings
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-semibold bg-transparent border-0 cursor-pointer rounded-xl transition-colors text-red-600"
                  style={{ minHeight: '48px' }}
                  onClick={handleLogout}>
                  🚪 Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;