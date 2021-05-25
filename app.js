const path = require('path')

const express = require('express');
const {get404} = require('./controllers/error')

// importing the database connection
const db = require('./utils/database');


// Routes
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop')

db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result[0])
  })
  .catch(err => {
    console.log(err)
  });

const app = express();

const PORT = 3000;

// Setting templating engines
app.set('view engine', 'ejs');
app.set('views', 'views');

// Express bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoute)
app.use(shopRoute)

// Show 404 for handled routes
app.use(get404)


app.listen(PORT, () =>{
  console.log(`Server running on Port ${PORT}`)
})