const mongoose      = require('mongoose');
const { Schema }    = mongoose;
const bcrypt        = require('bcrypt');


const ProfileSchema = new Schema({
  username:  String,
  password: String,
  name:   String,
  surnames: String,
  email: String
});

ProfileSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 2);
    next();
});

module.exports = mongoose.model('Profile', ProfileSchema);