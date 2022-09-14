const MercadoPago = require('mercadopago')

//Integração e Configuração Mercado pago SDK
MercadoPago.configure({
    sandbox: true, //True porque está em desenvolvimento
    access_token: 'TEST-4721771703735817-091315-60deb4633928ddca44934b5cbabb2e1e-104451160'
})

class Pay {

    async Shop() {

        //Caso utilize banco de dados para salvar informações de pagamento, deve ter os seguintes dados:

        //  id  //  codigo  //  pagador                         // status
        //  1   //  4452211 //  leonardo.suave15@hotmail.com    // pago
        //  2   //  663355  //  leonardo.suave15@hotmail.com    // não pago

        //Possibilidades para gerar ids unicos -> UUID, UUID & Date
        //Deve salvar o id em algum lugar se utilizar banco de dados -> entra em codigo do ex acima.
        const id = '' + Date.now()
        const emailDoPagador = 'leonardo.suave15@hotmail.com' 
        
        const dados = {
            items: [
                {
                    id: id, 
                    title: 'Descrição genérica para adaptar em outros produtos.',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat(150)
                }
            ],

            payer: { //Pagador
                email: emailDoPagador
            },

            //Campo de consulta quando o MP enviar pagamento concluido
            //Deve ter o mesmo conteúdo do id do item
            external_reference: id, 
        }

        //Para enviar informação do pagamento ao banco de dados (necessário conf o banco e a sintáx)
        //Banco.SalvarPagamento({codigo: id, pagador: emailDoPagador})

        const result = await MercadoPago.preferences.create(dados)
        return result
    }
}

module.exports = new Pay()