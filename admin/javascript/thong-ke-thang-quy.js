   // Đoạn mã JavaScript để cập nhật bảng dữ liệu dựa vào lựa chọn của người dùng
   async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data), 
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

        // Lấy các phần tử cần thiết từ DOM
        const selectType = document.getElementById('select-type');
        const inputYear = document.getElementById('input-year');
        const date = new Date()
        inputYear.value = date.getFullYear()
        const revenueTableBody = document.querySelector('#revenue-table tbody');
        const btnThongKe = document.getElementById('btn-thongke');

        console.log(selectType.value)

        // Hàm để cập nhật bảng dữ liệu
        async function updateRevenueTable() {
            
            let thongTin = "Tháng"

            let nam = inputYear.value
            let isMonth = true
            
            if (selectType.value === 'thang') {
                thongTin = "Tháng"
                isMonth = true
              
            } else if (selectType.value === 'quy') {
                thongTin = "Quý"
                isMonth = false
                
            }
            
            const data =await postData("http://localhost:8080/thong-ke/thong-ke-doanh-thu", {
                isMonth, nam
            })

            // Xóa nội dung cũ của bảng
            revenueTableBody.innerHTML = '';

            // Lặp qua dữ liệu và thêm vào bảng
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${thongTin} ${item.thoigian}</td>
                <td>${toTienDot(item.tongTien +"")}</td>
                <td><button class="btn-xem-chi-tiet btn" value="${item.thoigian}">Xem chi tiết</button></td>`;
                revenueTableBody.appendChild(row);

                row.querySelector('.btn-xem-chi-tiet').addEventListener('click', (e) => {
                    localStorage.setItem("data-thong-ke",JSON.stringify({
                        valueMonthQuerter: e.target.value,
                        isMonth,nam
                    }))
                    window.location.href = "./thong-ke-hoa-don.html"
                });
            });
        }

        // Sự kiện click của nút "Thống kê"
        btnThongKe.addEventListener('click', updateRevenueTable);

        // Gọi hàm cập nhật ban đầu khi trang được tải
        updateRevenueTable();

        function toTienDot(tien) {
            kq = "";
            doDai = tien.length - 1;
            for (let i = doDai; i >= 0; i--) {
              kq = tien[i] + kq;
          
              if (i != 0 && doDai - 1 + 1 != 1 && (doDai - i + 1) % 3 == 0) {
                kq = "." + kq;
              }
            }
            return kq + "đ";
          }