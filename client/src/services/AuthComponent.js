import React, { useContext, useEffect } from "react";
import { MainContext } from '../contexts/MainContext.js'
import { useHistory } from "react-router-dom";

function AuthComponent(props) {
  const { jwt } = useContext(MainContext);
  const history = useHistory();
  useEffect(() => {
    console.log(`jwt`, jwt)
    if (jwt === '' || !jwt) {
      return history.push('/')
    }
  }, []);

  return (
    <div>
      {props.children}
    </div>
  )
}

export default AuthComponent