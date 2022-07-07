const expres = require('express');
const bodyParser = require('body-parser');


const app = expres();
const port = process.env.PORT || 3000;
const routes = require('./api/routes/routes');

//autenticação
require('./api/configs/auth')(passport);
app.use(session({  
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('./api/configs/login', loginRouter);


console.log("Server running on port " + port);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', routes);



app.get('/', (req, res) => {
  res.json({'message': 'Api server is running'});
})





var mysql = require('mysql2');






app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});











function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}






