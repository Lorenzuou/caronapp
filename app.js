const expres = require('express');
const bodyParser = require('body-parser');



const passport = require('passport');
const session = require('express-session');

const app = expres();
const port = process.env.PORT || 3000;
const routes = require('./api/routes/routes');

const loginRouter = require('./api/configs/login');



// app.use('/login', loginRouter);
// app.use('/users', authenticationMiddleware, usersRouter);
// app.use('/', authenticationMiddleware,  indexRouter);


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


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});






var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "lorenzo",
  password: "senha"
});




con.connect(function(err) {
  if (err) throw err;
  else console.log("Conectado ao banco de dados!");
});






app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});











function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}






