const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
    // You can provide a default value or handle the case when teamName is not available
    const teamName = req.query.teamName || 'defaultTeamName';

    const options = {
      method: 'GET',
      url: `https://heisenbug-seriea-live-scores-v1.p.rapidapi.com/api/serie-a/team`,
      params: { name: teamName },
      headers: {
        'X-RapidAPI-Key': 'c248959cdfmsh9d134ec89afe96dp1a2eaejsnfff0f46dab53',
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