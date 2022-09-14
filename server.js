const express = require('express')
const app = express()
const port = process.env.PORT || 3030 //Por conta do deploy no Heroku

const routes = require('./src/Routes/Routes')

app.use(routes)

//Use gate 80 because deploy aplication on web
//Change to another gate to test in localhost
app.listen(port, () => {
    console.log('Server working...')
    console.log(`http://localhost:${port}`)
})