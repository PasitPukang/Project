import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, KeyRound, User, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, authError, setAuthError } = useAuth();
  const [username, setUsername] = useState('pasit');
  const [password, setPassword] = useState('123456');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    const result = login(username, password);
    if (result.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleAdminPreset = () => {
    setUsername('admin');
    setPassword('admin1234');
    setAuthError('');
  };

  const handleUserPreset = () => {
    setUsername('pasit');
    setPassword('123456');
    setAuthError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-base text-slate-100">เข้าสู่ระบบ</h3>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          
          {/* Presets */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <p className="text-[11px] text-slate-400 text-center">เลือกบัญชีทดสอบใช้งาน</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleUserPreset}
                className={`py-1.5 px-2 rounded-lg font-medium border ${
                  username === 'pasit' ? 'bg-blue-600/20 text-blue-300 border-blue-500/30' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                ผู้ใช้ (User)
              </button>
              <button
                type="button"
                onClick={handleAdminPreset}
                className={`py-1.5 px-2 rounded-lg font-medium border ${
                  username === 'admin' ? 'bg-purple-600/20 text-purple-300 border-purple-500/30' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                แอดมิน (Admin)
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">ชื่อผู้ใช้งาน (Username) *</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setAuthError('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">รหัสผ่าน (Password) *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs mt-2"
            >
              เข้าสู่ระบบ
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
