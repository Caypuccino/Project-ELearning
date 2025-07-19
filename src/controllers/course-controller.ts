import { Request, Response } from "express";

const courseService = require('../services/course-service');

exports.index = async (req: Request, res: Response) => {
    try {
        const courseData = courseService.getCourses();

        if(!courseData || courseData.length === 0){
            return res.status(404).json({
                statusCode: 404,
                pesan: 'Data course tidak ditemukan.',
            });
        }
        
        return res.status(200).json({
            statusCode: 200,
            pesan: 'Sukses mendapatkan course!',
            data: courseData,    
        });
    } catch (error: any){
        return res.status(500).json({ 
            statusCode: 500,
            pesan: 'Internal server error.' });
    }
};

//menambah course
exports.store =  async (req: Request, res: Response) => {
    try {
        const courseData = req.body;

        const addcourse =  courseService.addcourse(courseData);

        if(!addcourse || addcourse.length === 0){
            return res.status(404).json({
                statusCode: 404,
                pesan: 'Data course tidak ditemukan.',
            });
        }
        
        return res.status(200).json({
            pesan: 'Berhasil menambahkan data.',
            data: courseData,    
        });
    } catch (error: any) {
        return res.status(500).json({  
            statusCode: 500,
            pesan: 'Internal server error.' });
    }
};