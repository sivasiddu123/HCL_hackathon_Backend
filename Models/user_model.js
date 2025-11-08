const mongoose= require('mongoose');
const moment = require('moment')

const userSchema = new mongoose.Schema({
  userId:{type:String},
  firstName:{type:String},
  lastName:{type:String},
  userEmail:{type:String},
  password:{type:String},
  role:{type:String},
  providerId:{type:String},
  createdAt:{type:Number},
  updatedAt:{type:Number}
});

const userModal = mongoose.model('user_modal',userSchema);
module.exports = userModal;


