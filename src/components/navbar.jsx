import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const handler = () => setDropOpen(false);
    if (dropOpen) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [dropOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropOpen(false);
    navigate('/');
  };

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="bg-blue-100 text-blue-700 py-4 px-6 flex items-center" style={{ position:'relative', zIndex:10 }}>

      {/* Logo */}
      <h1
        className="font-bold capitalize text-3xl cursor-pointer select-none text-blue-700"
        style={{ fontFamily: 'Poppins' }}
        onClick={() => navigate("/")}
      >
        MyResume.io
      </h1>

      {/* Nav links */}
      <div className="ml-auto flex items-center space-x-8 mr-4" style={{ fontFamily: 'Poppins' }}>

        {!user && (
          <h4
            className="font-bold text-xl cursor-pointer border-b-2 border-transparent hover:border-blue-600 transition duration-300"
            onClick={() => navigate("/loginPage")}
          >
            Login/Signup
          </h4>
        )}

        {/* Avatar + dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setDropOpen(p => !p); }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 border-2 border-white shadow-lg shadow-blue-500/40 text-white font-bold text-sm cursor-pointer flex items-center justify-center transition-transform hover:scale-105 overflow-hidden"
            >
              {user.photoURL
                ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                : initials}
            </button>

            {dropOpen && (
              <div
                onClick={e => e.stopPropagation()}
                className="absolute top-14 right-0 z-50 rounded-xl overflow-hidden min-w-56 bg-white border border-blue-100 shadow-xl shadow-blue-500/15"
              >
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="text-sm font-bold mb-1 text-slate-800" style={{ fontFamily: 'Poppins' }}>
                    {user.displayName || 'User'}
                  </div>
                  <div className="text-xs text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.email}
                  </div>
                </div>

                {[
                  {
                    label: 'My Resumes',
                    action: () => { navigate('/'); setDropOpen(false); },
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  },
                  {
                    label: 'Settings',
                    action: () => { navigate('/settings'); setDropOpen(false); },
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  },
                ].map(item => (
                  <button key={item.label} onClick={item.action}
                    className="w-full px-5 py-3 border-0 bg-transparent text-left text-sm cursor-pointer font-medium flex items-center gap-3 transition-colors text-slate-600 hover:bg-blue-50"
                  >
                    {item.icon} {item.label}
                  </button>
                ))}

                <div className="border-t border-gray-100">
                  <button onClick={handleLogout}
                    className="w-full px-5 py-3 border-0 bg-transparent text-left text-sm cursor-pointer font-semibold flex items-center gap-3 transition-colors text-red-600 hover:bg-red-50"
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
    </div>
  );
}

export default Navbar;