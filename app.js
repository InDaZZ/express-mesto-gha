const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '648316d141b3ce582fbf027e',
  };

  next();
});

app.use('/', router);

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});