const mongoose = require('mongoose')
const caSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
})

caModel = mongoose.model('caUrl',caSchema,'caUrls')
module.exports = caModel