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

  // if (!data.contents) {
  //   data.contents = [];
  // }

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

//tugas
// exports.getAllContents = async (slug: string) => {
//   return await courseRepository.getAllContents(slug);
// };

// exports.getContentByCode = async (slug: string, code: string) => {
//   const content = await courseRepository.getContentByCode(slug, code);

//   return content || null;
// };

// exports.addContent = async (slug: string, data: Content) => {
//   const existingContent = await courseRepository.getContentByCode(slug, data.code);
    
//   if (existingContent) {
//     console.log("Materi sudah tersedia di course ini");
//     return null;
//   }
  
//   return await courseRepository.addContent(slug, data);
// };

// exports.updateContent = async (slug: string, code: string, data: Partial<Content>) => {
//   return await courseRepository.updateContent(slug, code, data);
// };

// exports. deleteContent = async (slug: string, code: string) => {
//   return await courseRepository.deleteContent(slug, code);
// };
