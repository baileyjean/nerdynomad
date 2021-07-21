const { SciCenter, Comment, Rating } = require('../models')
const { Op } = require('sequelize')

const AddSciCenter = async (req, res) => {
  try {
    const sciCenter = await SciCenter.create(req.body)
    res.send(sciCenter)
  } catch (error) {
    throw error
  }
}

const GetAllSciCenters = async (req, res) => {
  try {
    const sciCenters = await SciCenter.findAll({
      order:
        ['state']
      })
    res.send(sciCenters)
  } catch (error) {
    throw error
  }
}

const GetSciCenterById = async (req, res) => {
  try {
    const sciCenter = await SciCenter.findByPk(req.params.scicenter_id)
    res.send(sciCenter)
  } catch (error) {
    throw error
  }
}

const GetSciCenterCommentsAndRatings = async (req, res) => {
  try {
    const completeSciCenter = await SciCenter.findOne({
      where: { id: req.params.scicenter_id },
      include: [
        { model: Rating },
        { model: Comment}
      ] 
    })
    res.send(completeSciCenter)
  } catch (error) {
    throw(error)
  }
}

const GetSciCenterByUserId = async (req, res) => {
  try {
    const sciCenter = await SciCenter.findAll({
      where: {
        user_id: req.params.user_id
      }
    })
    res.send(sciCenter)
  } catch (error) {
    throw error
  }
}

const GetSciCenterByState = async (req, res) => {
  try {
    let sciCenterState = req.params.state
    let sciCentersByState = await SciCenter.findAll({
      where: { state: {
        [Op.iLike]: `%${sciCenterState}%`
      }}
    })
    res.send(sciCentersByState)
  } catch (error) {
    throw error
  }
}

const GetSciCentersByQuery = async (req, res) => {
  let query = req.params.query
  let compstring = `%${query}%`
  const results = await SciCenter.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: compstring } },
        { description: { [Op.iLike]: compstring } },
        { state: { [Op.iLike]: compstring } }
      ]
    }
  })
  res.send(results)
}

const UpdateSciCenter = async (req, res) => {
  try {
    let sciCenterId = parseInt(req.params.scicenter_id)
    let updatedSciCenter = await SciCenter.update(req.body, {
      where: { id: sciCenterId },
      returning: true
    })
    res.send(updatedSciCenter)
  } catch (error) {
    throw error
  }
}

const DeleteSciCenter = async (req, res) => {
  try {
    let sciCenterId = parseInt(req.params.scicenter_id)
    await SciCenter.destroy({
      where: { id: sciCenterId },
      returning: true
    })
    res.send({ message: `Science Centers close all the time - this is sad - this is why I built this app` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddSciCenter,
  GetAllSciCenters,
  GetSciCenterById,
  GetSciCenterCommentsAndRatings,
  GetSciCenterByUserId,
  GetSciCenterByState,
  GetSciCentersByQuery,
  UpdateSciCenter,
  DeleteSciCenter
}