import React, { useState, useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import AuthService from "../services/auth.service";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        My Login Auth
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Login(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState('mark11@mark.com');
  const [password, changePassword] = useState('QWE12eqwe123');
  const [username, changeUsername] = useState('mark11');
  // const [isDisabled, changeDisabled] = useState(true);
  const { setJwt } = useContext(MainContext);
  const history = useHistory();

  // function toggleDisabled() {
  //   if (email !== '' && password !== '') {
  //     changeDisabled(false);
  //   } else {
  //     changeDisabled(false);
  //   }
  // }

  function handleChange(event) {
    switch (event.target.name) {
      case 'email':
        console.log('event.target.value', event.target.value)
        changeEmail(event.target.value);
        // toggleDisabled();
        break;
      case 'password':
        console.log('event.target.value', event.target.value)
        changePassword(event.target.value);
        // toggleDisabled();
        break;
      case 'username':
        console.log('event.target.value', event.target.value)
        changeUsername(event.target.value);
        // toggleDisabled();
        break;
      default:
        break;
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      username,
      password,
      email
    }
    console.log('user', user)
    AuthService.login({
      username: username,
      email: email,
      password: password
    }).then(
      (e) => {
        console.log('authed', e)
        localStorage.setItem('token', e.token)
        setJwt(e.token)
        history.push('/home');
      },
      error => {
        console.log('not Authed!', error)
      })
  }
  // useEffect(() => {

  // }, [])


  return (
    <>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
      </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              // defaultValue={email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="username"
              // defaultValue={username}
              value={username}
              onChange={handleChange}
              type="username"
              id="username"
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handleChange}
              // defaultValue={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
        </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
            </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )

}

export default Login;