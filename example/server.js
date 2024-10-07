const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { join } = require('path');
const { healthcheck } = require('../dist');

healthcheck(app);

app.get('/', (req, res) => {
  var translation = req.t("test");
  res.json({ translation });
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})