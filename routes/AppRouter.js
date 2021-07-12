const Router = require('express').Router()

const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const SciCenterRouter = require('./SciCenterRouter')
const CommentRouter = require('./CommentRouter')
const RatingRouter = require('./RatingRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/scicenters', SciCenterRouter)
Router.use('/comments', CommentRouter)
Router.use('/ratings', RatingRouter)

module.exports = Router