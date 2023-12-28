//routes/players.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');

router.get('/dashboard', playerController.renderDashboard);
router.get('/', playerController.renderPlayers);
router.get('/add', playerController.renderAddPlayerForm);
router.post('/', playerController.addPlayer);

module.exports = router;

