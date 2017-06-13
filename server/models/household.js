import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
	finished: { type: Boolean, default: false },
	choreLog: { type: Array },
  created: { type: Number, default: Date.now() },
	startDate: { type: Number },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  // Relations
	chores: { type: ObjectId, ref: models.chore.name},
	choresList: {type: Array},
	members: { type: Array},
	prize: { type: ObjectId, ref: models.prize.name},
	leaderboard: {type: ObjectId, ref: models.leaderboard.creatorId }
});

module.exports = mongoose.model(models.household.name, schema);