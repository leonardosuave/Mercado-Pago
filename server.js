const express = require('express')
const app = express()
const MercadoPago = require('mercadopago')

//Integração e Configuração Mercado pago SDK
MercadoPago.configure({
    sandbox: false, //False porque está em desenvolvimento
    access_token: 'TEST-4721771703735817-091315-60deb4633928ddca44934b5cbabb2e1e-104451160'
})

const homeRoute = require('./src/Routes/homeRoute')

app.use(homeRoute)

app.listen(3033, () => {
    console.log('Servidor working...')
    console.log('http://localhost:3033')
})