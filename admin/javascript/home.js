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

const content = document.querySelector("#content")

getDataPhong()

async function getDataPhong(){
    const response = await( fetch("http://localhost:8080/phong/list-phong") )
    const phong = await response.json();
    
    phong.forEach(element => {
        const item = document.createElement("div")
        let value = ""
        if (element.trangThai){
            value = `<div class="property p-3 mb-2 bg-success text-white" style="display: flex;">`
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
            <input type=text value="${element.id}" >
        </div>
        </div>`
        content.appendChild(item)
    });
    
    document.querySelectorAll(".xemchitiet").forEach((element, index) =>{
        element.addEventListener("click", (e)=>{
            
            localStorage.setItem("idPhong", document.querySelectorAll("input")[index].value)
            window.location = "detail_phong.html"
        })
    })
}

