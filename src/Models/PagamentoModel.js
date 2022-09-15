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

            //Campo de consulta quando o MP enviar notificação de pagamento
            //Deve ter o mesmo conteúdo do id do item para posteriormente buscar no banco de dados e alterar o status de pagamento.
            external_reference: id, 
        }

        //Para enviar informação do pagamento ao banco de dados (necessário conf o banco e a sintáx)
        //Banco.SalvarPagamento({codigo: id, pagador: emailDoPagador})

        const result = await MercadoPago.preferences.create(dados)
        return result
    }
    
    Notification(id) {
        //Documentação buscar por busca de pagamento para ver as possibilidades de dados que podem ser utilizado para filtrar a busca de pagamento

        //Busca sem filtro retorna todos os pagamentos efetuados e cancelados na conta
        const filtro = {
            //Filtragem do pagamento por id, obtido no req.query do link de pagamento
            'order.id': id
        }

        MercadoPago.payment.search({
            //qs é o campo que recebe o filtro
            qs: filtro
        }).then(data => {

            const pagamento = data.body.results[0]
            if(pagamento != undefined) {
                //Vai printa no console da aplicação varios dados que podem ser utilizados
                //console.log(pagamento)

                /*
                Aqui os 2 dados mais importante (pagamento.status e pagamento.external_reference) que retornará o status de pagamento e o id da compra
                */

                console.log(pagamento.status)
                console.log(pagamento.external_reference)

                /*
                Caso pagamento.status == aproved então fará uma busca no banco de dados através do id da compra (código no banco de dados) pelo campo pagamento.external_reference e vai setar o status como PAGO.

                EX.
                if(pagamento.status == aproved) {
                    (Mongo)
                    Banco.findById(pagamento.external_reference, status: pagamento.status)
                }

                */

            }else {
                console.log('Pagamento não existe.')
            }

            console.log(data)      
        }).catch(err => {
            console.log(err)
        })
    }

}

module.exports = new Pay()