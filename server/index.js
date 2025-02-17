const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const mysql = require('mysql2/promise');
app.use(bodyParser.json());
let users = []
let conn = null
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8830
  })
}
app.get('/testdb-new', async (req, res) => {
  try {
    const result = await conn.query('SELECT * FROM users')
    res.json(result[0])
  }catch (error) {
    console.log('Error fetching users: ', error.message)
    res.status(500).json({error: 'Error fetching users'})
  }
})


app.get('/users', async(req, res) => {
  const result = await conn.query('SELECT * FROM users')
  res.json(users);
})
app.post('/users', async(req, res) => {
  let user = req.body;
  const result = await conn.query('INSERT INTO users ?',user)
  console.log('Result: ', result)
  res.json({
    message: 'Data has been added',
    data: result[0]
  });
})
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter
  counter += 1
  users.push(user);
  res.json({
    message: 'Data has been added',
    user: user
  })
})
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  let selectedIndex = users.findIndex(user => user.id == id)
  if (updateUser.firstname){
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  }
  if (updateUser.lastname){
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
  }
  res.json({
    message: 'Data has been updated',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  });
})
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex(user => user.id == id)
  users.splice(selectedIndex, 1)
  res.json({
    message: "Delete Completed",
    indexDeleted: selectedIndex
  });
})
app.listen(port, async(req, res) => {
  await initMySQL()
  console.log('Server is running on port' + port);
});