const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    department: {type: String, required: true},
    item: {type: String, required: true},
    status: {type: String, required: true, default: 'Borrowed'},
    date: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Record', RecordSchema);