//Controllers/team.js

const Team = require('../models/team');

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

};

module.exports = teamController;