import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, default: "New Board"},
  totalPoints: { type: Number, default: 0 },
	winner: { type: ObjectId, ref: models.user.name },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  // Relations
	householdId: { type: ObjectId, ref: models.household.name, required: true},
	members: [{ type: ObjectId, ref: models.user.name, required: true}]
});

module.exports = mongoose.model(models.leaderboard.name, schema);