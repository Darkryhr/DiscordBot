const axios = require('axios');

const headers = {
  headers: {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
  },
};

// makes call to dad jokes api
exports.generateJoke = async () => {
  const res = await axios.get(
    'https://dad-jokes.p.rapidapi.com/random/joke',
    headers
  );
  return res.data;
};
