const MercadoPago = require('mercadopago')
const PayModel = require('../Models/PagamentoModel')

//Integração e Configuração Mercado pago SDK
MercadoPago.configure({
    sandbox: true, //True porque está em desenvolvimento
    access_token: 'TEST-4721771703735817-091315-60deb4633928ddca44934b5cbabb2e1e-104451160'
})

exports.index = async (req, res) => {

    try {
        const pagamento = await PayModel.Shop()
        console.log(pagamento.status)

        if(pagamento.status != 201) return res.send('Erro...')
        return res.redirect(pagamento.body.init_point) //Redireciona para url de checkout

    }catch(err) {
        console.log(err)
        return res.send(err.message)
    }
}