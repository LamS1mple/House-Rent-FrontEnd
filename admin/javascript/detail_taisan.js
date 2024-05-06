

let renListTaiSan = document.querySelector("#list-tai-san")
let count = 0;
var idEdit = 0
var idTaiSan = 0;

let listTaiSan = JSON.parse(localStorage.getItem("danh-sach-tai-san"))
rentList()
function rentList(){
    renListTaiSan.innerHTML = ''
    listTaiSan.forEach((element, index) => {
        let item = document.createElement("tr")
        item.innerHTML = `
  
                <td>${index + 1}</td>
                <td>${element.taiSan.tenTaiSan}</td>
                <td>${element.soLuong}</td>
                <td>${toTienDot(element.taiSan.donGia + "")}đ</td>
                <td>${element.moTa}</td>
                <td><img src="path_to_image" alt="Hình ảnh"></td>
                <td><button class="edit btn btn-primary">Edit</button>
                    <button  style="margin-left: 20px;" class="delete btn btn-danger">Delete</button>
                    <input style="visibility: hidden;" type=text value="${element.id}"
                </td>

        `
        renListTaiSan.appendChild(item)
    });
    clickButton()

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
  
  
async function postData(url = "", data = {}, method = "POST") {
   
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
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

async function clickButton(){
    const listId = document.querySelectorAll("input")
    console.log(count ++)
    document.querySelectorAll(".delete").forEach((element, index) =>{
        element.addEventListener('click', async (e)=>{
            console.log("http://localhost:8080/chi-tiet-tai-san/" + listId[index].value)
            const response = await ( fetch("http://localhost:8080/chi-tiet-tai-san/" + listId[index].value))
            listTaiSan.splice(index , 1);
            rentList()
        })
       
    })

    document.querySelectorAll(".edit").forEach((element, indexs) =>{
      element.addEventListener("click", async(e) =>{
        idEdit = listTaiSan[indexs].id
        const list = document.querySelector("#danh-sach-tai-san")
        list.innerHTML = ''
        const response = await (fetch("http://localhost:8080/tai-san/get-all-tai-san"))
        const data = await response.json()
        document.querySelector("#soLuong").value = listTaiSan[indexs].soLuong
        document.querySelector("#mo-ta").value = listTaiSan[indexs].moTa
        data.forEach((element, index) =>{
          let item = document.createElement("tr")
            var kk = ""
          
            if (element.id == listTaiSan[indexs].taiSan.id){
              kk = `<input type="radio" checked class="btn-check" name="options-outlined" id="${element.id}" autocomplete="off">`
            }else{
              kk = `<input type="radio" class="btn-check" name="options-outlined" id="${element.id}" autocomplete="off">`
            }
          
          item.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${element.tenTaiSan}</td>
                  <td>${toTienDot(element.donGia + "")}đ</td>
                  
                  <td>
                    ${kk}
                    <label class="btn btn-outline-success" for="${element.id}">Chọn</label>
                  </td>
          `
          list.appendChild(item)
        })
        list.style.overflow = "scroll"
        document.querySelector(".overlay-buttons").style.visibility = 'visible'
        document.querySelector("#danh-sach-tai-san").style.backgroundColor  = '#ffffff'
      })
    })

    localStorage.setItem("danh-sach-tai-san", JSON.stringify(listTaiSan))
}



document.querySelector("#add").addEventListener("click",async (e)=>{
  const list = document.querySelector("#danh-sach-tai-san")
  list.innerHTML = ''
  idEdit = 0
  const response = await (fetch("http://localhost:8080/tai-san/get-all-tai-san"))
  const data = await response.json()
  data.forEach((element, index) =>{
    let item = document.createElement("tr")
    item.innerHTML = `
            <td>${index + 1}</td>
            <td>${element.tenTaiSan}</td>
            <td>${toTienDot(element.donGia + "")}đ</td>
            <td><img src="path_to_image" alt="Hình ảnh"></td>
            <td>
              <input type="radio" class="btn-check" name="options-outlined" id="${element.id}" autocomplete="off">
              <label class="btn btn-outline-success" for="${element.id}">Chọn</label>
            </td>
    `
    list.appendChild(item)
  })
  list.style.overflow = "scroll"
  document.querySelector(".overlay-buttons").style.visibility = 'visible'
  document.querySelector("#danh-sach-tai-san").style.backgroundColor  = '#ffffff'
})

document.querySelector("#cancel").addEventListener("click", (e)=>{
  document.querySelector(".overlay-buttons").style.visibility = 'hidden'

})

document.querySelector("#save").addEventListener("click",  (e)=>{
  const soLuong = parseInt(document.querySelector("#soLuong").value)
  const moTa = document.querySelector("#mo-ta").value
  if (idEdit == 0){
    document.querySelector("#mo-ta").value = ''
    document.querySelector("#soLuong").value= ''
  }
  document.querySelectorAll(".btn-check").forEach(async (element) =>{

    if (element.checked && moTa !== '' && soLuong){
      let data = {}
      if (idEdit == 0){
        data = {
          soLuong:soLuong,
          moTa:moTa,
          taiSanId : element.id,
          phongId:localStorage.getItem("idPhong")}
      }else{
        data = {
        id: idEdit,
        soLuong:soLuong,
        moTa:moTa,
        taiSanId : element.id,
        phongId:localStorage.getItem("idPhong")
        }
      }
      console.log(data)
      await (postData("http://localhost:8080/tai-san/save-tai-san-phong", data))
      const response = await fetch("http://localhost:8080/phong/" + localStorage.getItem("idPhong"));
      const dataResponse = await response.json();
      
      listTaiSan = dataResponse.result.danhSachTaiSan;
      console.log(listTaiSan)
      rentList()
      document.querySelector(".overlay-buttons").style.visibility = 'hidden'

    }
  })
})