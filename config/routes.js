'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('locations')

// Special routes for activities
.post('/activities/:id', 'locations#addActivity')
.delete('/activities/:id', 'locations#removeActivity')

// Special routes for landmarks
.post('/landmarks/:id', 'locations#addLandmark')
.delete('/landmarks/:id', 'locations#removeLandmark')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
