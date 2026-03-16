import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/navbar";
import { useTheme } from "../ThemeContext";
import { FileText, Edit2, Trash2, Eye, Plus, Calendar, Clock } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const dk = darkMode;
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchResumes(currentUser.uid);
      } else {
        navigate("/loginPage");
      }
    });
    return () => unsub();
  }, [navigate]);

  const fetchResumes = async (uid) => {
    try {
      const q = query(
        collection(db, "resumes"),
        where("userId", "==", uid)
        // Note: orderBy("updatedAt", "desc") requires a composite index in Firestore.
        // For simplicity without requiring the user to click a build-index link, we fetch and sort client-side.
      );
      const querySnapshot = await getDocs(q);
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort client side (newest first)
      fetched.sort((a, b) => {
        const timeA = a.updatedAt?.toMillis() || a.createdAt?.toMillis() || 0;
        const timeB = b.updatedAt?.toMillis() || b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
      
      setResumes(fetched);
    } catch (error) {
      console.error("Error fetching resumes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteDoc(doc(db, "resumes", id));
        setResumes(resumes.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error deleting resume: ", error);
      }
    }
  };

  const handleEdit = (resume) => {
    navigate("/formPage", {
      state: {
        formData: resume.formData,
        skills: resume.skills,
        editId: resume.id
      }
    });
  };

  const handlePreview = (resume) => {
    // Navigate straight to FinalPage (templates) with the data
    navigate("/FinalPage", {
      state: {
        formData: resume.formData,
        skills: resume.skills,
        editId: resume.id
      }
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{
      background: dk ? '#0f172a' : 'linear-gradient(135deg, #f0f7ff 0%, #eef2ff 50%, #f5f3ff 100%)',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif", color: dk ? '#f1f5f9' : '#0f172a' }}>
              My Resumes
            </h1>
            <p className="text-sm sm:text-base" style={{ color: dk ? '#94a3b8' : '#64748b' }}>
              Manage and update your saved professional resumes.
            </p>
          </div>
          <button
            onClick={() => navigate("/formPage")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
              boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
            }}
          >
            <Plus size={18} />
            Create New Resume
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full border-t-blue-600 mb-4 animate-spin" style={{ borderColor: dk ? '#334155' : 'var(--primary-light)', borderTopColor: 'var(--primary)' }}></div>
            <p className="font-medium" style={{ color: dk ? '#94a3b8' : '#64748b' }}>Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 rounded-3xl" style={{ border: `2px dashed ${dk ? '#334155' : 'var(--accent-light)'}`, background: dk ? 'rgba(30,41,59,0.5)' : 'white' }}>
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: dk ? '#1e293b' : 'var(--primary-light)' }}>
              <FileText size={32} color="var(--primary)" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: dk ? '#f1f5f9' : '#0f172a' }}>No Resumes Yet</h3>
            <p className="text-sm max-w-md mx-auto mb-8" style={{ color: dk ? '#94a3b8' : '#64748b' }}>
              You haven't created any resumes yet. Start building your first professional resume in minutes.
            </p>
            <button
              onClick={() => navigate("/formPage")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`, boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}
            >
              Get Started <ChevronRightIcon />
            </button>
          </div>
        ) : (
          /* Grid of Resumes */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col h-full"
                onClick={() => handleEdit(resume)}
                style={{
                  background: dk ? '#1e293b' : 'white',
                  border: `1px solid ${dk ? '#334155' : 'var(--primary-light)'}`,
                  boxShadow: dk ? '0 8px 32px rgba(0,0,0,0.3)' : '0 12px 32px rgba(99,102,241,0.08)',
                }}
              >
                {/* Resume Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: dk ? 'rgba(255,255,255,0.05)' : 'var(--primary-light)', color: 'var(--primary)' }}>
                  <FileText size={24} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 line-clamp-1" style={{ color: dk ? '#f1f5f9' : '#0f172a' }}>
                    {resume.title || 'Untitled Resume'}
                  </h3>
                  <p className="text-xs font-medium mb-4 line-clamp-1" style={{ color: 'var(--accent)' }}>
                    {resume.formData?.fullName || 'No Name specified'}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4" style={{ borderTop: `1px solid ${dk ? '#334155' : '#f1f5f9'}` }}>
                    <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: dk ? '#64748b' : '#94a3b8' }}>
                      <Calendar size={13} />
                      {formatDate(resume.updatedAt || resume.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Hover Actions Menu */}
                <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePreview(resume); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Preview Template"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(resume); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="Edit Data"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, resume.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
