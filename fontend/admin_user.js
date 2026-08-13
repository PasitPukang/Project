const BASE_URL = 'http://localhost:9999';
window.onload = async () => {
    await loadData();
    await checkEditMode();
};
const loadData = async () => {
        console.log("user page loaded");
        try {
            const response_u = await axios.get(`${BASE_URL}/tb_user`);
            const userDOM = document.getElementById('user');
            let usersData = '';
            for (let i = 0; i < response_u.data.length; i++) {
                let user = response_u.data[i];
                usersData += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>${user.Tel}</td>
                        <td>${user.created_at}</td>
                    <td>
                        <button class="delete-user" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
        }
        userDOM.innerHTML = usersData;
        // ✅ ลบ user พร้อมแจ้งเตือน
        const deleteUserDOMs = document.getElementsByClassName('delete-user');
        for (let i = 0; i < deleteUserDOMs.length; i++) {
            deleteUserDOMs[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                const confirmDelete = confirm(`คุณต้องการลบ User ID: ${id} ใช่หรือไม่?`);
                if (!confirmDelete) return;

                try {
                    await axios.delete(`${BASE_URL}/tb_user/${id}`);
                    showMessage(`User ID: ${id} ถูกลบแล้ว`, 'success');
                    loadData();
                } catch (error) {
                    console.error('Error deleting user:', error);
                    showMessage('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
                }
            });
        }
    } catch (error) {
        console.error('Error loading user:', error);
        showMessage('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
    }
    // ✅ ฟังก์ชันแสดงข้อความแจ้งเตือน
function showMessage(message, type) {
    alert(message); 
}
};
