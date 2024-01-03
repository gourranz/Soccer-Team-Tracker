// routes/team.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const User = require('../models/user');

router.get('/dashboard', teamController.renderDashboard);
router.get('/', teamController.getAllTeams);
router.get('/add', teamController.renderAddTeamForm);
router.post('/', teamController.addTeam);
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().populate('favoriteTeams addedPlayers');
    res.render('users', { title: 'Users', users });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

module.exports = router;