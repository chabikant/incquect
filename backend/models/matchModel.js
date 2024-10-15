// models/matchModel.js
const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  runs: { type: Number, required: true },
  ballNumber: { type: Number, required: true },
});

const overSchema = new mongoose.Schema({
  overNumber: { type: Number, required: true },
  balls: [ballSchema], // Array of balls with run details
});

const matchSchema = new mongoose.Schema({
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: [overSchema], // List of overs
  currentBall: { type: Number, default: 0 },
  currentOver: { type: Number, default: 0 },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
