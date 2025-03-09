const validateData = (userData) => {
  let errors = [];
  if (!userData.firstname) {
      errors.push('กรุณากรอกชื่อ');
  }
  if (!userData.lastname) {
      errors.push('กรุณากรอกนามสกุล');
  }
  if (!userData.age) {
      errors.push('กรุณากรอกอายุ');
  }
  if (!userData.gender) {
      errors.push('กรุณาเลือกเพศ');
  }
  if (!userData.description) {
      errors.push('กรุณากรอกข้อมูลตัวเอง');
  }
  if (!userData.interests) {
      errors.push('กรุณาเลือกความสนใจ');
  }
  return errors;
};

const submitData = async () => {
  let firstNameDOM = document.querySelector('input[name="firstname"]');
  let lastnameDOM = document.querySelector('input[name="lastname"]');
  let genderDOM = document.querySelector('input[name="gender"]:checked');
  let ageDOM = document.querySelector('input[name="age"]');
  let interestDOMs = document.querySelectorAll('input[name="interest"]:checked');
  let descriptionDOM = document.querySelector('textarea[name="description"]');
  let messageDOM = document.getElementById('message');

  let interests = [...interestDOMs].map(el => el.value).join(',') || '';

  let userData = {
      firstname: firstNameDOM.value.trim() || '',
      lastname: lastnameDOM.value.trim() || '',
      age: ageDOM.value.trim() || '',
      gender: genderDOM.value || '',
      description: descriptionDOM.value.trim() || '',
      interests: interests
  };

  console.log('submitData', userData);
  
  const errors = validateData(userData);
  if (errors.length > 0) {
      let errorHTML = `<div class="error-box"><strong>กรุณากรอกข้อมูลให้ครบถ้วน</strong><ul>`;
      errors.forEach(err => {
          errorHTML += `<li>${err}</li>`;
      });
      errorHTML += '</ul></div>';
      
      messageDOM.innerHTML = errorHTML;
      messageDOM.className = 'message danger';
      return;
  }

  try {
      const response = await axios.post('http://localhost:8000/users', userData);
      console.log('response', response.data);

      messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย';
      messageDOM.className = 'message success';
  } catch (error) {
      console.log('error message', error.message);

      let errorHTML = `<div class="error-box"><strong>เกิดข้อผิดพลาด</strong><ul>`;
      if (error.response) {
          error.message = error.response.data.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์';
          error.errors = error.response.data.errors || ['โปรดลองอีกครั้ง'];
      } else {
          error.message = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์';
          error.errors = ['โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'];
      }

      errorHTML += `<li>${error.message}</li>`;
      error.errors.forEach(err => {
          errorHTML += `<li>${err}</li>`;
      });
      errorHTML += '</ul></div>';

      messageDOM.innerHTML = errorHTML;
      messageDOM.className = 'message danger';
  }
};
