const app = require('./app');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`🌎  ==> API Server now listening on PORT http://localhost:${PORT}`);
  /* eslint-enable no-console */
});
