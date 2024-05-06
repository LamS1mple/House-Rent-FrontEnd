const idPhong = localStorage.getItem("idPhong");
const giaPhong = document.querySelector("#gia");
const namePhong = document.querySelector("#name-phong");
const infPhong = document.getElementById("inf-phong");
const locationPhong = document.querySelector("#location");

const listTaiSan = document.querySelector("#list-tai-san");

getPhongId();

async function getPhongId() {
  const response = await fetch("http://localhost:8080/phong/" + idPhong);
  const data = await response.json();
  const result = data.result;
  console.log(result);
  // set data
  namePhong.innerHTML = result.tenPhong;
  infPhong.innerHTML = "Mô tả: " + result.thongTinPhong;
  locationPhong.innerHTML = "Địa chỉ: " + result.diaChi;
  giaPhong.innerHTML = toTienDot(result.donGiaPhong + "") + "đ";

  result.danhSachTaiSan.forEach((element, index) => {
    let item = document.createElement("tr");
    item.innerHTML = `
        <td>${index + 1}</td>
        <td>${element.taiSan.tenTaiSan}</td>
        <td>${toTienDot(element.taiSan.donGia + "")}đ</td>
        <td>${element.soLuong}</td>
        <td><img src="${element.taiSan.danhSachAnh[0]}" alt="Hình ảnh tài sản"></td>
        `;
    listTaiSan.appendChild(item)
  });


  tranferData(result);
}

function toTienDot(tien) {
  kq = "";
  doDai = tien.length - 1;
  for (let i = doDai; i >= 0; i--) {
    kq = tien[i] + kq;

    if (i != 0 && doDai - 1 + 1 != 1 && (doDai - i + 1) % 3 == 0) {
      kq = "." + kq;
    }
  }
  return kq;
}

document.querySelector("#chinh-sua").addEventListener("click", (e)=>{
    e.stopPropagation()
    document.querySelector(".overlay-buttons").style.visibility = 'visible'
})

document.querySelector("body").addEventListener("click", (e)=>{
    document.querySelector(".overlay-buttons").style.visibility = 'hidden'

})

function tranferData(result){
    document.querySelector("#sua-tai-san").addEventListener("click", (e)=>{
        localStorage.setItem("danh-sach-tai-san", JSON.stringify(result.danhSachTaiSan))
        localStorage.setItem("idPhong", idPhong)
        window.location.href = "detail_taisan.html"
    })
    
}
