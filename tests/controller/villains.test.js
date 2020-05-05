/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')
const { villains, singleVillain, postedVillain } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let sandbox
  let stubbedCreate
  let stubbedFindAll
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedCreate = sandbox.stub(models.villains, 'create')
    stubbedFindAll = sandbox.stub(models.villains, 'findAll')
    stubbedFindOne = sandbox.stub(models.villains, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })
  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  afterEach(() => {
    sandbox.reset()
  })


  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villains)

      const response = { send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villains)
    })
    it('returns a 500 status when an error occurs retrieving the villains', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('unable to retrieve villains, please try again')
    })
  })
  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send with it', async () => {
      const request = { params: { slug: 'Cruella de Vil' } }

      stubbedFindOne.returns(singleVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'Cruella de Vil' }
      })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 when no villain is found', async () => {
      const request = { params: { slug: 'not-found' } }

      stubbedFindOne.returns(null)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'not-found' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the villain by slug', async () => {
      const request = { params: { slug: 'throw-error' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'throw-error' }
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('unable to retrieve villain, please try again')
    })
  })
  describe('saveNewVillain', () => {
    it('accepts new villain details and saves them as a new villain, returning the saved record with a 201 status', async () => {
      const request = { body: postedVillain }

      stubbedCreate.returns(postedVillain)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(postedVillain)
    })
    it('returns a 400 status when not all required fields are provided (missing movie)', async () => {
      const { name, slug } = postedVillain
      const request = { body: { name, slug } }

      await saveNewVillain(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })
    it('returns a 500 when an error occurs saving the new villain', async () => {
      const request = { body: postedVillain }

      stubbedCreate.throws('ERROR!')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('unable to save villain, please try again')
    })
  })
})
