import React from 'react';
import { useBooking } from '../context/BookingContext';
import RoomCard from './RoomCard';
import { Building2, SearchX } from 'lucide-react';

export default function RoomCatalog() {
  const { filteredRooms, searchQuery, setSearchQuery, setCapacityFilter, setStatusFilter } = useBooking();

  const handleResetFilter = () => {
    setSearchQuery('');
    setCapacityFilter('all');
    setStatusFilter('all');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <span>รายการห้องประชุม</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            พบห้องประชุมทั้งหมด {filteredRooms.length} ห้อง
          </p>
        </div>
      </div>

      {/* Room Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">ไม่พบห้องประชุมที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            ลองปรับเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองเพื่อดูห้องประชุมทั้งหมด
          </p>
          <button
            onClick={handleResetFilter}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
          >
            รีเซ็ตตัวกรองทั้งหมด
          </button>
        </div>
      )}

    </section>
  );
}
