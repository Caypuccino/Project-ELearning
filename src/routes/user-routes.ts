const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
const userController = require('../controllers/user-controller');

// GET /api/users (dikomenin karena nabrak sama yg get users only admin)
// router.get('/', userController.index);

// GET /api/users/students -> ngeliat data sendiri
router.get(
  '/students',
  authenticationMiddleware,
  onlyStudentMiddleware,
  userController.currentUser,
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

// PATCH /users/:id -> hanya admin
router.patch('/:id',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.adminUpdate,
);

// GET /users -> hanya admin
router.get('/',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.listUsers,
);

module.exports = router;
