import { Box, Typography, FormControl, TextField, FormControlLabel, Checkbox, Link, Button } from '@mui/material'
import { Logo } from '../components/Logo'
// import { StyledInput } from '../components/StyledInput'



export function LoginPage() {

  return (
    <Box sx={{ backgroundColor: 'rgb(231, 239, 246)'}}>
      <Box sx={{}}>
        <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center', justifyContent: 'center'}}>    
          <Logo />
          <Typography variant="h3" component="h1" gutterBottom>
            Iniciar sesión
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Bienvenido a la web de PreventAI
          </Typography>
          <FormControl defaultValue="" required>
            <Typography 
              variant="h6" 
              component="h2"
            >
                Correo electrónico
            </Typography>
            <TextField 
              id="email"
              variant="filled"
              // onChange={e => setEmail(e.target.value)}
              required
              color="secondary"
              type="email"
              // value={email}
              // error={emailError}
              placeholder="email@example.com"
              margin="dense"
              sx={{mb:2, width:'400px'}}
            />
            <Typography 
              variant="h6" 
              component="h2" 
            >
              Contraseña
            </Typography>
            <TextField
              // onChange={e => setPassword(e.target.value)}
              required
              variant="filled"
              color="secondary"
              type="password"
              // value={password}
              // error={passwordError}
              placeholder="********"
              margin="dense"
              sx={{mb:2, width:'400px'}}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Recuérdame"
              value="Recuérdame"
              labelPlacement="end"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
              <Link component="button" variant="body2" to="/forgot-password">
                ¿Has olvidado la contraseña?
              </Link>
              <Button color='info' variant="contained" type="submit">
                Login
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )}
