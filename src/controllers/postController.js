const connection = require('../database/connection')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const aws = require('aws-sdk')

const s3 = new aws.S3();

module.exports = {
    //Retorna o post e com suas respectivas fotos
    async index(request, response) {
        const { id } = request.params;

        const publicacoes = await connection('publicacoes')
            .leftJoin('imagens', 'publicacoes.id', 'imagens.user_id')
            .where({ 'publicacoes.id': id })
            .select('*')
            .orderBy('imagens.created_at')

        return response.json(publicacoes);
    },

    async getAllPosts(request, response) {
        const publicacoes = await connection('publicacoes')
            .select('*')
            .orderBy('publicacoes.id', 'desc')

        return response.json(publicacoes);
    },

    async getPosts(request, response) {

        const publicacoes = await connection('publicacoes')
            .select('*')
            .orderBy('publicacoes.id', 'desc')
            .limit(3)

        return response.json(publicacoes);
    },

    async getImagens(request, response) {
        const { id } = request.params;

        const imagem = await connection('imagens')
            .where({ 'user_id': id })
            .select('*')
            .limit(1)

        return response.json(imagem)
    },

    async createPost(request, response) {
        const {
            atividade,
            descricao,
            area,
            data,
            projeto,
            local
        } = request.body;

        const post = await connection('publicacoes')
            .insert({
                atividade,
                descricao,
                area,
                data,
                projeto,
                local
            })
            .returning('id')

        return response.json(post)
    },

    async createImage(request, response) {
        const { id } = request.params;

        await connection('imagens')
            .insert({
                nome: request.file.originalname,
                key: request.file.key,
                size: request.file.size,
                url: request.file.location,
                user_id: id
            })



        return response.json(200).send();
    },

    async editPost(request, response) {
        const { id } = request.params;

        const {
            atividade,
            descricao,
            area,
            data,
            projeto,
            local
        } = request.body;

        await connection('publicacoes')
            .where({ 'id': id })
            .update({
                "atividade": atividade,
                "descricao": descricao,
                "area": area,
                "data": data,
                "projeto": projeto,
                "local": local
            })
        
        return response.status(200).send();
    },

    async deletePost(request, response){
        const { id } = request.params;

        const imagens = await connection('imagens')
        .where({'user_id': id})  
        .select('*')

        await connection('imagens')
        .where({'user_id': id})
        .delete();

        await connection('publicacoes')
        .where({'id' : id})
        .delete();

        for (let i = 0; i < imagens.length; i++) {

            s3.deleteObject({
                Bucket: 'maranata-pev',
                Key: imagens[i].key
            }).promise(); 
            
            // promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'temp', 'uploads', imagens[i].key))
        }
        

        return response.status(204).send();
    }
}