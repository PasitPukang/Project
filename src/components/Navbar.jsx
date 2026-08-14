import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { ShieldCheck, LogOut, LogIn, CalendarDays } from 'lucide-react';

export default function Navbar() {
  const { user, logout, setIsAuthModalOpen, isAdmin } = useAuth();
  const { activeTab, setActiveTab, bookings } = useBooking();

  const myBookingsCount = bookings.filter(b => b.status !== 'cancelled').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActiveTab('catalog')}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-lg text-slate-100 tracking-tight">
                ระบบจองห้องประชุม
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'catalog'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ห้องประชุม
            </button>

            <button
              onClick={() => setActiveTab('my_bookings')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'my_bookings'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>การจองของฉัน</span>
              {myBookingsCount > 0 && (
                <span className="px-1.5 py-0.2 text-xs rounded-md bg-blue-500/20 text-blue-400 font-semibold">
                  {myBookingsCount}
                </span>
              )}
            </button>

            {/* Admin Tab - ONLY Visible to Admins */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>จัดการระบบ</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 text-xs rounded-md bg-amber-500/20 text-amber-300 font-semibold">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* User Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <p className="font-medium text-slate-200">{user.name}</p>
                  <p className="text-slate-400">{isAdmin ? 'สิทธิ์: แอดมิน' : 'สิทธิ์: ผู้ใช้ทั่วไป'}</p>
                </div>
                <button
                  onClick={logout}
                  title="ออกจากระบบ"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-900 text-xs text-slate-400">
          <button
            onClick={() => setActiveTab('catalog')}
            className={activeTab === 'catalog' ? 'text-blue-400 font-semibold' : ''}
          >
            ห้องประชุม
          </button>
          <button
            onClick={() => setActiveTab('my_bookings')}
            className={activeTab === 'my_bookings' ? 'text-blue-400 font-semibold' : ''}
          >
            การจองของฉัน ({myBookingsCount})
          </button>

          {/* Mobile Admin Tab - ONLY Visible to Admins */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={activeTab === 'admin' ? 'text-purple-400 font-semibold' : ''}
            >
              จัดการระบบ {pendingCount > 0 && `(${pendingCount})`}
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
