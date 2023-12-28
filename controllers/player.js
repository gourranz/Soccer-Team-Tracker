//controllers/player.js
const Player = require('../models/player');
const Team = require('../models/team')

const playerController = {
        renderDashboard: (req, res) => {
          res.render('dashboard', { title: 'Dashboard' });
        },
        getAllPlayers: async (req, res) => {
            try {
              const playerList = await Player.find().populate('team'); // Update to use Player model
              res.render('players', { title: 'Players', playerList });
            } catch (error) {
              console.error('Error fetching players:', error);
              res.status(500).render('error', { error }); // Render an error page
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
      const teamList = await Team.find();
      res.render('add-player', { title: 'Add Player', teamList });
    } catch (error) {
      console.error('Error fetching teams for player form:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  addPlayer: async (req, res) => {
    try {
      const { playerName, position, team } = req.body;
      console.log('Received data:', { playerName, position, team });
      const newPlayer = new Player({ playerName, position, team });
      console.log('New Player:', newPlayer);
      await newPlayer.save();
      console.log('Player saved successfully');
      res.redirect('/players');
    } catch (error) {
      console.error('Error adding player:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = playerController;

