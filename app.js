const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
const cors = require('cors');
const store = require('store');

require('dotenv').config();

app.use(cors());

app.get('/:country/:city', async function(req, res) {
  let data = {};
  const dt = store.get('dt');
  if (dt && Math.floor((Date.now() - dt) / 60000) < 10) {
    const dataStore = store.get('data');
    data = dataStore ? dataStore : data;
  } else {
    const resp = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&appid=${process.env.API_KEY}&units=metric`
    );
    data = await resp.data;
    store.set('data', data);
  }
  store.set('dt', Date.now());
  res.send(data);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
