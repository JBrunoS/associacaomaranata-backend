const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const message = await connection('messages')
        .select('*')
        .orderBy('created_at', 'desc')

        return res.json(message)
    },

    async createMessage(req, res){
        const {
            nome,
            email,
            mensagem
        } = req.body

        await connection('messages')
        .insert({
            nome,
            email,
            mensagem
        })

        return res.status(200).send();
    }
}