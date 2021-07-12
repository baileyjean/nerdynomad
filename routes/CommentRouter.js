const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.post('/', controller.AddComment)
Router.get('/', controller.GetAllComments)
Router.get('/user/:user_id', controller.GetCommentByUserId)
Router.get('/scicenter/:scicenter_id', controller.GetCommentBySciCenterId)
Router.put('/:comment_id', controller.UpdateComment)
Router.delete('/:comment_id', controller.DeleteComment)

module.exports = Router