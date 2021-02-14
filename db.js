const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

        console.log('MongoDB connected');
    } catch(err) {
        console.error(err);
    }
};