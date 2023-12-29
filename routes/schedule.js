const express = require('express');
const router = express.Router();
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://sportsop-soccer-sports-open-data-v1.p.rapidapi.com/v1/leagues/%7Bleague_slug%7D/seasons/%7Bseason_slug%7D/rounds',
    headers: {
      'X-RapidAPI-Key': 'c248959cdfmsh9d134ec89afe96dp1a2eaejsnfff0f46dab53',
      'X-RapidAPI-Host': 'sportsop-soccer-sports-open-data-v1.p.rapidapi.com'
    }
  };

router.get('/', async (req, res, next) => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;