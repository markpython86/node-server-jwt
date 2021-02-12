import React, { useState, useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import AuthService from "../services/auth.service";

function Login(props) {
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
        changeEmail(event.target.value);
        // toggleDisabled();
        break;
      case 'password':
        changePassword(event.target.value);
        // toggleDisabled();
        break;
      case 'username':
        changeUsername(event.target.value);
        // toggleDisabled();
        break;
      default:
        break;
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log('event', event)
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
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box">
                <div className="field">
                  <label htmlFor="username" className="label">Username</label>
                  <div className="control has-icons-left">
                    <input type="username" value={username} name="username"
                      onChange={handleChange}
                      placeholder="e.g. darkLord98" className="input"
                      required />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">Email</label>
                  <div className="control has-icons-left">
                    <input type="email" value={email} name="email"
                      onChange={handleChange}
                      placeholder="e.g. bob@gmail.com" className="input"
                      required />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">Password</label>
                  <div className="control has-icons-left">
                    <input type="password" value={password} name="password"
                      onChange={handleChange} placeholder="*******"
                      className="input" required />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" onClick={handleSubmit} className="button is-success">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default Login;