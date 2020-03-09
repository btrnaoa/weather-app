const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

app.use(cors());

app.get('/:country/:city', async function(req, res) {
  const resp = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&appid=${process.env.API_KEY}&units=metric`
  );
  const data = await resp.data;
  res.send(data);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
