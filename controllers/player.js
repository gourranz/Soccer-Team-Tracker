// controllers/player.js
const Player = require('../models/player');

const playerController = {
  renderDashboard: (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
  },

  getAllPlayers: async (req, res) => {
    try {
      const playerList = await Player.find().populate('team addedBy');
      console.log('Player List:', playerList);
      res.render('players', { title: 'Players', playerList });
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).render('error', { error });
    }
  },
  renderPlayers: async (req, res) => {
    try {
      const playerList = await Player.find().populate('team');
      res.render('players', { title: 'Players', playerList });
    } catch (error) {
      console.error('Error rendering players:', error);
      res.status(500).render('error', { error, message: 'Internal Server Error' });
    }
  },

  renderAddPlayerForm: async (req, res) => {
    try {
      res.render('add-player', { title: 'Add Player' });
    } catch (error) {
      console.error('Error rendering player form:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  addPlayer: async (req, res) => {
    try {
      const { playerName, position, team } = req.body;
      
      // Extract user details
      const { _id: userId, name: userName, avatar: userAvatar } = req.user;
  
      // Set user details to request body
      req.body.user = userId;
      req.body.userName = userName;
      req.body.userAvatar = userAvatar;
  
      // Create new player with addedBy field
      const newPlayer = new Player({
        playerName,
        position,
        team,
        addedBy: {
          id: userId,
          name: userName,
          avatar: userAvatar
        }
      });
  
      console.log('New Player:', newPlayer);
  
      // Save the new player
      await newPlayer.save();
      console.log('Player saved successfully');
  
      // Redirect to players page
      return res.redirect('/players');
    } catch (error) {
      console.error('Error adding player:', error);
      return res.status(500).render('error', { error });
    }
  },
};

module.exports = playerController;

