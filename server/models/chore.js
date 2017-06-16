import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 1, required: true },
  completedBy: { type: String, default: ""},
  created: { type: Number, default: Date.now() },
<<<<<<< HEAD
  creatorId: {type: ObjectId, ref: models.user.name}
  // householdId: { type: ObjectId, ref: models.household.name}
  // Might need to use this later for when users can create their own chores
=======
  creatorId: {type: ObjectId, ref: models.user.name},
  householdId: { type: String, default: "" }
>>>>>>> cbf3b74efedccc3a7338416eb89114023b11e20d
});

module.exports = mongoose.model(models.chore.name, schema);