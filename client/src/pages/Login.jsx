import { Box, Typography, FormControl, TextField, FormControlLabel, Checkbox, Link, Button } from '@mui/material'
import { Logo } from '../components/Logo'
import Paper from '@mui/material/Paper';
import Image from '/logo_bg.jpg'
// import { StyledInput } from '../components/StyledInput'


export function LoginPage() {

  return (
    <Box sx={{ 
      backgroundImage: `url(${Image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{width:'100%', maxWidth: '700px', backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      borderRadius: '15px', p: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', 
      alignItems:'center', justifyContent: 'center'}}>    
        <Logo />
        <Typography variant="h3" component="h1" gutterBottom sx={{mt: 2}}>
          Iniciar sesión
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Bienvenido a la web de PreventAI
        </Typography>
        <FormControl defaultValue="" required>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{mt:3}}
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
            sx={{mb:6, width:'500px'}}
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
            sx={{mb:2, width:'500px'}}
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
  )}
