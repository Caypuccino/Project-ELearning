import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const courseService = require('../services/course-service');

// mendapatkan list kursus
exports.index = async(req: Request, res: Response) => {
  try {
    const courses = await courseService.getAllCourses();

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data kursus!',
      data: courses,
    });
    
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// mendapatkan kursus berdasarkan slug
exports.show = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const course = await courseService.getCourseBySlug(slug);

    if(!course){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Kursus tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data kursus!',
      data: course,
    });
    
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// menambahkan kursus
exports.create = async(req: Request, res: Response) => {
  const data = req.body;
  
  try {
    const newCourse = await courseService.addCourses(data);
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil menambahkan kursus baru!',
      data: newCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// menambahkan kursus
exports.update = async(req: Request, res: Response) => {
  const { slug } = req.params;
  const data = req.body;
  
  try {
    const existingCourse = await courseService.getCourseBySlug(slug);
    if(!existingCourse){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Kursus tidak ditemukan',
      });
    }
    
    const updatedCourse = await courseService.updateCourse(slug, data);
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil meengubah data kursus!',
      data: updatedCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// menambahkan kursus
exports.delete = async(req: Request, res: Response) => {
  const { slug } = req.params;
  
  try {
    const existingCourse = await courseService.getCourseBySlug(slug);
    if(!existingCourse){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Kursus tidak ditemukan',
      });
    }
    
    const deletedCourse = await courseService.deleteCourse(slug);
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil menghapus kursus!',
      data: deletedCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

//tugas
exports.showContents = async(req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const contents = await courseService.getAllContents(slug);
    
    if (contents.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: 'Course ditemukan tapi belum ada materi',
        data: []
      });
    }
    
    res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data materi!',
      data: contents
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

exports.showContentByCode = async(req: Request, res: Response) => {
  const { slug, code } = req.params;
  
  try {
    const Content = await courseService.getContentByCode(slug, code);
    
    if(!Content){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Materi tidak ditemukan',
      });
    }
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data Materi!',
      data: Content,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
  
};

exports.createContent = async(req: Request, res: Response) => {
  const { slug } = req.params;
  const { code, title, url} = req.body;
  
  if (!title?.trim() || !url?.trim()) {
    return res.status(400).json({
      statusCode: 400,
      message: "code, title, dan url harus diisi"
    });
  }

  try {
    const newContent = await courseService.addContent(slug, {code, title, url});
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil menambahkan materi baru!',
      data: newContent,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
  
};

exports.updateContent = async(req: Request, res: Response) => {
  const { slug, code } = req.params;
  const data = req.body;
  
  try {
    const existingContent = await courseService.getContentByCode(slug, code);
    if(!existingContent){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Materi tidak ditemukan',
      });
    }
    
    const updatedContent = await courseService.updateContent(slug, code, data);
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mengubah data materi!',
      data: updatedContent,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
  
};

exports.deleteContent = async(req: Request, res: Response) => {
  const { slug, code } = req.params;

  try {
    const existingContent = await courseService.getCourseBySlug(slug, code);
    if(!existingContent){
      return res.status(404).json({
        statusCode: 404, 
        message: 'Kursus tidak ditemukan',
      });
    }
    
    const deletedContent = await courseService.deleteContent(slug, code);
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil menghapus kursus!',
      data: deletedContent,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
  
};


// // mendapatkan list kursus yang diikuti pengguna
// exports.enrolledCourses = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const enrolledCourses = courseService.getEnrolledCourse();

//     if (!enrolledCourses || enrolledCourses.length === 0) {
//       return res.status(404).json({
//         statusCode: 404,
//         message: 'Data kursus yang diikuti kosong!',
//       });
//     }

//     return res.status(200).json({
//       statusCode: 200,
//       message: 'Sukses mendapatkan kursus yang diikuti!',
//       data: enrolledCourses,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({
//       statusCode: 500,
//       message: 'Error internal server!',
//     });
//   }
// };
