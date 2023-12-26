const Team = require('../models/team');

const teamList = [];

const teamController = {
  getAllTeams: (req, res) => {
    res.json(teamList);
  },
  addTeam: (req, res) => {
    const { name, country, coach } = req.body;
    const newTeam = new Team(name, country, coach);
    teamList.push(newTeam);
    res.json({ message: 'Team added successfully', team: newTeam });
  },
  renderDashboard: (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
  },
  renderTeams: (req, res) => {
    res.render('teams', { title: 'Teams' });
  },
  renderPlayers: (req, res) => {
    res.render('players', { title: 'Players' });
  },
  renderSchedule: (req, res) => {
    res.render('schedule', { title: 'Schedule' });
  },
  renderStatistics: (req, res) => {
    res.render('statistics', { title: 'Statistics' });
  },
  renderLogin: (req, res) => {
    res.render('login', { title: 'Login' });
  },
};

module.exports = teamController;