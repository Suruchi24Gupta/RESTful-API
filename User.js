const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

/*successfully created the models/User.js file with the user model definition using Mongoose.
This model represents users in your application and includes fields for username and password. 
You can continue building your application and use this model for user-related functionality.*/