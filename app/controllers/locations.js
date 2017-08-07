'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Location = models.location

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Location.find({_owner: req.user})
    .then(locations => res.json({
      locations: locations.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  if (req.user._id.toString() === req.location._owner.toString()) {
    res.json({
      location: req.location.toJSON({ virtuals: true, user: req.user })
    })
  } else {
    res.sendStatus(404)
  }
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

const addActivity = (req, res, next) => {
  // console.log('addActivity')
  // console.log('req.location: ', req.location)
  // console.log('req.body: ', req.body)
  // console.log('req.user: ', req.user)
  if (req.user._id.toString() === req.location._owner.toString()) {
    req.location.activities.push(req.body.activity.name)
    // console.log('Updated activities: ', req.location.activities)
    // console.log('attempting update')
    req.location.update(req.location)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(404)
  }
}

const removeActivity = (req, res, next) => {
  // console.log('removeActivity')
  // console.log('req.location: ', req.location)
  // console.log('req.body: ', req.body)
  const index = req.location.activities.indexOf(req.body.activity.name)
  // console.log('Index: ', index)
  if (index > -1 && req.user._id.toString() === req.location._owner.toString()) {
    req.location.activities.splice(index, 1)
    // console.log('Updated activities: ', req.location.activities)
    // console.log('attempting update')
    req.location.update(req.location)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    // console.log('Not found 404!')
    res.sendStatus(404)
    // console.log('Response sent!')
    // next()
    // console.log('Nexted!')
  }
}

const addLandmark = (req, res, next) => {
  if (req.user._id.toString() === req.location._owner.toString()) {
    req.location.landmarks.push(req.body.landmark.name)
    req.location.update(req.location)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(404)
  }
}

const removeLandmark = (req, res, next) => {
  const index = req.location.landmarks.indexOf(req.body.landmark.name)
  if (index > -1 && req.user._id.toString() === req.location._owner.toString()) {
    req.location.landmarks.splice(index, 1)
    req.location.update(req.location)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(404)
    // next()
  }
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  addActivity,
  removeActivity,
  addLandmark,
  removeLandmark
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate },
  { method: setModel(Location), only: ['show'] },
  { method: setModel(Location, { forUser: true }), only: ['update', 'destroy', 'addActivity', 'removeActivity', 'addLandmark', 'removeLandmark'] }
] })
