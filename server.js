const express = require('express')
const app = express()

const routes = require('./src/Routes/Routes')

app.use(routes)

app.listen(3033, () => {
    console.log('Servidor working...')
    console.log('http://localhost:3033')
})