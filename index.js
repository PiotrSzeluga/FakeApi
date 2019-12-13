const settings = require('./app.config');
const express = require('express');
const app = express();
const usrRoutes = require('./routes/users.routes');



//app.get('/', function(req,res){res.send(users.addAccount({id:123425,account:{ballLANS:'ZZZZZZZZ'}}))})

app.use(express.json());
app.use("/users", usrRoutes );




// jeśli żadna ściezka nie pasuje to odpowiadamy 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// jeśli nasz serwer zwróci błąd odpowiadamy 500
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(8080, function (){
  console.log(`Listening`);
});