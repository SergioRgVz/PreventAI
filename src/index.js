import * as dotenv from 'dotenv'
import express from 'express'
import path, { normalize } from 'path'
import cors from 'cors';
import { executeUserCrudOperations } from './ClusterConnection.js';

const app = express()

dotenv.config()
//sincronizar con el frontend
app.use(cors({
  origin: 'http://localhost:${port}', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // permitir cookies de sesión
}));


const __dirname = path.resolve();
const buildPath = path.join(__dirname, 'client/dist')

const port = process.env.PORT;

const name = await executeUserCrudOperations();

app.get('/api/get-name', (req, res) => {
  res.json({ name: name[0].name });
});

app.use(express.static(buildPath))

app.get('/', (req, res) => {
  res.send('Hello, World!' + name);
  console.log(name);
});

app.get('/test', (req, res) => {
  res.send('Hello, World! test');
});

app.get('*', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.get('/api', (req, res) => {
  res.sendFile(buildPath + '/index.html')
})


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(` app listening on port ${port}`);
  });
}
