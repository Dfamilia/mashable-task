const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const menuItems = require('./routers/menuItems');
const subMenuItems = require('./routers/subMenuItems');

const app = express();

// MIDDLEWARES//
app.use(express.json()); //body.json
app.use(cors()); //allows react make request with cross-side, This is CORS-enabled for all origins
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/menu-items', menuItems);
app.use('/sub-menu-items', subMenuItems);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(9000, () => console.log('app run on port 9000'));
