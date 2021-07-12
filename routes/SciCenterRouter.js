const Router = require('express').Router()
const controller = require('../controllers/SciCenterController')

Router.post('/', controller.AddSciCenter)
Router.get('/', controller.GetAllSciCenters)
Router.get('/scicenter/:scicenter_id', controller.GetSciCenterById)
Router.get('/scicenter_op/:user_id', controller.GetSciCenterByUserId)
Router.get('/location/:state', controller.GetSciCenterByState)
Router.get('/searchby/:query', controller.GetSciCentersByQuery)
Router.put('/:scicenter_id', controller.UpdateSciCenter)
Router.delete('/:scicenter_id', controller.DeleteSciCenter)

module.exports = Router