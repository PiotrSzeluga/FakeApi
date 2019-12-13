const settings = require('./app.config');
const express = require('express');
const app = express();
const usrRoutes = require('./routes/users.routes');

// używamy parsera żeby express rozumiał JSONa
app.use(express.json());
app.use("/users", usrRoutes );


// jeśli żadna ściezka nie pasuje to odpowiadamy kodem 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// jeśli nasz serwer zwróci błąd wewnętrzny odpowiadamy kodem 500
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(settings.serverPort, function (){
  console.log(`Express czeka na zapytania ...`);
});