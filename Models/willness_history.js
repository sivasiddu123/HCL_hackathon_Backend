const mongoose = require('mongoose');
// const moment = require('moment')

const wellnessSchema = new mongoose.Schema({
    userId: { type: String },
    vitalType: { type: String },
    count: { type: String },
    createdAt: { type: Number },
    type: { type: String,enum:['goal','input'] }
});

const wellnessModal = mongoose.model('wellness_modal', wellnessSchema);
module.exports = wellnessModal;


