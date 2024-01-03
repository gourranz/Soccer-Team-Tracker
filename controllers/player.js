// controllers/player.js
const Player = require('../models/player');
const User = require('../models/user');


const playerController = {
  renderDashboard: (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
  },

  getAllPlayers: async (req, res) => {
    try {
      const playerList = await Player.find({}).populate('user', 'name avatar'); // Populate the 'user' field with 'name' and 'avatar'
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

  
        const newPlayer = new Player({
            playerName,
            position,
            team,
            user: userId,
            userName,
            userAvatar
        });

        console.log('New Player:', newPlayer);

        await newPlayer.save();
        console.log('Player saved successfully');

     
        await User.findByIdAndUpdate(userId, { $push: { addedPlayers: newPlayer._id } });

        // Redirect to players page
        res.redirect('/players');
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).render('error', { error });
    }
},
deletePlayer: async (req, res) => {
  try {
    const playerId = req.params.id;

    // Use findOneAndDelete to find and delete the player
    const deletedPlayer = await Player.findOneAndDelete({ _id: playerId });

    if (!deletedPlayer) {
      // Player not found
      return res.status(404).render('error', { message: 'Player not found' });
    }

    // Remove player ID from the user's addedPlayers array
    await User.findByIdAndUpdate(deletedPlayer.user, { $pull: { addedPlayers: deletedPlayer._id } });

    // Redirect to players page
    res.redirect('/players');
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).render('error', { error });
  }
},
};

module.exports = playerController;

