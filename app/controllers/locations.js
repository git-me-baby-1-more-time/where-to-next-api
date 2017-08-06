'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Location = models.location

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Location.find()
    .then(locations => res.json({
      locations: locations.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    location: req.location.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const location = Object.assign(req.body.location, {
    _owner: req.user._id
  })
  Location.create(location)
    .then(location =>
      res.status(201)
        .json({
          location: location.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.location.update(req.body.location)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.location.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Location), only: ['show'] },
  { method: setModel(Location, { forUser: true }), only: ['update', 'destroy'] }
] })
