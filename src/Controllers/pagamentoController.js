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
    const id = req.query.id

    //Necessário porque a notificação e feita mais rápida do que o cadastro de status como pago no banco de dados e então não teremos o retorno da notificação de pagamento.
    //Portanto fazer a busca da notificação após um tempo.
    setTimeout(() => {
        PayModel.Notification(id)
        
    }, 20000)

    res.send('OK')
}