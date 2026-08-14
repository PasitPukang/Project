import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RoomCatalog from './components/RoomCatalog';
import UserBookings from './components/UserBookings';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import { Building2, Heart } from 'lucide-react';

import AdminPinModal from './components/AdminPinModal';

function MainContent() {
  const { activeTab } = useBooking();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        {activeTab === 'catalog' && (
          <>
            <HeroSection />
            <RoomCatalog />
          </>
        )}

        {activeTab === 'my_bookings' && <UserBookings />}

        {activeTab === 'admin' && <AdminDashboard />}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-200">MeetingRoom PRO v2.0</span>
            <span>— ระบบจองห้องประชุมออนไลน์ (Secure Edition)</span>
          </div>

          <p className="flex items-center gap-1">
            <span>พัฒนาโดย</span>
            <span className="font-semibold text-slate-200">พสิษฐ์ ภูฆัง (เบสท์)</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>นิสิต IT มก.กำแพงแสน</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal />
      <AuthModal />
      <AdminPinModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MainContent />
      </BookingProvider>
    </AuthProvider>
  );
}
