const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('unable to retrieve villains, please try again')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const foundvillain = await models.villains.findOne({
      attributes: ['name', 'movie', 'slug'],
      where: { slug }
    })

    return foundvillain
      ? response.send(foundvillain)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('unable to retrieve villain, please try again')
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required: name, movie, slug')
    }

    const newVillain = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('unable to save villain, please try again')
  }
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
