const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    category: { type: String, required: true },
    opening: { type: String, required: true },
    closing: { type: String, required: true },
    creator: { type: String, required: true }
});

module.exports = mongoose.model('Shop', shopSchema);