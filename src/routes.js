const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer');

const postController = require('../src/controllers/postController')

const messageController = require('../src/controllers/messageController')

const adminController = require('../src/controllers/adminController')

const routes = express.Router()

routes.get('/posts/:id', postController.index)
routes.get('/posts', postController.getPosts)
routes.get('/all/posts', postController.getAllPosts)
routes.post('/post', postController.createPost)

routes.put('/edit/post/:id', postController.editPost)
routes.delete('/delete/post/:id', postController.deletePost)

routes.get('/imagens/547', postController.getImagensProjeto547)
routes.get('/imagens/637', postController.getImagensProjeto637)

routes.post('/publicacao/:id', postController.createPublicacao);
routes.get('/publicacoes', postController.getPublicacao);
routes.post('/post/:id', multer(multerConfig).single("file"), postController.createImage)

routes.get('/messages', messageController.index)
routes.post('/messages', messageController.createMessage)

routes.post('/admin', adminController.index)

module.exports = routes;