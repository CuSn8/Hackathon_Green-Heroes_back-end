const router = require('express').Router();
const usersRouter = require('./user.routes');
const animalsRouter = require('./animal.routes');
const actionsRouter = require('./actions.routes');
const scrapingRouter = require('./scraping.routes');



router.use('/users', usersRouter);
router.use ('/animals', animalsRouter);
router.use ('/actions', actionsRouter);
router.use ('/news', scrapingRouter);


module.exports = router;