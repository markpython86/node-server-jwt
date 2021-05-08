import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../contexts/MainContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AuthService from '../services/auth.service';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Dash = () => {
  const classes = useStyles();
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedJwt, updateParsedJwt] = useState('')
  const history = useHistory();

  const logout = () => {
    AuthService.logout()
    setJwt('')
    return history.push('/');
  }
  useEffect(() => {
    try {
      return updateParsedJwt(JSON.parse(atob(jwt.split('.')[1])))
    } catch (err) {
      return history.push('/')
    }
  }, [jwt, history]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h1>Dash</h1>
          <br />
          <pre>{JSON.stringify(parsedJwt, null, 2)}</pre>
        </div>
        <Button
          onClick={() => logout()}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Logout
        </Button>
      </Container>

    </div>
  )
}

export default Dash
