const express = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');


// const User = require('./models/user');

// Mongoose - we do not need a database connection set up as mongoose
// does it for us.
const mongoose = require('mongoose');

const app = express();

// set let us declare a global configuration value
// in this case we are setting up the template we want to handle dynamic content in our views
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse body from a form if we need another such as json or file we would use another tool
app.use(bodyParser.urlencoded({ extended: false }));

// serve static pages - this means directly forwarded to the file system.
// Basically content not handled by routers
// express.static grants read access to the path given
// express takes any request that tries to find some file such as .css or .js it will
// automatically will forward it to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// we add a field to a req object to save the user I get from db after initialization in req
// app.use((req, res, next) => {
//   User.findById('6092ba2fe68f4b55a56a7031')
//     .then((user) => {
//       // we can add a field like this to req object
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// using filters so all the routes in admin contain admin at the beggining
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// same string that was given in mongoDB
mongoose
  .connect(
    // 'mongodb+srv://yidah:yidah@cluster0.ym4dc.mongodb.net/shopdb?retryWrites=true&w=majority'
    'mongodb+srv://yidah:yidah@cluster0.7agkk.mongodb.net/shopdb?retryWrites=true&w=majority'
  )
  .then((results) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
