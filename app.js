const express = require('express')
const app = new express();
const mongoose = require('mongoose')
const ca = require('./models/ca')
const crypto = require('crypto')

mongoose.connect('mongodb://localhost/caUrls', {useNewUrlParser: true})
let db = mongoose.connection

//Check connection
db.once('open', () => {
    console.log('Connected to Mongodb')
})
// Check db errors
db.on('error', (err) => {
    console.log(err)
})

app.use(express.json())
app.post('/api/shortner', (req, res) => {
    let originalUrl = req.body.url
    let expression = new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)
    if(!expression.test(originalUrl)){
        res.status(400).json({error: "Not a valid url"})
        return
    }
    shortUrl = crypto.randomBytes(3).toString('hex');
    caUrl = new ca({
        originalUrl,
        shortUrl
    })
    caUrl.save()
        .then(doc =>{
            res.json({
                originalUrl: doc.originalUrl,
                shortUrl: doc.shortUrl
            })
        })
        .catch(err =>{
            // console.log('Error while inserting:',err.message)
            res.status(400).json({error: err.message})
        })
})
app.get('/:surl',(req,res) =>{
    if(req.params.surl === 'favicon.ico'){
        res.end()
        return
    }
    let query = {}
    query.shortUrl = req.params.surl
    ca.findOne(query, (err, result)=>{
        if(err || !result){
            res.status(404).json({error: "Url not found"})
        }else {
            res.redirect(`${result.originalUrl}`)
        }
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, (e) => {
    if (!e) console.log('Server running on port', PORT)

})