import express from 'express'
import path from 'path'
const app = express()
const port = 3001


// Path: index.js
const __dirname = path.resolve();
const buildPath = path.join(__dirname, 'client/dist')
app.use(express.static(buildPath))

app.get('*', (req, res) => {
  res.sendFile(buildPath + '/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})