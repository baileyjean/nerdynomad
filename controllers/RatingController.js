const { Rating, User } = require('../models')

const AddRating = async (req, res) => {
  try {
    const rating = await Rating.create(req.body)
    res.send(rating)
  } catch (error) {
    throw error
  }
}

const GetAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll()
    res.send(ratings)
  } catch (error) {
    throw error
  }
}

const DeleteRating = async (req, res) => {
  try {
    let ratingId = parseInt(req.params.rating_id)
    await Rating.destroy({ where: { id: ratingId } })
    res.send({ message: `Goodbye, Nerdy Rating` })
  } catch (error) {
    throw error
  }
}

const UpdateRating = async (req, res) => {
  try {
    let ratingId = parseInt(req.params.rating_id)
    let updatedRating = await Rating.update(req.body, {
      where: { id: ratingId },
      returning: true
    })
    res.send(updatedRating)
  } catch (error) {
    throw error
  }
}

const GetRatingByUserId = async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.user_id)
    res.send(rating)
  } catch (error) {
    throw error
  }
}

const GetRatingBySciCenterId = async (req, res) => {
  try {
    let sciCenterId = parseInt(req.params.scicenter_id)
    const ratings = await Rating.findAll({
      where: { scicenter_id: sciCenterId },
      include: [{ model: User, attributes: ['name'] }]
    })
    res.send(ratings)
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddRating,
  GetAllRatings,
  DeleteRating,
  UpdateRating,
  GetRatingByUserId,
  GetRatingBySciCenterId
}