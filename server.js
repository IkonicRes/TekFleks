// Import the express library
const express = require('express');
const session = require('express-session');
const {passport} = require('./utils/auth');
const authRoutes = require('./controllers/auth');
const flash = require('connect-flash');
// Import the axios library
const axios = require('axios');
const helpers = require('./utils/helpers'); 
// Import the handlebars library
const handlebars = require('express-handlebars');
console.log(handlebars)

// Import the routes module from the './routes' file
const routes = require('./controllers');

// Import the sequelize connection from the './config/connection' file
const sequelize = require('./config/connection');

// Create an instance of the express application
const app = express();

const hbars = handlebars.create({
  helpers: helpers
})

// Set the PORT variable to the value of process.env.PORT or 3001
const PORT = process.env.PORT || 3001;

const path = require('path');

try {
  // Set the view engine to handlebars
app.engine('handlebars', hbars.engine,);
} catch (error) {
  console.log(error)
}

// Set the view engine to handlebars
app.set('view engine', 'handlebars');
// Parse incoming JSON data


app.use(express.json());

// Parse URL-encoded data with the extended option set to true
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash()); // Add this line to use connect-flash middleware

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes); 
app.use(routes);
console.log("Static routes: ", path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Sync the sequelize models to the database and start the server
sequelize.sync().then(() => {
  axios.defaults.baseURL = '127.0.0.1:3001';
  app.listen(PORT, () => {
    console.log(`App listening on port !`);
  });
}).catch((err) => {
  console.log("Unable to connect to database: ", err);
});
