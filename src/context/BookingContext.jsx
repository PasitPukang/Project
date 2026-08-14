import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from '../mockData';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('mr_rooms_v3');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mr_bookings_v3');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('catalog');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch Rooms & Bookings from Supabase Cloud Database if URL configured
  useEffect(() => {
    const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL);

    if (isSupabaseConfigured) {
      // 1. Fetch Rooms from Supabase Cloud DB
      supabase
        .from('rooms')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            setRooms(data);
          }
        });

      // 2. Fetch Bookings from Supabase Cloud DB
      supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            setBookings(data);
          }
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mr_rooms_v3', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('mr_bookings_v3', JSON.stringify(bookings));
  }, [bookings]);

  // Booking Actions
  const createBooking = async (bookingData) => {
    const newBooking = {
      id: Date.now(),
      status: 'pending',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedRoomForBooking(null);

    // Sync with Supabase Cloud DB if available
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('bookings').insert([{
        room_id: bookingData.room_id,
        room_name: bookingData.room_name,
        user_name: bookingData.user_name,
        user_tel: bookingData.user_tel,
        booking_date: bookingData.booking_date,
        start_time: bookingData.start_time,
        end_time: bookingData.end_time,
        title: bookingData.title,
        headcount: bookingData.headcount,
        status: 'pending'
      }]);
    }

    return newBooking;
  };

  const updateBookingStatus = async (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    }
  };

  const cancelBooking = (id) => {
    updateBookingStatus(id, 'cancelled');
  };

  // Room Actions (Admin)
  const addRoom = async (roomData) => {
    const newRoom = {
      id: Date.now(),
      status: 'available',
      image: roomData.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      equipment: typeof roomData.equipment === 'string' ? roomData.equipment.split(',').map(s => s.trim()) : roomData.equipment,
      ...roomData
    };
    setRooms(prev => [...prev, newRoom]);

    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('rooms').insert([newRoom]);
    }
  };

  const toggleRoomStatus = async (id) => {
    const target = rooms.find(r => r.id === id);
    if (!target) return;
    const nextStatus = target.status === 'available' ? 'occupied' : 'available';

    setRooms(prev => prev.map(r => r.id === id ? { ...r, status: nextStatus } : r));

    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('rooms').update({ status: nextStatus }).eq('id', id);
    }
  };

  // Filtered Rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCap = true;
    if (capacityFilter === 'small') matchesCap = room.capacity <= 10;
    if (capacityFilter === 'medium') matchesCap = room.capacity > 10 && room.capacity <= 25;
    if (capacityFilter === 'large') matchesCap = room.capacity > 25;

    let matchesStatus = true;
    if (statusFilter !== 'all') matchesStatus = room.status === statusFilter;

    return matchesSearch && matchesCap && matchesStatus;
  });

  return (
    <BookingContext.Provider value={{
      rooms,
      filteredRooms,
      bookings,
      selectedRoomForBooking,
      setSelectedRoomForBooking,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      capacityFilter,
      setCapacityFilter,
      statusFilter,
      setStatusFilter,
      createBooking,
      updateBookingStatus,
      cancelBooking,
      addRoom,
      toggleRoomStatus
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
