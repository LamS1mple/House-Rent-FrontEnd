const idPhong = parseInt(localStorage.getItem("idPhong"));
const giaPhong = document.querySelector("#gia");
const namePhong = document.querySelector("#name-phong");
const infPhong = document.getElementById("inf-phong");
const locationPhong = document.querySelector("#location");
var result;
const listTaiSan = document.querySelector("#list-tai-san");

let landat = JSON.parse(localStorage.getItem("landat"))

getPhongId();
checkAddPhong()
async function getPhongId() {
  const response = await fetch("http://localhost:8080/phong/" + idPhong);
  const data = await response.json();
  result = data.result;
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

document.querySelector("#them-phong").addEventListener("click",async (e)=>{
  
  landat.push(idPhong)
  localStorage.setItem("landat",JSON.stringify(landat))
  addStyle()
})

function checkAddPhong(){
  const lanDat = JSON.parse(localStorage.getItem("landat"));
  if (lanDat.indexOf(idPhong) != -1){
    addStyle()
  }
}

function addStyle(){
  document.querySelector("#them-phong").innerHTML = 
    `<i class="fa fa-shopping-cart mr-1"></i>Đã có trong lần đặt`
    document.querySelector("#them-phong").classList.add("add-style")
}



