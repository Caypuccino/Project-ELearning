import { Course, Content } from '../models/course-model';
// import knex from '../config/database/init';

exports.getAllCourses = async (): Promise<Course[]> => {
  return await Course.query();
};

exports.getCourseBySlug = async (slug: string): Promise<Course> => {
  return await Course.query().findOne({ slug });
};

exports.addCourse = async (data: Partial<Course>): Promise<Course> => {
  return await Course.query().insert(data);
};

exports.updateCourse = async (slug: string, data: Partial<Course>): Promise<Course | undefined> => {
  return await Course.query().patch(data).where('slug', slug).returning('*').first();
};

exports.deleteCourse = async (slug: string): Promise<number> => {
  return await Course.query().delete().where('slug', slug);
};

exports.getAllContents = async (slug: string): Promise<Content[]> => {
  const course = await Course.query().findOne({ slug });
  return course?.contents || [];
};

exports.getContentByCode = async (slug: string, code: string): Promise<Content | undefined> => {
  const course = await Course.query().findOne({ slug })
  return course?.contents?.find((c: Content) => c.code === code); 
};

exports.addContent = async (slug: string, data: Content): Promise<Content[] | undefined> => {
  const course = await Course.query().findOne({ slug });
  if (!course) return undefined;

  const updatedContents = [...(course.contents || []), data];
  const updatedCourse = await Course.query().patch({ contents: updatedContents }).where({ slug })
    .returning('contents').first();

  return updatedCourse?.contents;
};

exports.updateContent = async (slug: string, code: string, data: Partial<Content>): Promise<Content[] | undefined> => {
  const course = await Course.query().findOne({ slug });
  if (!course) return undefined;

  const updatedContents = (course.contents || []).map((item: Content) =>
    item.code === code ? { ...item, ...data } : item
  );

  const updatedCourse = await Course.query().patch({ contents: updatedContents }).where({ slug }).returning('contents').first();

  return updatedCourse?.contents;
};

exports.deleteContent = async (slug: string, code: string): Promise<Content[] | undefined> => {
  const course = await Course.query().findOne({ slug });
  if (!course) return undefined;

  const filteredContents = (course.contents || []).filter((item: Content) => item.code !== code);

  const updatedCourse = await Course.query().patch({ contents: filteredContents }).where({ slug })
    .returning('contents').first();

  return updatedCourse?.contents;
};
