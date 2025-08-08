const router = require('express').Router();

// const authenticationMiddleware = require('../middlewares/authentication-middleware');
const courseController = require('../controllers/course-controller');

// // GET /api/courses/enrolled
// router.get(
//   '/enrolled',
//   authenticationMiddleware,
//   courseController.enrolledCourses,
// );

// GET /api/courses
router.get('/', courseController.index);

// GET /api/courses/{slug}
router.get('/:slug', courseController.show);

// POST /api/courses
router.post('/', courseController.create);

// PATCH /api/courses/{slug}
router.patch('/:slug', courseController.update);

// DELETE /api/courses/{slug}
router.delete('/:slug', courseController.destroy);

// tugas
// GET all Contents (/api/courses/{slug}/Content)
router.get('/:slug/content', courseController.showContents);

// GET Content by Code (/api/courses/{slug}/Content)
router.get('/:slug/content/:code', courseController.showContentByCode);

// POST Content (/api/courses/{slug}/Content)
router.post('/:slug/content', courseController.createContent);

// PATCH Content (/api/courses/{slug}/Content/{Code})
router.patch('/:slug/content/:code', courseController.updateContent);

// DELETE Content (/api/courses/{slug}/Content/{Code})
router.delete('/:slug/content/:code', courseController.deleteContent);

module.exports = router;
