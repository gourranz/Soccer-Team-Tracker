// routes/team.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const User = require('../models/user');

router.get('/dashboard', teamController.renderDashboard);
router.get('/', teamController.getAllTeams);
router.get('/add', teamController.renderAddTeamForm);
router.post('/', teamController.addTeam);
router.post('/delete/:id', teamController.deleteTeam);

module.exports = router;