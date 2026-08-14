import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Users, MapPin, CalendarPlus } from 'lucide-react';

export default function RoomCard({ room }) {
  const { setSelectedRoomForBooking } = useBooking();
  const { setIsAuthModalOpen, user } = useAuth();

  const handleBookClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedRoomForBooking(room);
  };

  const isAvailable = room.status === 'available';

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col hover:border-slate-700 transition-colors">
      
      {/* Image Container */}
      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {isAvailable ? (
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/90 text-slate-950 shadow">
              ว่าง
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/90 text-white shadow">
              กำลังใช้งาน
            </span>
          )}
        </div>

        {/* Capacity Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-950/80 text-slate-200 border border-slate-800">
            <Users className="w-3 h-3 inline mr-1 text-slate-400" />
            {room.capacity} คน
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-semibold text-base text-slate-100 leading-snug">
            {room.name}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{room.location}</span>
          </p>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Equipment Chips */}
        <div>
          <div className="flex flex-wrap gap-1 mt-1">
            {room.equipment.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-950 text-slate-400 border border-slate-850"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBookClick}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            isAvailable
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>{isAvailable ? 'จองห้องประชุม' : 'จองช่วงเวลาอื่น'}</span>
        </button>

      </div>

    </div>
  );
}
