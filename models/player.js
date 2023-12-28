const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  // Add other fields as needed
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;