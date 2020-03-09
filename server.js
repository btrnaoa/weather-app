const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/:country/:city', (req, res) => {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&appid=${process.env.API_KEY}&units=metric`
    )
    .then(resp => res.send(resp.data))
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));