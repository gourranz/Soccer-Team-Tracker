const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  country: { type: String, required: true },
  coach: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  userAvatar: String
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;