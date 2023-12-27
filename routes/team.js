// routes/team.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/dashboard', teamController.renderDashboard);
router.get('/', teamController.getAllTeams);
router.get('/add', teamController.renderAddTeamForm);
router.post('/', teamController.addTeam);


// Add other routes as needed

module.exports = router;