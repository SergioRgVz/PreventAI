
import { executeUserCrudOperations } from './ClusterConnection.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

let adapter = new JSONFile('db.json')
let db = new Low(adapter, {})

// const jwtSecretKey = "mySecretKey"
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

const name = await executeUserCrudOperations();

app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  const user = db.get('users').value().filter(user => user.email === email);

  if (user.length === 1) {
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (!result) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      } else {
          let loginData = {
            email,
            signInTiemstamp: new Date().getTime(),
          };

          const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: '1h' });
          res.status(200).json({ message: "success", token });
      }
  });

  } else if (user.length === 0) {
      bcrypt.hash(password, 10, function(_err, hash) {
        console.log({ email, password: hash });
        db.get('users').push({ email, password: hash }).write();

        let loginData = {
          email,
          signInTiemstamp: new Date().getTime(),
        };

        const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "success", token });
      });
  }
})

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: "logged in", message: "success" });
    } else {
      //Access denied
      return res.status(401).json({ status: 'invalid auth', message: 'error'});
    }
  } catch (error) {
    //Access denied
    return res.status(401).json({ status: 'invalid auth', message: 'error'});
  }
})

// An endpoint to see if there is an existing account for a given email
app.post('/check-account', (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const user = db.get('users').value().filter(user => user.email === email);
  console.log(user);
  res.status(200).json({
    status: user.length === 1 ? 'User exists' : 'User does not exist', userExists: user.length === 1
  })
});
