import bodyParser from 'body-parser';
import express from 'express';

import { handler } from '.';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('*', (req, res) => {
  res.setHeader('content-type', 'application/json;charset=UTF-8');
  console.log(req.body);
  handler(req.body, {}, (err, body) => {
    res.send(body);
  });
});

app.get('*', (req, res) => {
  res.setHeader('content-type', 'application/json;charset=UTF-8');
  res.send({});
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Example app listening on port 3000!');
});
