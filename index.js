import { config } from 'dotenv';
import express from 'express'
import path from 'path'
import cors from 'cors';
const app = express()
const port = 3001
import { executeUserCrudOperations } from './src/ClusterConnection.js';


app.use(cors({
  origin: 'http://localhost:3001', // o la URL de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // permitir cookies de sesión
}));
config();

const name = await executeUserCrudOperations();

console.log("ME LLEGA EL SIGUIENTE NOMBRE", name[0].name);

const __dirname = path.resolve();
const buildPath = path.join(__dirname, 'client/dist')

// app.get('/api/get-name', (req, res) => {
//   res.json({ name: name[0] });
// });
app.get('/api/get-name', (req, res) => {
  res.json({ name: name[0].name });
});

app.use(express.static(buildPath))

app.get('/', (req, res) => {
  res.send('Hello, World!' + name);
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
