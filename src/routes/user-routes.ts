const router = require('express').Router();

<<<<<<< HEAD
const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
=======
>>>>>>> ac397e03f4a9300ee5ce23adcfb79a522ac33992
const userController = require('../controllers/user-controller');

// GET /api/users
router.get('/', userController.index);

<<<<<<< HEAD
// GET /api/users/students
router.get(
  '/students',
  // onlyRole('students'),
  authenticationMiddleware,
  // onlyStudentMiddleware,
  userController.index,
);

// PATCH /api/users
router.patch('/', authenticationMiddleware, userController.update);

// DELETE /api/users/:id -> hanya boleh oleh ADMIN
router.delete(
  '/:id',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.deleteById,
);
=======
//POST /api/users
router.post('/', userController.store);
>>>>>>> ac397e03f4a9300ee5ce23adcfb79a522ac33992

module.exports = router;
