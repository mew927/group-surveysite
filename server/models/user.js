let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a model class
let UserModel = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "Username is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "Display name is required"
    }
},
    {
        collection: "users"
    }
);


// configure options for User Model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});
UserModel.plugin(passportLocalMongoose, options);
module.exports = mongoose.model('User', UserModel);