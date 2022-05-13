const router = require('express').Router();
const usersRouter = require('./user.routes');
const animalsRouter = require('./animal.routes');
const actionsRouter = require('./actions.routes');
const scrapingRouter = require('./scraping.routes');
const myProfileRouter = require('./myprofile.routes');
const cors = require('cors');
const session = require('express-session');



router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        sameSite: "lax",
        secure: false
    }
}));

router.use(function (req, res, next) {
    req.session.test = "test";
    next();
});

router.use('/users', usersRouter);
router.use ('/animals', animalsRouter);
router.use ('/actions', actionsRouter);
router.use ('/news', scrapingRouter);
router.use('/myprofile', myProfileRouter);

module.exports = router;