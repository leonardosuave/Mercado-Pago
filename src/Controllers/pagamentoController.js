const PayModel = require('../Models/PagamentoModel')

exports.index = async (req, res) => {

    try {
        const pagamento = await PayModel.Shop()

        if(pagamento.status != 201) return res.send('Erro...')
        return res.redirect(pagamento.body.init_point) //Redireciona para url de checkout

    }catch(err) {
        console.log(err)
        return res.send(err.message)
    }
}

exports.notification = (req, res) => {
    console.log(req.query)
    console.log('termina aqui')
    const id = req.query.id

    setTimeout(() => {
        PayModel.Notification(id)
        
    }, 20000)

    res.send('OK')
}