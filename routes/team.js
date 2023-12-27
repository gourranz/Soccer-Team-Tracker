// routes/team.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/dashboard', teamController.renderDashboard);
router.get('/teams', teamController.getAllTeams);
router.get('/teams/add', teamController.renderAddTeamForm);
router.post('/teams', teamController.addTeam);


// Add other routes as needed

module.exports = router;