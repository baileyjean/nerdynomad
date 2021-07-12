const Router = require('express').Router()
const controller = require('../controllers/RatingController')

Router.post('/', controller.AddRating)
Router.get('/', controller.GetAllRatings)
Router.get('/user/:user_id', controller.GetRatingByUserId)
Router.get('/scicenter/:scicenter_id', controller.GetRatingBySciCenterId)
Router.put('/:rating_id', controller.UpdateRating)
Router.delete('/:rating_id', controller.DeleteRating)

module.exports = Router