const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/restaurant';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log('Printing the inserted dish ::: => ', dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                description: 'updated dish'
            },{
                new: true
            }).exec();
        })
        .then((dish) => {
            console.log('Printing the updated dish ::: => ', dish);

            dish.comments.push({
                rating: 5, 
                author: 'Libin',
                comment: 'very tasty'
                
            });
            return dish.save();
        })
        .then((dish) => {
        
            console.log('Printing the dish after adding comment ::: => ', dish);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});