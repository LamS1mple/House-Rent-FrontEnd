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
function formatDate(currentDate){
  const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1 và padStart để đảm bảo có 2 chữ số
const day = String(currentDate.getDate()).padStart(2, '0');
return year +"-"+ month + "-" + day;
}

const content = document.querySelector("#content")
let data = JSON.parse(localStorage.getItem("dateSreach"))
if (data == null){
  const ngayBatDau = formatDate(new Date());
  const ngayKetThuc = (formatDate(new Date((new Date() ).getTime()+ 86400000)))
  data = {ngayBatDau, ngayKetThuc}
  localStorage.setItem("dateSreach", JSON.stringify(data))
}
console.log(data)


async function getDataPhong(data){

    const phong = await postData("http://localhost:8080/phong/empty-phong", data);
    content.innerHTML = ""

    phong.forEach(element => {
        const item = document.createElement("div")
        let value = ""
        if (element.trangThai){
            value = `<div class="property" style="display: flex;">`
        }
        else{
            value = `<div class="property" style="display: flex;">`
        }
        item.innerHTML = 
        `${value}
        <img style="width: 400px;" src="../img//house/house.jpg" alt="Nhà trống 1">
        <div class="property-info">
            <h3>${element.tenPhong}</h3>
            <p>Giá thuê: ${element.donGiaPhong}/tháng</p>
            <p>Địa chỉ: ${element.diaChi}</p>
            <p>Mô tả: ${element.thongTinPhong}</p>
            <button  class="xemchitiet btn btn-info" >Chi tiết</button>
            <input class="idPhong" type=text value="${element.id}" >
        </div>
        </div>`
        content.appendChild(item)
    });
    

    document.querySelectorAll(".xemchitiet").forEach((element, index) =>{
        element.addEventListener("click", (e)=>{
            
            localStorage.setItem("idPhong", parseInt(document.querySelectorAll(".idPhong")[index].value))
            window.location = "detail_phong.html"
        })
    })
    
}

const ngayBatDauInput = document.querySelector("#bd")
const ngayKetThucInput = document.querySelector("#kt")
const submit = document.querySelector("#submit")
getDataPhong(data)
ngayBatDauInput.value = data.ngayBatDau
ngayKetThucInput.value = data.ngayKetThuc
submit.addEventListener("click", (e)=>{

  const dateSreach = {
    ngayBatDau: ngayBatDauInput.value,
    ngayKetThuc: ngayKetThucInput.value
  }
  let lanDat =[];
  localStorage.setItem("landat", JSON.stringify(lanDat))
  console.log(dateSreach)
  localStorage.setItem("dateSreach", JSON.stringify(dateSreach))

  getDataPhong(dateSreach)
  e.preventDefault()

})
