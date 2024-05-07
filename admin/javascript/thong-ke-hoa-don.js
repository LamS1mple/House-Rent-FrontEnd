var isQuy = false;
      changePeriodType();
      function changePeriodType() {
        var timePeriod = document.getElementById("time-period").value;
        var periodSelect = document.getElementById("period");
        // Xóa tất cả các tùy chọn cũ
        periodSelect.innerHTML = "";

        // Tạo các tùy chọn mới tùy thuộc vào lựa chọn của người dùng
        if (timePeriod === "month") {
          isQuy = true;
          for (var i = 1; i <= 12; i++) {
            var option = document.createElement("option");
            option.text = "Tháng " + i;
            option.value = i;
            periodSelect.appendChild(option);
          }
        } else if (timePeriod === "quarter") {
          isQuy = false;
          for (var i = 1; i <= 4; i++) {
            var option = document.createElement("option");
            option.text = "Quý " + i;
            option.value = i;
            periodSelect.appendChild(option);
          }
        }
      }
      function getLastDayOfMonth(year, month) {
        // Tạo một đối tượng Date đại diện cho ngày cuối cùng của tháng
        var lastDay = new Date(year, month, 0);

        // Lấy ngày trong tháng
        var day = lastDay.getDate();

        // Lấy tháng, cần thêm 1 vì tháng trong JavaScript bắt đầu từ 0 (0 -> January, 11 -> December)
        var month = lastDay.getMonth() + 1;

        // Lấy năm
        var year = lastDay.getFullYear();

        // Định dạng ngày, tháng, năm thành chuỗi "dd/MM/yyyy"
        var formattedDate =
          ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;

        return formattedDate + " 23:59:59";
      }

      function getFirstDayOfMonth(year, month) {
        var firstDay = new Date(year, month - 1, 1);

        // Lấy ngày trong tháng
        var day = firstDay.getDate();

        // Lấy tháng, cần thêm 1 vì tháng trong JavaScript bắt đầu từ 0 (0 -> January, 11 -> December)
        var month = firstDay.getMonth() + 1;

        // Lấy năm
        var year = firstDay.getFullYear();

        // Định dạng ngày, tháng, năm thành chuỗi "dd/MM/yyyy"
        var formattedDate =
          ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;

        return formattedDate + " 00:00:00";
      }

      async function generateReport() {
        const timePeriod = document.getElementById("time-period").value;
        const period = parseInt(document.getElementById("period").value);
        const year = parseInt(document.getElementById("year").value);
        var data = {};
        if (isQuy) {
          data = {
            ngayBatDau: getFirstDayOfMonth(year, period),
            ngayKetThuc: getLastDayOfMonth(year, period),
          };
        } else {
          data = {
            ngayBatDau: getFirstDayOfMonth(year, period * 3 - 2),
            ngayKetThuc: getLastDayOfMonth(year, period * 3),
          };
        }
        console.log(data);

        const response = await postData(
          "http://localhost:8080/thong-ke/thong-ke-doanh-thu",
          data
        );
        console.log(response);

        const invoices = [
          {
            id: 1,
            code: "HD001",
            customer: "Nguyễn Văn A",
            room: "Phòng A",
            date: "01/04/2024",
            total: "1,000,000",
          },
          {
            id: 2,
            code: "HD002",
            customer: "Trần Thị B",
            room: "Phòng B",
            date: "05/04/2024",
            total: "1,500,000",
          },
          {
            id: 3,
            code: "HD003",
            customer: "Lê Văn C",
            room: "Phòng C",
            date: "10/04/2024",
            total: "2,200,000",
          },
        ];

        const invoiceList = document.getElementById("invoice-list");
        invoiceList.innerHTML = "";
        let sum = 0;
        response.forEach((invoice, index) => {
          const row = document.createElement("tr");
          sum += invoice.tongTien
          row.innerHTML = `
                <td>${index + 1}</td>
                <td>${padNumber(5, invoice.id)}</td>
                <td>${invoice.phongDat.phong.tenPhong}</td>
                <td>${invoice.ngayThanhToan}</td>
                <td>${toTienDot(invoice.tongTien)}</td>
                <button class="tick" type="submit" value="${index}">Xem</button></td>
            `;
          invoiceList.appendChild(row);
        });
        document.querySelector("#tong-tien").innerHTML =`Tổng tiền: ${toTienDot(sum  )}`
        document.querySelectorAll(".tick").forEach((element, index) => {
          element.addEventListener("click", function (e) {
            localStorage.setItem("hoadon", JSON.stringify(response[index]));
            window.location.href = "chi-tiet-hoa-don.html";
          });
        });
      }
      function toTienDot(tien) {
        tien += "";
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

      async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
      function padNumber(length, number) {
        var str = "" + number;
        while (str.length < length) {
          str = "0" + str;
        }
        return "HD" + str;
      }

      function viewDetail(invoiceId) {
        // Hiển thị chi tiết hóa đơn với id tương ứng
        alert(`Xem chi tiết hóa đơn có mã: ${invoiceId}`);
      }