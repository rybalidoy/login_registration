const express = require('express');
const StudentController = require('./controller/StudentController.js');
const session = require('express-session');
const Profiler = require('./middleware/profiler.js');

const router = express.Router();
const profiler = new Profiler;

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    cookie: { maxAge: 60000 }
}));

/** Load Profiler */
router.use(profiler.enable);

router.get('/',StudentController.index);
router.post('/login',StudentController.login);
router.post('/register',StudentController.register);
router.get('/students/profile',StudentController.profile);

module.exports = router;