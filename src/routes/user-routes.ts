const router = require('express').Router();

const userController = require('../controllers/user-controller');

// GET /api/users
router.get('/', userController.index);

//POST /api/users
router.post('/', userController.store);

module.exports = router;
