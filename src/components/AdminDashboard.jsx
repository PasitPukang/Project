import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, XCircle, Plus, Building2, Clock, MapPin, Power, Lock, KeyRound } from 'lucide-react';

export default function AdminDashboard() {
  const { isAdmin, setIsAdminPinModalOpen } = useAuth();
  const { rooms, bookings, updateBookingStatus, addRoom, toggleRoomStatus } = useBooking();

  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    capacity: 10,
    location: '',
    description: '',
    equipment: 'โปรเจกเตอร์, ไวท์บอร์ด'
  });

  // Protected View
  if (!isAdmin) {
    return (
      <section className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-100">สงวนสิทธิ์สำหรับแอดมิน</h2>
            <p className="text-xs text-slate-400">
              บัญชีปัจจุบันของคุณไม่มีสิทธิ์ผู้ดูแลระบบ ต้องยืนยันรหัสผ่านเพื่อเข้าใช้งาน
            </p>
          </div>

          <button
            onClick={() => setIsAdminPinModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-4 h-4" />
            <span>ยืนยันรหัสแอดมิน</span>
          </button>
        </div>
      </section>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  const handleAddRoomSubmit = (e) => {
    e.preventDefault();
    if (!newRoom.name || !newRoom.location) return;

    addRoom(newRoom);
    setIsAddRoomOpen(false);
    setNewRoom({ name: '', capacity: 10, location: '', description: '', equipment: 'โปรเจกเตอร์, ไวท์บอร์ด' });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>จัดการระบบและคำขอจอง</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            อนุมัติคำขอจองห้องประชุม เพิ่มห้องประชุมใหม่ และเปิด-ปิดสถานะห้อง
          </p>
        </div>

        <button
          onClick={() => setIsAddRoomOpen(!isAddRoomOpen)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มห้องประชุม</span>
        </button>
      </div>

      {/* Form: Add New Room */}
      {isAddRoomOpen && (
        <form onSubmit={handleAddRoomSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
          <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>เพิ่มห้องประชุมใหม่</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">ชื่อห้องประชุม *</label>
              <input
                type="text"
                required
                placeholder="เช่น ห้องประชุม 101"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">สถานที่ / ชั้น *</label>
              <input
                type="text"
                required
                placeholder="เช่น ชั้น 2 อาคาร 1"
                value={newRoom.location}
                onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">ความจุสูงสุด (คน) *</label>
              <input
                type="number"
                min="1"
                required
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">สิ่งอำนวยความสะดวก (คั่นด้วยจุลภาค)</label>
            <input
              type="text"
              placeholder="โปรเจกเตอร์, ไวท์บอร์ด, สมาร์ททีวี"
              value={newRoom.equipment}
              onChange={(e) => setNewRoom({ ...newRoom, equipment: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddRoomOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      )}

      {/* Pending Bookings List */}
      <div>
        <h3 className="text-base font-semibold text-slate-100 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>คำขอรอการอนุมัติ ({pendingBookings.length})</span>
        </h3>

        {pendingBookings.length > 0 ? (
          <div className="space-y-2.5">
            {pendingBookings.map(b => (
              <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/20 text-amber-400">
                      รออนุมัติ
                    </span>
                    <span className="text-slate-400">ผู้จอง: {b.user_name} ({b.user_tel})</span>
                  </div>
                  <p className="font-semibold text-slate-200 text-sm">{b.room_name}</p>
                  <p className="text-slate-400">"{b.title}"</p>
                  <p className="text-slate-400">
                    วันที่ {b.booking_date} | เวลา {b.start_time} - {b.end_time} น. | จำนวน {b.headcount} คน
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 md:pt-0">
                  <button
                    onClick={() => updateBookingStatus(b.id, 'rejected')}
                    className="px-3 py-1.5 rounded-lg text-xs border border-slate-800 text-rose-400 hover:bg-rose-950/40"
                  >
                    ไม่อนุมัติ
                  </button>
                  <button
                    onClick={() => updateBookingStatus(b.id, 'approved')}
                    className="px-3 py-1.5 rounded-lg text-xs bg-emerald-600 text-slate-950 font-semibold hover:bg-emerald-500"
                  >
                    อนุมัติการจอง
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs">
            ไม่มีคำขอรอการอนุมัติในขณะนี้
          </div>
        )}
      </div>

      {/* Room Status Toggle Grid */}
      <div>
        <h3 className="text-base font-semibold text-slate-100 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          <span>สถานะห้องประชุมทั้งหมด ({rooms.length} ห้อง)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {rooms.map(room => (
            <div key={room.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-medium text-slate-200">{room.name}</p>
                <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-600" />
                  <span>{room.location} ({room.capacity} คน)</span>
                </p>
              </div>

              <button
                onClick={() => toggleRoomStatus(room.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  room.status === 'available'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                }`}
              >
                {room.status === 'available' ? 'ว่าง' : 'ปิดใช้งาน'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
