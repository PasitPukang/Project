export const INITIAL_ROOMS = [
  {
    id: 1,
    name: 'ห้องประชุม Innovation Lab (101)',
    capacity: 12,
    location: 'ชั้น 1 อาคารเทคโนโลยี',
    status: 'available', // available, occupied, maintenance
    equipment: ['โปรเจกเตอร์ 4K', 'Smart TV 75"', 'ไมโครโฟนไร้สาย', 'กระดานไวท์บอร์ด'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'ห้องประชุมขนาดกลาง ตกแต่งสไตล์โมเดิร์น เหมาะสำหรับประชุมทีม วางแผนกลยุทธ์ และพรีเซนต์งาน'
  },
  {
    id: 2,
    name: 'ห้องประชุม Executive Boardroom (201)',
    capacity: 25,
    location: 'ชั้น 2 อาคารอำนวยการ',
    status: 'available',
    equipment: ['ระบบ Video Conference Logi', 'ลำโพงรอบทิศทาง', 'TV OLED 85"', 'เครื่องทำกาแฟสด'],
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    description: 'ห้องประชุมระดับผู้บริหาร รองรับการประชุมทางไกลข้ามสาขา พร้อมระบบเสียงและภาพระดับพรีเมียม'
  },
  {
    id: 3,
    name: 'ห้องสัมมนา Auditorium (301)',
    capacity: 60,
    location: 'ชั้น 3 อาคารหอประชุม',
    status: 'available',
    equipment: ['เวทีและโพเดียม', 'ไมค์ลอย 4 ตัว', 'ระบบไฟดิมเมอร์', 'โปรเจกเตอร์ฉากใหญ่'],
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80',
    description: 'ห้องสัมมนาขนาดใหญ่ เหมาะสำหรับการจัดอบรม เวิร์กช็อป และการแถลงข่าวประจำปี'
  },
  {
    id: 4,
    name: 'ห้องประชุม Creative Hub (102)',
    capacity: 8,
    location: 'ชั้น 1 อาคารเทคโนโลยี',
    status: 'occupied',
    equipment: ['Smart Board สัมผัส', 'โซฟาสบาย', 'โต๊ะปรับระดับ'],
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=800&q=80',
    description: 'ห้องประชุมขนาดเล็กบรรยากาศเป็นกันเอง เหมาะสำหรับการระดมสมอง (Brainstorming) และคุยงานย่อย'
  },
  {
    id: 5,
    name: 'ห้องประชุม Tech Focus (202)',
    capacity: 15,
    location: 'ชั้น 2 อาคารอำนวยการ',
    status: 'available',
    equipment: ['Dual Monitor Display', 'ปลั๊กไฟทุกที่นั่ง', 'LAN ความเร็วสูง 1Gbps'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'ห้องประชุมสำหรับสายไอทีและการพัฒนาซอฟต์แวร์ อุปกรณ์เชื่อมต่อครบครัน'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 101,
    room_id: 1,
    room_name: 'ห้องประชุม Innovation Lab (101)',
    user_name: 'สมชาย ใจดี',
    user_tel: '081-234-5678',
    booking_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '11:00',
    title: 'ประชุมวางแผนไตรมาสที่ 3 ทีมพัฒนาซอฟต์แวร์',
    headcount: 8,
    status: 'approved', // approved, pending, rejected, cancelled
    created_at: '2026-08-14 08:30'
  },
  {
    id: 102,
    room_id: 4,
    room_name: 'ห้องประชุม Creative Hub (102)',
    user_name: 'พสิษฐ์ ภูฆัง (เบสท์)',
    user_tel: '082-999-8888',
    booking_date: new Date().toISOString().split('T')[0],
    start_time: '13:30',
    end_time: '15:00',
    title: 'Discuss UI/UX Redesign PortfolioV2',
    headcount: 5,
    status: 'approved',
    created_at: '2026-08-14 09:15'
  },
  {
    id: 103,
    room_id: 2,
    room_name: 'ห้องประชุม Executive Boardroom (201)',
    user_name: 'วิชัย มีสุข',
    user_tel: '083-456-7890',
    booking_date: new Date().toISOString().split('T')[0],
    start_time: '15:30',
    end_time: '17:00',
    title: 'สรุปงบประมาณและการลงทุนประจำปี',
    headcount: 12,
    status: 'pending',
    created_at: '2026-08-14 10:00'
  }
];

export const INITIAL_USERS = [
  { id: 1, username: 'admin', role: 'admin', name: 'ผู้ดูแลระบบ (Admin)', tel: '080-000-0000' },
  { id: 2, username: 'pasit', role: 'user', name: 'พสิษฐ์ ภูฆัง (เบสท์)', tel: '082-999-8888' },
  { id: 3, username: 'somchai', role: 'user', name: 'สมชาย ใจดี', tel: '081-234-5678' }
];
