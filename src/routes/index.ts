import { Request, Response } from "express";
const router = require('express').Router();

// Handle semua route /users ke router user
router.use('/users', require('./user-routes'));

// Handle semua route /users ke router user
router.use('/courses', require('./course-routes'));

router.use('/', (req: Request, res: Response) => {
    res.status(200).json({ pesan : 'ini dari API' });
});

module.exports = router;
