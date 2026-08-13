const BASE_URL = 'http://localhost:9999';
let mode = 'CREATE';
let selectedID = null;

window.onload = async () => {
    await loadData();
    await checkEditMode();
};

// โหลดข้อมูลทั้งหมด
const loadData = async () => {
    console.log("User page loaded");
    try {
        const response = await axios.get(`${BASE_URL}/tb_booking`);
        const bookingDOM = document.getElementById('booking');
        let htmlData = '';
        
        response.data.forEach(booking => {
            htmlData += `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.Name}</td>
                    <td>${booking.room_id}</td>
                    <td>${booking.booking_date}</td>
                    <td>${booking.start_time}</td>
                    <td>${booking.end_time}</td>
                    <td>${booking.title}</td>
                    <td>
                        <button class="delete-booking" data-id="${booking.id}">Delete</button>
                    </td>
                </tr>
            `;
        });

        bookingDOM.innerHTML = htmlData;

        // เพิ่มฟังก์ชันลบ
        document.querySelectorAll('.delete-booking').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                if (!confirm(`คุณต้องการลบ Booking ID: ${id} ใช่หรือไม่?`)) return;

                try {
                    await axios.delete(`${BASE_URL}/tb_booking/${id}`);
                    alert(`Booking ID: ${id} ถูกลบแล้ว`);
                    loadData();
                } catch (error) {
                    console.error('Error deleting booking:', error);
                    alert('เกิดข้อผิดพลาดในการลบข้อมูล');
                }
            });
        });

    } catch (error) {
        console.error('Error loading user:', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
};