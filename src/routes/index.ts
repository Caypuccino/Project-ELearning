<<<<<<< HEAD
const router = require('express').Router();

// handle semua route /api/auth ke router otentikasi
// router.use('/auth', require('./auth-routes'));

// handle semua route /api/users ke router user
// router.use('/users', require('./user-routes'));

router.use('/courses', require('./course-routes'));

=======
import { Request, Response } from "express";
const router = require('express').Router();

// Handle semua route /users ke router user
router.use('/users', require('./user-routes'));

// Handle semua route /users ke router user
router.use('/courses', require('./course-routes'));

router.use('/', (req: Request, res: Response) => {
    res.status(200).json({ pesan : 'ini dari API' });
});

>>>>>>> ac397e03f4a9300ee5ce23adcfb79a522ac33992
module.exports = router;
