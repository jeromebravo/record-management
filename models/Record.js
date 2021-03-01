const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    department: {type: String, required: true},
    itemId: {type: mongoose.Types.ObjectId, ref: 'Item'},
    itemName: {type: String, required: true},
    itemQuantity: {type: Number, required: true},
    studentNumber: {type: String, required: true},
    contact: {type: String, required: true},
    status: {type: String, required: true, default: 'Borrowed'},
    dateBorrowed: {type: Date, required: true, default: Date.now},
    dateReturned: {type: Date, default: null}
});

module.exports = mongoose.model('Record', RecordSchema);