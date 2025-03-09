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
  if (!userData.interests || userData.interests.length === 0) {
      errors.push('กรุณาเลือกความสนใจ');
  }
  if (!userData.description) { 
      errors.push('กรุณากรอกข้อมูล');
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
  let formContainer = document.querySelector('.container');

  if (!messageDOM) {
      console.error('ไม่พบ element ที่มี id="message" ใน HTML');
      return;
  }

  let interest = [];
  for (let i = 0; i < interestDOMs.length; i++) {
      interest.push(interestDOMs[i].value);
  }

  let userData = {
      firstname: firstNameDOM?.value || '',
      lastname: lastnameDOM?.value || '',
      age: ageDOM?.value || '',
      gender: genderDOM ? genderDOM.value : '',
      description: descriptionDOM?.value || '',
      interests: interest
  };
  console.log('submitData', userData);
  
  try {
      const errors = validateData(userData);
      if (errors.length > 0) {
          throw {
              message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
              errors: errors
          };
      }
      
      const response = await axios.post('http://localhost:8000/users', userData);
      console.log('response', response.data);
      messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย';
      messageDOM.className = 'message success';
      showAlert('ข้อมูลบันทึกสำเร็จ!', 'success');
  } catch (error) {
      console.log('error message', error.message);
      let htmlData = '<div class="error-box" style="background-color: #ffcccc; padding: 10px; border-radius: 5px; margin-bottom: 10px;">';
      htmlData += '<div><strong>' + error.message + '</strong></div>';
      htmlData += '<ul>';
      if (error.errors && error.errors.length > 0) {
          error.errors.forEach(err => {
              htmlData += '<li>' + err + '</li>';
          });
      }
      htmlData += '</ul>';
      htmlData += '</div>';
      
      messageDOM.innerHTML = htmlData;
      messageDOM.className = 'message danger';
      formContainer.insertBefore(messageDOM, formContainer.querySelector('.button').parentElement);
      showAlert('กรุณากรอกข้อมูลให้ครบถ้วน!', 'danger');
  }
};

const showAlert = (message, type) => {
  let alertBox = document.createElement('div');
  alertBox.classList.add('alert', type); 
  alertBox.innerText = message;
  document.querySelector('.container').insertBefore(alertBox, document.querySelector('.header'));
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
};
