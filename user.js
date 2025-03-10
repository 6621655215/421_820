//1. โหลด user ทั้งหมดออกมาจาก api


//2.นำ user ที่โหลดมาใส่ใน html 

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('loaded')
    //1 load all users
    const response = await axios.get('http://localhost:8000')
    console.log(response.data);


    //2. นำ user ที่โหลดมาใส่ใน html
    const suerDOM = document.getElementById('users')
    let htmlData = '<div>'
    for (let i=0; i<response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
        ${user.id} ${user.firstname} ${user.lastname}
        <a href ='indexxxx.html?id=$(user.id)'> <button>Edit</button>
        <buttonclass='Delete' data-id=${user.id}')">Delete</button>
        </div>`;
    }
    
    htmlData += '</div>'
    suerDOM.innerHTML = htmlData;


    //3. ลบ user
    const deleteDOM = document.getElementsByClassName('delete');
    for(let i=0; i<deleteDOM.length; i++) {
        deleteDOM[i].addEventListener('click', async (event)=> {
            const id = event.target.dataset.id;
            try{
                await axios.delete('${MASE_URL}/${id}');
                loadData(); //recursive function = เรียกใช้ฟังก์ชันเอง
            }

            catch  {
                console.log(error);
            }
        });
    }
}

