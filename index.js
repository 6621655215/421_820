const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id)

  if (id) {
    mode = 'EDIT'
    selectedId = id
    //1.เราจัดึงข้อมูล user ที่ต้องการแก้ไข
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`)
      const user = response.data
      console.log('response', response.data)

    let firstNameDOM = document.querySelector('input[name="firstname"]')
    let lastnameDOM = document.querySelector('input[name="lastname"]')
    let ageDOM = document.querySelector('input[name="age"]');
    let descriptionDOM = document.querySelector('textarea[name="description"]')

    let genderDOMs = document.querySelector('input[name="gender"]')
    let interestDOMs = document.querySelectorAll('input[name="interest"]')

    for (let i = 0; i < genderDOMs.length; i++) {
        if (genderDOMs[i].value === user.gender) {
            genderDOMs[i].checked = true
        }
      }

    for (let i = 0; i < interestDOMs.length; i++) {
        if (user.interests.includes(interestDOMs[i].value)) {
            interestDOMs[i].checked = true
        }
    }

    firstNameDOM.value = user.firstname
    lastnameDOM.value = user.lastname
    ageDOM.value = user.age
    descriptionDOM.value = user.description


    }
    catch (error) {
      console.log('error', error)
    }

    //2. นำข้อมูลมาใส่ใน form
  }
}
const validateData = (userData) => {
    let errors = []
    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!userData.gender) { 
        errors.push('กรุณาเลือกเพศ')
    }
    if (!userData.description) {
        errors.push('กรุณากรอกข้อมูลตัวเอง')
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจ')
    }
    return errors;
};

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name="firstname"]')
    let lastnameDOM = document.querySelector('input[name="lastname"]')
    let genderDOM = document.querySelector('input[name="gender"]:checked') || {}
    let ageDOM = document.querySelector('input[name="age"]');
    let interestDOMs = document.querySelectorAll('input[name="interest"]:checked') || {}
    let descriptionDOM = document.querySelector('textarea[name="description"]')

    let messageDOM = document.getElementById('message')
    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i < interestDOMs.length - 1) {
                interest += ','
            }
        }
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }

        console.log('submitData', userData)
        //const errors = validateData(userData);
        //if (errors.length > 0) {
           // throw {
               // message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
               // errors: errors
        //}
        //const result = await continue.query('INSERT INTO users SET ?', user);
        

        let message = 'บันทึกข้อมูงเรียบร้อย'

        if (mode === 'CREATE') {
          const response = await axios.post(`${BASE_URL}/users`, userData)
          console.log('response', response.data)
        }
        else {
          const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
          message = 'แก้ไขข้อมูลเรียบร้อย'
          console.log('response', response.data)
        }

        const response = await axios.post(`${BASE_URL}/users`, userData)
        console.log('response', response.data);
            messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย'
            messageDOM.className = 'message success'
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)
        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>` // แก้ไข: เปลี่ยนวิธีการใช้ Template Literal
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>` // แก้ไข: ใช้ <li> อย่างถูกต้อง
        }
        htmlData += '</ul>'
        htmlData += '</div>'

        messageDOM.innerHTML = htmlData// แก้ไข: เปลี่ยนจาก innerText เป็น innerHTML เพื่อให้แสดงผลเป็น HTML
        messageDOM.className = 'message danger'
    }
};