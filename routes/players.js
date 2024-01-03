//routes/players.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');
const User = require('../models/user');

router.get('/dashboard', playerController.renderDashboard);
router.get('/', playerController.renderPlayers);
router.get('/add', playerController.renderAddPlayerForm);
router.post('/', playerController.addPlayer);
router.post('/delete/:id', playerController.deletePlayer);

module.exports = router;

