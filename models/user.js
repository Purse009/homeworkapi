const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseDelete = require('mongoose-delete')
const { Schema } = mongoose
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['sale', 'admin'],
        default: 'sale',
    },
})
userSchema.plugin(mongoosePaginate)
userSchema.plugin(mongooseDelete)
module.exports = mongoose.model('User', userSchema)
