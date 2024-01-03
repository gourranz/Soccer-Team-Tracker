const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
   
    const teamName = req.query.teamName || 'defaultTeamName';

    const options = {
      method: 'GET',
      url: `https://heisenbug-seriea-live-scores-v1.p.rapidapi.com/api/serie-a/team`,
      params: { name: teamName },
      headers: {
        'X-RapidAPI-Key': '84d39c9008msh5350ee9223db3b8p178ad6jsnc94cd4ee6b3f',
        'X-RapidAPI-Host': 'heisenbug-seriea-live-scores-v1.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const teamData = response.data;

    if (!teamData) {
      console.log('Team details not available.');
      return res.render('error', { error: 'Team details not available.' });
    }

    console.log('Rendering team details:', teamData);
    res.render('schedule', { title: 'Team Details', team: teamData });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.route('/schedule/:teamName')
  .get(async (req, res, next) => {
    try {
      const teamName = req.params.teamName;

      // Rest of the code remains the same
      // ...
    } catch (error) {
      console.error(error);
      res.render('error', { error });
    }
  })
  .post(async (req, res, next) => {
    try {
      const teamName = req.body.teamName;

      // Rest of the code remains the same
      // ...
    } catch (error) {
      console.error(error);
      res.render('error', { error });
    }
  });

module.exports = router;