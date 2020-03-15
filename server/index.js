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

app.get('/:country/:city', (req, res) => {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&appid=${process.env.API_KEY}&units=metric`
    )
    .then(resp => res.send(resp.data))
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
