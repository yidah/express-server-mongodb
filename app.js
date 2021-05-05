const express = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // we can add a field like this to req object
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// using filters so all the routes in admin contain admin at the beggining
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// THIS RUNS WHEN INITIALIZING
// THE "app.use" lines of code are middleware that run only when incoming request are made

//defining relations in the db
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// this (any of hasOne or belongsTo) wil add Cart id  in Cart table whih is the user id that the cart belongs
User.hasOne(Cart);
Cart.belongsTo(User);

// This only works with an intermediate table (CartItem) that holds the cart and product id's
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// one to many relationships
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

//Syncs model by creating the appropiate tables according to our model
sequelize
  // .sync({ force: true })
    .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Yidah', email: 'yidah@test.com' });
    }
    return user;
  })
  .then((user) => {
    // console.log(result);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
