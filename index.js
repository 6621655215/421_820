<<<<<<< HEAD
function submitData() {
  let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked')
    let interestDOM = document.querySelectorAll('input[name=interest]:checked')

    let descriptionDOM = document.querySelector('textarea[name=description]')

    let interest = ''

    for (let i = 0; i < interestDOM.length; i++) {
        interest += interestDOM[i].value
        if (i !== interestDOM.length - 1) {
            interest += ', '
        }
    let userData = {
        firstname: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        descriptionDOM: descriptionDOM.value,
        interest: interest
    }

    console.log('submitData', userData)
    }
}
=======
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.text());
const port = 8000;

/*
GET /users สำหรับ get user ทั้งหมด
POST /user สำหรับสร้าง user
PUT /user/:id สำหรับแก้ไข user ตาม id
DELETE /user/:id สำหรับลบ user ตาม id
*/

//เก็บ user
let user = []
let counter = 1;

//path = GET / users5
app.get('/users', (req, res) => {
  res.json(users);
})

//path = POST /user
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter;
  counter+=1
  users.push(user);
  res.json({
    message: "User create",
    user: user
  });

})

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  //หา index ของ user ที่ต้องการอัพเดท 
  let selectedindex = users.findIndex(user => user=>{

    if(user.id == id){
      return true;
    }
    else{
      return false;
    }

  });

  //update user นัั้น
  users[selectedindex].firstname = updateUser.firstname || users[selectedindex].firstname;
  users[selectedindex].lastname = updateUser.lastname || users[selectedindex].lastname; 

  res.json({
      message: "User updated",
    data: {
      user: updateUser ,
      indexUpdate: selectedindex
    }
  });


  //ส่งข้อมูล user กลับไป
  res.send(selectedindex + '')
  })

// path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  //หา index ของ user ที่ต้องการลบ
  let selectedindex = users.findIndex(user => user.id == id);

  users.splice(selectedindex, 1)
  res.json({
    message: "User deleted",
      indexDelete: selectedindex
   });
})

app.listen(port, (req, res) => {
  console.log(`Server is running on port` + port);
});
>>>>>>> 330d26ade871f71c42eb6b14c3399a68758b3fe7
