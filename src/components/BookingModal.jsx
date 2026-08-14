import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { X, Calendar, Clock, Users, FileText, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BookingModal() {
  const { selectedRoomForBooking, setSelectedRoomForBooking, createBooking, bookings, setActiveTab } = useBooking();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    user_name: user?.name || '',
    user_tel: user?.tel || '081-234-5678',
    booking_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '11:00',
    title: '',
    headcount: selectedRoomForBooking ? Math.min(5, selectedRoomForBooking.capacity) : 5
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [conflictBooking, setConflictBooking] = useState(null);

  if (!selectedRoomForBooking) return null;

  const findConflict = (roomId, date, startTime, endTime) => {
    return bookings.find(b => {
      if (b.room_id !== roomId) return false;
      if (b.booking_date !== date) return false;
      if (b.status === 'cancelled' || b.status === 'rejected') return false;
      return startTime < b.end_time && b.start_time < endTime;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setConflictBooking(null);

    if (!formData.title.trim()) {
      setErrorMsg('กรุณาระบุวัตถุประสงค์การจองห้อง');
      return;
    }

    if (formData.start_time >= formData.end_time) {
      setErrorMsg('เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น');
      return;
    }

    if (formData.headcount > selectedRoomForBooking.capacity) {
      setErrorMsg(`จำนวนผู้เข้าร่วมเกินความจุห้อง (สูงสุด ${selectedRoomForBooking.capacity} คน)`);
      return;
    }

    const conflict = findConflict(
      selectedRoomForBooking.id,
      formData.booking_date,
      formData.start_time,
      formData.end_time
    );

    if (conflict) {
      setConflictBooking(conflict);
      return;
    }

    createBooking({
      room_id: selectedRoomForBooking.id,
      room_name: selectedRoomForBooking.name,
      ...formData
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedRoomForBooking(null);
      setActiveTab('my_bookings');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base text-slate-100">ฟอร์มจองห้องประชุม</h3>
            <p className="text-xs text-blue-400">{selectedRoomForBooking.name}</p>
          </div>
          <button
            onClick={() => setSelectedRoomForBooking(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conflict Alert Screen */}
        {conflictBooking ? (
          <div className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-semibold text-slate-100">ช่วงเวลานี้ถูกจองไว้แล้ว</h4>
              <p className="text-xs text-slate-400">
                มีการจองในวันที่ <strong className="text-slate-200">{conflictBooking.booking_date}</strong> ช่วงเวลา <strong className="text-amber-300">{conflictBooking.start_time} - {conflictBooking.end_time} น.</strong> แล้ว
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-400">
              <p><strong className="text-slate-300">ผู้จองเดิม:</strong> {conflictBooking.user_name}</p>
              <p><strong className="text-slate-300">หัวข้อ:</strong> {conflictBooking.title}</p>
            </div>

            <p className="text-xs text-slate-400 text-center">
              โปรดเลือกช่วงเวลาอื่น หรือเลื่อนวันใช้งานครับ
            </p>

            <button
              onClick={() => setConflictBooking(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold"
            >
              รับทราบ / เลือกเวลาใหม่
            </button>
          </div>
        ) : isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-100">บันทึกคำขอจองห้องเรียบร้อยแล้ว</h4>
            <p className="text-xs text-slate-400">กำลังพาคุณไปยังรายการจอง...</p>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
            
            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-slate-400 mb-1">หัวข้อการประชุม / วัตถุประสงค์ *</label>
              <input
                type="text"
                required
                placeholder="เช่น ประชุมทีมการตลาดประจำสัปดาห์"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">วันที่ *</label>
                <input
                  type="date"
                  required
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                  className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">เวลาเริ่ม *</label>
                <select
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="08:00">08:00 น.</option>
                  <option value="09:00">09:00 น.</option>
                  <option value="10:00">10:00 น.</option>
                  <option value="11:00">11:00 น.</option>
                  <option value="13:00">13:00 น.</option>
                  <option value="14:00">14:00 น.</option>
                  <option value="15:00">15:00 น.</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">เวลาสิ้นสุด *</label>
                <select
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="10:00">10:00 น.</option>
                  <option value="11:00">11:00 น.</option>
                  <option value="12:00">12:00 น.</option>
                  <option value="14:00">14:00 น.</option>
                  <option value="15:00">15:00 น.</option>
                  <option value="16:00">16:00 น.</option>
                  <option value="17:00">17:00 น.</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">จำนวนผู้เข้าร่วม (คน) *</label>
                <input
                  type="number"
                  min="1"
                  max={selectedRoomForBooking.capacity}
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ชื่อผู้จอง *</label>
                <input
                  type="text"
                  required
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">เบอร์โทรติดต่อ *</label>
              <input
                type="tel"
                required
                value={formData.user_tel}
                onChange={(e) => setFormData({ ...formData, user_tel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedRoomForBooking(null)}
                className="w-1/3 py-2 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                ยืนยันการจอง
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
