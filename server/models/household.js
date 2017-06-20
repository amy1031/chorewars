import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
	finished: { type: Boolean, default: false },
	choreLog: { type: Array },
	//choreLog is the chores that have been completed by all the users on a certain household
  created: { type: Number, default: Date.now() },
	startDate: { type: Number },
	endDate: {type: Number},
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  // Relations
	completedChores: [{ type: ObjectId, ref: models.completedChore.name}],
	choresList: {type: Array},
	//choresList is the chores that are added to the household when it is created
	members: [{ type: ObjectId, ref: models.user.name}],
	prize: { type: Object},
	leaderboard: {type: ObjectId, ref: models.leaderboard.creatorId }
});

module.exports = mongoose.model(models.household.name, schema);