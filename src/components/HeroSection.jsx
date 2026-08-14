import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Search, Building2, CheckCircle2, Clock } from 'lucide-react';

export default function HeroSection() {
  const {
    rooms,
    bookings,
    searchQuery,
    setSearchQuery,
    capacityFilter,
    setCapacityFilter,
    statusFilter,
    setStatusFilter
  } = useBooking();

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const todayBookings = bookings.filter(b => b.status === 'approved').length;

  return (
    <div className="pt-8 pb-8 border-b border-slate-900 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
            ค้นหาและจองห้องประชุม
          </h1>
          <p className="text-sm text-slate-400">
            เลือกห้องประชุมตามความจุ อุปกรณ์ที่ต้องการ และเช็กสถานะห้องว่างล่วงหน้า
          </p>
        </div>

        {/* Quick Summary Pills */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>ห้องทั้งหมด <strong className="text-slate-200">{totalRooms}</strong> ห้อง</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>พร้อมใช้งาน <strong className="text-emerald-400">{availableRooms}</strong> ห้อง</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>อนุมัติแล้ววันนี้ <strong className="text-blue-400">{todayBookings}</strong> รายการ</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row gap-2.5">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="ค้นหาชื่อห้อง อาคาร หรือชั้น..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Capacity Filter */}
            <div className="w-full md:w-44">
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="all">ความจุ: ทั้งหมด</option>
                <option value="small">ขนาดเล็ก (1-10 คน)</option>
                <option value="medium">ขนาดกลาง (11-25 คน)</option>
                <option value="large">ขนาดใหญ่ (26 คนขึ้นไป)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-44">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="all">สถานะ: ทั้งหมด</option>
                <option value="available">ห้องว่าง</option>
                <option value="occupied">กำลังใช้งาน</option>
              </select>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
