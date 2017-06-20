import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
    choreId: { type: ObjectId, ref: models.chore.name, required: true },
    userId: { type: ObjectId, ref: models.user.name, required: true },
    householdId: { type: ObjectId, ref: models.household.name, required: true },
    completedOn: { type: Number, default: Date.now() },
    pointsRewarded: { type: Number, default: 1 }
});

module.exports = mongoose.model(models.completedChore.name, schema);