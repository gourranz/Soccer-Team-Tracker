//Controllers/team.js

const Team = require('../models/team');
const User = require('../models/user');

const teamController = {
  renderDashboard: (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
  },

  getAllTeams: async (req, res) => {
    try {
      const teamList = await Team.find().populate('addedBy');
      res.render('teams', { title: 'Teams', teamList });
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderAddTeamForm: (req, res) => {
    res.render('add-team', { title: 'Add Team' });
  },

  addTeam: async (req, res) => {
    try {
      const { teamName, country, coach } = req.body;
      const newTeam = new Team({ teamName, country, coach });
      await newTeam.save();
      res.redirect('/teams');
    } catch (error) {
      console.error('Error adding team:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  deleteTeam: async (req, res) => {
    try {
    const teamId  = req.params.id;

    // Use findOneAndDelete to find and delete the player
    const team = await Team.findOneAndDelete({ _id: teamId });

    if (!team) {
      return res.status(404).render('error', { error: 'Team not found' });
    }
    // Remove player ID from the user's addedPlayers array
    await User.findByIdAndUpdate(team.user, { $pull: { addedTeams: team._id } });

    // Redirect to players page
    res.redirect('/teams');
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).render('error', { error });
  }
},
  
};

module.exports = teamController;