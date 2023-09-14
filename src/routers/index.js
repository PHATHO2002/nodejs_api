
import homeRouter from './home';
import curdRouter from './crud';
import apiRouter from './api';
let initwebRouters = (app) => {
    app.use('/', homeRouter)
    app.use('/crud', curdRouter)
    app.use('/api', apiRouter)
};

module.exports = initwebRouters;
