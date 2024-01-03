//routes/players.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');
const User = require('../models/user');

router.get('/dashboard', playerController.renderDashboard);
router.get('/', playerController.renderPlayers);
router.get('/add', playerController.renderAddPlayerForm);
router.post('/', playerController.addPlayer);
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

