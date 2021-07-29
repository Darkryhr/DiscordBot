const axios = require('axios');
const config = require('./config.json');

const headers = {
  headers: {
    'x-rapidapi-key': config.RAPID_API_KEY,
    'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
  },
};

exports.generateJoke = async () => {
  const res = await axios.get(
    'https://dad-jokes.p.rapidapi.com/random/joke',
    headers
  );
  return res.data;
};
