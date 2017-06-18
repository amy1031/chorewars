import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 1, required: true },
  completedBy: { type: ObjectId, ref: models.user.email },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name},
  householdId: { type: String, default: "" }
});

module.exports = mongoose.model(models.chore.name, schema);