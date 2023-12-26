const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

// Home route
router.get('/', teamController.renderDashboard);

// Team routes
router.get('/teams', teamController.getAllTeams);
router.post('/teams', teamController.addTeam);

// Other routes
router.get('/dashboard', teamController.renderDashboard);
router.get('/teams', teamController.renderTeams);
router.get('/players', teamController.renderPlayers);
router.get('/schedule', teamController.renderSchedule);
router.get('/statistics', teamController.renderStatistics);
router.get('/login', teamController.renderLogin);

module.exports = router;