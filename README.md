# 🏢 ระบบจองห้องประชุมออนไลน์ (Meeting Room Booking System)

ระบบจองห้องประชุมออนไลน์เวอร์ชันปรับปรุงใหม่ (Overhaul v2.0) ดีไซน์สไตล์ **Minimal Slate Dark Mode** ใช้งานง่าย รองรับการแสดงผลสมบูรณ์แบบบนทั้งสมาร์ตโฟนและคอมพิวเตอร์ เชื่อมต่อระบบยืนยันตัวตนและฐานข้อมูลคลาวด์ PostgreSQL ผ่าน Supabase

---

## 🌐 ลิงก์ทดลองใช้งานบนออนไลน์ (Live Demo)

👉 **[https://pasitpukang.github.io/PortfolioV2/Project/](https://pasitpukang.github.io/PortfolioV2/Project/)**

---

## 🔑 ข้อมูลบัญชีสำหรับทดสอบใช้งาน (Test Credentials for HR / Reviewers)

ผู้ประเมินหรือฝ่าย HR สามารถใช้ไอดีทดสอบด้านล่างนี้เพื่อทดลองเข้าใช้งานระบบได้ครับ:

### 1. 👤 บัญชีผู้ใช้งานทั่วไป (User Role)
* **ผู้ใช้เดิม:** `pasit` / รหัสผ่าน: `123456`
* **สมัครสมาชิกใหม่:** สามารถกดปุ่ม *"เข้าสู่ระบบ"* ➔ สลับไปแท็บ *"สมัครสมาชิกใหม่"* เพื่อสร้างไอดีผู้ใช้ใหม่ใช้งานได้ทันที

### 2. 🛡️ บัญชีผู้ดูแลระบบ (Admin Role)
* **Username / Email:** `admin`
* **Password:** `admin1234`

---

## ✨ ฟีเจอร์หลักของระบบ (Key Features)

1. **รายการห้องประชุมและการค้นหา (Room Catalog & Filter):**
   * แสดงสถานะห้องว่าง (Available) / กำลังใช้งาน (Occupied) แบบ Real-time
   * ระบบค้นหาด้วยชื่อห้อง อาคาร และตัวกรองตามขนาดความจุผู้เข้าร่วมประชุม

2. **ระบบป้องกันการจองเวลาซ้ำ (Double Booking Prevention & Alert):**
   * ระบบคำนวณช่วงเวลาการจองซ้อนทับอัตโนมัติ (`Overlap Time Check`)
   * หากมีผู้จองห้องประชุมในช่วงเวลาเดียวกัน ระบบจะแสดงป๊อปอัปแจ้งเตือนรายละเอียดผู้จองเดิมทันทีเพื่อป้องกันความขัดแย้ง

3. **รายการจองของฉัน (User Bookings Dashboard):**
   * ตรวจสอบสถานะคำขอจอง (*รออนุมัติ / อนุมัติแล้ว / ยกเลิกแล้ว*)
   * สามารถกดยกเลิกรายการจองของตนเองได้

4. **ส่วนผู้ดูแลระบบ (Admin Control Panel):**
   * ระบบป้องการเข้าถึง 403 Forbidden สำหรับผู้ใช้ทั่วไป
   * ปุ่มอนุมัติ (Approve) / ปฏิเสธคำขอจอง (Reject)
   * ปุ่มสลับสถานะเปิด/ปิดห้องประชุม
   * ฟอร์มเพิ่มห้องประชุมใหม่เข้าสู่ระบบ

5. **ระบบยืนยันตัวตนและคลาวด์เดทาเบส (Supabase Auth & Database):**
   * บันทึกข้อมูลและยืนยันตัวตนอย่างปลอดภัยด้วย Supabase Auth และ Cloud PostgreSQL

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Framer Motion
* **Authentication & Backend:** Supabase Auth SDK (`@supabase/supabase-js`)
* **Database:** Supabase Cloud PostgreSQL & Browser LocalStorage Fallback Sync
* **Deployment:** GitHub Pages

---

## 🚀 การติดตั้งและรันในเครื่อง (Local Setup)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. ตั้งค่าไฟล์ .env (คัดลอกคีย์ Supabase)
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# 3. รัน Development Server
npm run dev

# 4. Build สำหรับ Production
npm run build
```

---
**พัฒนาโดย:** พสิษฐ์ ภูฆัง (เบสท์) — นิสิตเทคโนโลยีสารสนเทศ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน
