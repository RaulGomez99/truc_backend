const router = require('express').Router();

const loginController = require('../controllers/login.controller');

router.post('/register' , loginController.register);
router.post('/login'    , loginController.login);


router.get('/getall', loginController.getall);


module.exports = router;