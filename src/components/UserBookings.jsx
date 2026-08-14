import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { BookmarkCheck, Calendar, Clock, Building2, User, Trash2 } from 'lucide-react';

export default function UserBookings() {
  const { bookings, cancelBooking, setActiveTab } = useBooking();
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = bookings.filter(b => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            อนุมัติแล้ว
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            รออนุมัติ
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            ยกเลิกแล้ว
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-blue-400" />
            <span>รายการจองของฉัน</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            ตรวจสอบสถานะการจอง และกดยกเลิกการจองได้ที่นี่
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              filterStatus === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            ทั้งหมด ({bookings.length})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              filterStatus === 'approved' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
            }`}
          >
            อนุมัติแล้ว ({bookings.filter(b => b.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              filterStatus === 'pending' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
            }`}
          >
            รออนุมัติ ({bookings.filter(b => b.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Booking List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map(booking => (
            <div
              key={booking.id}
              className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  {getStatusBadge(booking.status)}
                  <span className="text-slate-500">รหัสจอง #{booking.id}</span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-100 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>{booking.room_name}</span>
                  </h3>
                  <p className="text-slate-300 mt-0.5">
                    "{booking.title}"
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {booking.booking_date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {booking.start_time} - {booking.end_time} น.
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {booking.user_name} ({booking.headcount} คน)
                  </span>
                </div>
              </div>

              {booking.status !== 'cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm('ต้องการยกเลิกการจองห้องนี้ใช่หรือไม่?')) {
                      cancelBooking(booking.id);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-rose-400 hover:bg-rose-950/30 self-end md:self-center flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ยกเลิกการจอง</span>
                </button>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400 text-xs mb-4">ไม่พบรายการจองห้องประชุม</p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
          >
            เลือกห้องประชุมเพื่อจอง
          </button>
        </div>
      )}

    </section>
  );
}
