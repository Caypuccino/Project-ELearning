const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
const userController = require('../controllers/user-controller');

// GET /api/users
router.get('/', userController.index);

// // GET /api/users/students
// router.get(
//   '/',
//   // '/students',
//   // // onlyRole('students'),
//   // authenticationMiddleware,
//   // // onlyStudentMiddleware,
//   userController.index,
// );

// POST /api/users
router.post('/', userController.create);

// GET /api/users/:id
router.get('/:id', userController.findById);

// GET /api/users/email/:email
router.get('/email/:email', userController.findByEmail);

// PATCH /api/users
router.patch('/:id', 
  authenticationMiddleware, 
  userController.update);

// DELETE /api/users/:id -> hanya boleh oleh ADMIN
router.delete(
  '/:id',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.deleteById,
);

module.exports = router;
