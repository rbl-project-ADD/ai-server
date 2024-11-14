import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World! from index.js');
});

app.use('/', routes);

app.listen(8000, () => {
  console.log('Server started on port http://localhost:8000');
});
