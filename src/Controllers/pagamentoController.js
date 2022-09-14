const PayModel = require('../Models/PagamentoModel')

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