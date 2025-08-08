import { Course } from '../models/course-model';

const courseRepository = require('../repositories/course-repository');
const filesystem = require('../utilities/filesystem');

// dapatkan semua kursus
exports.getAllCourses = async (): Promise<Course[]> => {
  return await courseRepository.getAllCourses();
};

// dapatkan kursus dari slug
exports.getCourseBySlug = async (slug: string) => {
  const courses = await courseRepository.getCourseBySlug(slug);

  // cek 'falsy'
  if (!courses || courses.length === 0) {
    return null;
  }

  return courses;
};

// menambahkan kursus baru
exports.addCourse = async (data: Partial<Course>) => {
  const image = data.files.filter((file: any) => file.fieldname === 'image');

  const imagePath = await filesystem.upload(image[0], 'courses');
  data.image = imagePath;
  delete data.files;

  return await courseRepository.addCourse(data);
};

// mengubah kursus
exports.updateCourse = async (existingCourse: Course, data: Partial<Course>) => {
  if (data.files && data.files.length > 0) {
    const image = data.files.filter((file: any) => file.fieldname === 'image');
  
    const imagePath = await filesystem.update(existingCourse.image, image[0], 'courses');
    data.image = imagePath;
  }
  
  delete data.files;

  return await courseRepository.updateCourse(existingCourse.slug, data);
};

// menghapus kursus
exports.deleteCourse = async (existingCourse: Course) => {
  await filesystem.remove(existingCourse.image);

  return await courseRepository.deleteCourse(existingCourse.slug);
}
// import { Course, Content, CourseData } from '../models/course-model';
// const courseRepository = require('../repositories/course-repository');

// // dapatkan semua kursus
// exports.getAllCourses = async () => {
//     return await courseRepository.getAllCourses();
// };

// exports.getCourseBySlug = async (slug: string) => {
//     const courses = await courseRepository.getCourseBySlug(slug);

//     //cek falsy
//     if(!courses || courses.length === 0){
//         return null;
//     }

//     return courses;
// };

// exports.addCourses = async (data: Partial<CourseData>) => {
//     return await courseRepository.addCourses(data);
// };

// exports.updateCourse = async (slug: string, data: Partial<CourseData>) => {
//     return await courseRepository.updateCourse(slug, data);
// };

// exports.deleteCourse = async (slug: string) => {
//     return await courseRepository.deleteCourse(slug);
// };

// //tugas
// exports.getAllContents = async (slug: string) => {
//     const contents = await courseRepository.getAllContents(slug);
  
//     if (contents.length === 0) {
//         console.warn(`Course ${slug} ditemukan tapi Contents kosong`);
//     }
  
//     return contents;
// };

// exports.getContentByCode = async (slug: string, code: string) => {
//     const content = await courseRepository.getContentByCode(slug, code);
//     if (!content) throw new Error("Materi dengan kode tersebut tidak ditemukan");
//     return content;
// };

// exports.addContent = async (slug: string, data: Content) => {
//     const existing = await Course.findOne({ 
//         slug, 
//         "contents.code": data.code.toUpperCase() 
//     });
    
//     if (existing) {
//         throw new Error("Kode materi sudah digunakan di course ini");
//     }
  
//     return await courseRepository.addContent(slug, {
//     ...data,
//     code: data.code.toUpperCase()
//   });
// };

// exports.updateContent = async (slug: string, code: string, data: Partial<Content>) => {
//     return await courseRepository.updateContent(slug, code, data);
// };

// exports. deleteContent = async (slug: string, code: string) => {
//     return await courseRepository.deleteContent(slug, code);
// };
