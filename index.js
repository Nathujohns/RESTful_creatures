const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.use((req,res, next)=>{
    console.log("Our own middleware!")
    console.log(`Request for ${req.method} at ${req.path}`)
    next()
})

app.use('/prehistoric_creatures',require('./controllers/prehistoric_creatures'))
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/home',require('./controllers/home'))

app.get('/', (req, res)=>{
    res.redirect('/dinosaurs')
})


app.listen(3500, ()=>{
    console.log('App is listening on port 3500!')
})