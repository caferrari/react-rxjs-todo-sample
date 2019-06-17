import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import { router } from './router';

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use('/', router);

const server = app.listen(3000, () => {
  console.log('server started');
});

process.on('SIGTERM', async () => {
  server.close(() => {
    process.exit(0);
  });
})