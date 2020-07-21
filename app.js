const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = 8000
const dbUrl = "mongodb://localhost/local"
const book = require('./book.model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.set('useFindAndModify', false);
mongoose
    .connect(dbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

app.get('/', function (req, res) {
    console.log("testing!!!")
    res.send(`<h1>Its working</h1>`)
})

app.get('/books/:id', function (req, res) {
    console.log("getting books by ID")
    book.findOne({
        _id: req.params.id
    })
        .exec((err, book) => {
            if (err) {
                res.send("error has occured")
            }
            else {
                console.log("Book : ", book)
                res.json(book)
            }
        })
})

app.put('/book/:id', function (req, res) {
    console.log("updating book by ID")
    book.findOneAndUpdate({
        _id: req.params.id
    },
        {
            $set: {
                title: req.body.title
            }
        },
        { upsert: true },(err,updatedBook)=>{
            if(err){
                res.send("error while updating...")
            }
            else{
                console.log("Book :",updatedBook)
                res.send(204)
            }
        })
})

app.delete('/book/:id', function (req, res) {
    console.log("Deleting book by ID")
    book.findOneAndRemove({
        _id: req.params.id
    },(err,deletedBook)=>{
            if(err){
                res.send("error while deleting...")
            }
            else{
                console.log("Book :",deletedBook)
                res.send(deletedBook)
            }
        })
})

app.get('/books', function (req, res) {
    console.log("getting all books")
    book.find({})
        .exec((err, books) => {
            if (err) {
                res.send("error has occured")
            }
            else {
                console.log("Books : ", books)
                res.json(books)
            }
        })
})

app.post('/book', function (req, res) {
    console.log("Adding Book")
    var newBook = new book
    newBook.author = req.body.author
    newBook.title = req.body.title
    newBook.category = req.body.category
    newBook.save((err, book) => {
        if (err) {
            res.send("error while saving..")
        }
        else {
            console.log("Book : ", book)
            res.json(book)
        }
    })
})

app.listen(port, () => {
    console.log("App is listning at port : " + port)
})