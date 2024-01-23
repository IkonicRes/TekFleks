// Import the express library
const express = require('express');

// Import the path library
const path = require('path');

// Import the session library from express-session
const session = require('express-session');

// Import the passport object from the './utils/auth' file
const {passport} = require('./utils/auth');

// Import the authRoutes module from the './controllers/auth' file
const authRoutes = require('./controllers/auth');

// Import the flash library from connect-flash
const flash = require('connect-flash');

// Set the port from the environment or use 3001
const PORT = process.env.PORT || 5173;

// Import the axios library
const axios = require('axios');

// Import the helpers module from the './utils/helpers' file
const helpers = require('./utils/helpers');

// Import the handlebars library
const handlebars = require('express-handlebars');

// Import the routes module from the './controllers' file
const routes = require('./controllers');

// Import the sequelize connection from the './config/connection' file
const sequelize = require('./config/connection');

// Import the cookie-parser library
const cookieParser = require('cookie-parser');

// Create an instance of the express application
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Create an instance of handlebars with custom helpers
const hbars = handlebars.create({
  helpers: helpers,
  });


try {
  // Set the view engine to handlebars
  app.engine('handlebars', hbars.engine);
} catch (error) {
  console.log(error)
}

// Set the view engine to handlebars
app.set('view engine', 'handlebars');

// Parse incoming JSON data
app.use(express.json());

// Parse URL-encoded data with the extended option set to true
app.use(express.urlencoded({ extended: true }));

// Use session middleware
app.use(session({
  secret: 'filliflouusloa',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
}
}));

// Use flash middleware from connect-flash
app.use(flash());

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use authRoutes middleware for authentication routes
app.use(authRoutes);

// Use routes middleware for other routes
app.use(routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

hbars.handlebars.registerHelper('async', async function(context, options) {
  const value = await context;
  return new hbars.handlebars.SafeString(value);
});

// Sync the sequelize models to the database and start the server
sequelize.sync({force: false}).then(() => {
  axios.defaults.baseURL = `127.0.0.1:${PORT}`;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch((err) => {
  console.log("Unable to connect to database: ", err);
});
