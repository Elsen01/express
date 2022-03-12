const startupDebugger = require('debug')('app: startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const exprees = require('express');
const debug = require('debug');
const app = exprees();



app.set('view engine', 'pug');
app.set('views', './views');


app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use(exprees.static('public'));
app.use(helmet());
app.use('/api/courses/', courses);
app.use('/', home);


console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}
app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...` ));