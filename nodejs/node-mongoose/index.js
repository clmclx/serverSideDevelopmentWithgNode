const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
   console.log('Connected to the server at ' + url);
   Dishes.create({
       name: 'pizza',
       description: 'pizza description'
   }).then(dish => {
       console.log(dish);
       return Dishes.findByIdAndUpdate(dish._id, {
           $set: {description: 'UpdatedTest'}},
       {new: true}).exec();
   }).then(dish => {
       console.log(dish);
       dish.comments.push({
           rating: 5,
           commment: 'excellent',
           author: 'ME'
       });
       return dish.save();
   }).then(dish => {
       console.log(dish);
       return Dishes.remove({});
   }).then(() => {
       return mongoose.connection.close();
   }).catch(error =>{
       console.log(error);
    })
});