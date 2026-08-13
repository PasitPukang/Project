document.addEventListener('DOMContentLoaded', function() {
    // เมื่อหน้าเว็บโหลดเสร็จ ให้เรียกฟังก์ชัน updateRoomStatus เพื่ออัปเดตสถานะห้อง
    updateRoomStatus();
    // ตั้งค่าให้เรียกฟังก์ชัน updateRoomStatus ทุกๆ 1 วินาที เพื่ออัปเดตข้อมูลห้องแบบเรียลไทม์
    setInterval(updateRoomStatus, 1000);
});

// ฟังก์ชันสำหรับอัปเดตสถานะห้อง
function updateRoomStatus() {
    // ใช้ fetch API เพื่อดึงข้อมูลสถานะห้องจากเซิร์ฟเวอร์
    fetch('http://localhost:9999/check-room-status')
        .then(response => response.json()) // แปลงข้อมูลที่ได้รับเป็น JSON
        .then(data => {
            // ตรวจสอบว่าข้อมูลที่ได้รับมีค่าที่ต้องการหรือไม่
            if (data.available !== undefined && data.unavailable !== undefined && data.total !== undefined) {
                // อัปเดตจำนวนห้องที่ว่าง
                document.querySelector('.status-number.available').textContent = data.available;
                // อัปเดตจำนวนห้องที่ถูกจอง
                document.querySelector('.status-number.unavailable').textContent = data.unavailable;
                // อัปเดตจำนวนห้องทั้งหมด
                document.querySelector('.status-number.total').textContent = data.total;
            } else {
                // แสดงข้อผิดพลาดในคอนโซล ถ้าข้อมูลที่ได้ไม่สมบูรณ์
                console.error("ข้อมูลสถานะห้องไม่สมบูรณ์:", data);
            }
        })
        .catch(error => {
            // แสดงข้อผิดพลาดในคอนโซล ถ้าดึงข้อมูลล้มเหลว
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสถานะห้อง:", error);
        });
}
