import React, { useEffect, useContext, useState } from 'react';
import { MainContext } from '../contexts/MainContext';


const Dash = () => {
  const { jwt } = useContext(MainContext);
  const [parsedJwt, updateParsedJwt] = useState('')
  useEffect(() => {
    try {
      updateParsedJwt(JSON.parse(atob(jwt.split('.')[1])))
    } catch (err) {
      updateParsedJwt('Not a valid JWT found')
    }
  }, [jwt]);

  return (
    <div>
      <h1>Dash</h1>
      <br />
      <pre>{JSON.stringify(parsedJwt, null, 2)}</pre>
    </div>
  )
}

export default Dash
