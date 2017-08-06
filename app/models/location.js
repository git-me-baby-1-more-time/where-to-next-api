'use strict'

const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  activities: [{
    type: String
  }],
  landmarks: [{
    type: String
  }],
  food: [{
    type: String
  }],
  comments: [{
    type: String
  }],
  visited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
  }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
