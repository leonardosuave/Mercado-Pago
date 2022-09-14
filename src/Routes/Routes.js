const express = require('express')
const route = express.Router()
const homeController = require('../Controllers/homeController')
const pagamentoController = require('../Controllers/pagamentoController')

route.get('/', homeController.index)
route.get('/pagar', pagamentoController.index)
route.post('/notification', pagamentoController.notification)

module.exports = route