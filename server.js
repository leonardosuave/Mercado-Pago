const express = require('express')
const app = express()

const routes = require('./src/Routes/Routes')

app.use(routes)

//Use gate 80 because deploy aplication on web
//Change to another gate to test in localhost
app.listen(3033, () => {
    console.log('Server working...')
})