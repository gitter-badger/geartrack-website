const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const hbs = require('hbs');

const index = require('./routes/index')
const api = require('./routes/api')

const app = express()

/*
|--------------------------------------------------------------------------
| App configuration
|--------------------------------------------------------------------------
*/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.locals.app_name = 'Geartrack'

hbs.registerPartials(__dirname + '/views/partials');

/*
|--------------------------------------------------------------------------
| App middlewares
|--------------------------------------------------------------------------
*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

/*
|--------------------------------------------------------------------------
| App Routes
|--------------------------------------------------------------------------
*/
app.use('/', index)
app.use('/api', api)

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

/*
|--------------------------------------------------------------------------
| Error handle
|--------------------------------------------------------------------------
*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
