const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: './.env.development.local' });

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('/:country?/:city', (req, res) => {
  const { country, city } = req.params;
  let api = `http://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY}&units=metric&q=${city}`;
  axios
    .get(country ? api.concat(',', country) : api)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      const resp = error.response;
      if (resp && resp.data) {
        res.send(resp.data);
      } else {
        console.log(error);
      }
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
