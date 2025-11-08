const mongoose= require('mongoose');
const moment = require('moment')

const preventSchema = new mongoose.Schema({
 startTime:{type:Number},
 endTime:{type:Number},
 message:{type:Number}

});

const preventModal = mongoose.model('prevents_modal',preventSchema);
module.exports = preventModal;


