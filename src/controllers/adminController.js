const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { email, senha } = request.body;

        console.log(email, senha);

        const admin = await connection('admin')
        .where({
            'email': email,
            'senha': senha
        })
        .select('admin.id');

        return response.json(admin); 
    }
}