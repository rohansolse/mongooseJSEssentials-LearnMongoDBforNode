const mongoose = require('mongoose')
const Schema = mongoose.Schema

// var BookSchema = Schema({
//     title: String,
//     published: {
//         type: Date,
//         default: Date.now
//     },
//     keywords: Array,
//     published: Boolean,
//     author: {
//         type: Schema.ObjectId,
//         ref:'User'
//     },
//     details:{
//         modelNumber: Number,
//         hardcoever: Boolean,
//         review: Number,
//         rank: Number
//     }
// })

var BookSchema = new Schema({
    title: String,
    author: String,
    category: String
})

module.exports = mongoose.model('Book',BookSchema)