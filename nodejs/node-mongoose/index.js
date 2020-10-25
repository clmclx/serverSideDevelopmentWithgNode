const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
   console.log('Connected to the server at ' + url);
   var newDish = Dishes({
       name: 'Pizza',
       description: 'pizza description'
   });

   newDish.save().then(dish => {
       console.log(dish);
       return Dishes.find({});
   }).then(dishes => {
       console.log(dishes);
       return Dishes.remove({});
   }).then(() => {
       return mongoose.connection.close();
   }).catch(error =>{
       console.log(error);
    })
});