import { Hono } from 'hono'
import { AuthRoute } from './api';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.route('/auth', AuthRoute);

export default app
