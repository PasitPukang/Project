import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from '../mockData';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('mr_rooms_v2');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mr_bookings_v2');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('catalog'); // catalog, my_bookings, admin

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('mr_rooms_v2', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('mr_bookings_v2', JSON.stringify(bookings));
  }, [bookings]);

  // Booking Actions
  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      status: 'pending',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    setSelectedRoomForBooking(null);
    return newBooking;
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const cancelBooking = (id) => {
    updateBookingStatus(id, 'cancelled');
  };

  // Room Actions (Admin)
  const addRoom = (roomData) => {
    const newRoom = {
      id: Date.now(),
      status: 'available',
      image: roomData.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      equipment: typeof roomData.equipment === 'string' ? roomData.equipment.split(',').map(s => s.trim()) : roomData.equipment,
      ...roomData
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const toggleRoomStatus = (id) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'available' ? 'occupied' : 'available';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
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
