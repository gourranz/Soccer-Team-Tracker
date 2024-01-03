//models/player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  id: String,
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});
  

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

