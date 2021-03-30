import React, { useState } from 'react';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


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
function Signup(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState('mark11@mark.com');
  const [password, changePassword] = useState('QWE12eqwe123');
  const [username, changeUsername] = useState('mark11');
  const [showAlert, changeShowAlert] = useState(false);
  const [alertText, changeAlertText] = useState('');
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const history = useHistory();

  async function alertToggle(msg) {
    changeAlertText(msg)
    changeShowAlert(true)
    // console.log('showAlert :>> ', showAlert);
    await loading(3000)
    changeShowAlert(false)
    // console.log('showAlert :>> ', showAlert);
  }
  // validation ?
  function handleChange(event) {
    switch (event.target.name) {
      case 'email':
        changeEmail(event.target.value);
        break;
      case 'password':
        changePassword(event.target.value);
        break;
      case 'username':
        changeUsername(event.target.value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      username,
      password,
      email
    }
    console.log('user', user)
    try {
      await AuthService.signup({
        username: username,
        email: email,
        password: password
      })
      // localStorage.setItem('token', response.data.token)
      // setJwt(response.data.token)
      history.push('/');
    } catch (error) {
      alertToggle(error.response.data.error)
    }
  }
  // useEffect(() => {

  // }, [])


  return (
    <>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
            {
              showAlert ?
                <Alert variant="outlined" severity="warning">
                  {alertText}</Alert>
                : null
            }

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
                <Link href="/" variant="body2">
                  {"You have an account? Sign In"}
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

export default Signup;