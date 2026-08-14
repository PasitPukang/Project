import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { X, Lock, KeyRound } from 'lucide-react';

export default function AdminPinModal() {
  const { isAdminPinModalOpen, setIsAdminPinModalOpen, elevateToAdminWithPin } = useAuth();
  const { setActiveTab } = useBooking();
  
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminPinModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = elevateToAdminWithPin(passcode);
    if (res.success) {
      setPasscode('');
      setActiveTab('admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>ยืนยันรหัสแอดมิน</span>
          </h3>
          <button
            onClick={() => setIsAdminPinModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          <p className="text-slate-400">
            โปรดป้อนรหัสแอดมิน เพื่อเข้าถึงส่วนจัดการคำขอจองและเพิ่มห้องประชุม
          </p>

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1">รหัสแอดมิน *</label>
            <input
              type="password"
              required
              autoFocus
              placeholder="ป้อนรหัสแอดมิน..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setErrorMsg('');
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono tracking-widest text-center"
            />
            <p className="text-[11px] text-slate-500 text-center mt-1">
              รหัสทดสอบ: <code className="bg-slate-950 px-1 py-0.5 rounded text-purple-300">ADMIN1234</code>
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdminPinModalOpen(false)}
              className="w-1/3 py-2 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="w-2/3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium"
            >
              ยืนยันรหัส
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
