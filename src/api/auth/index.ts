import { Hono } from 'hono'
import { EmailRoute } from './email';

const app = new Hono()

app.route('/', EmailRoute);

export const AuthRoute = app;

