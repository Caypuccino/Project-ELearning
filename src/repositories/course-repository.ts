// import model
import { Course, Content, CourseData} from '../models/course-model';

// definisikan operasi database
exports.getAllCourses = async () => {
    return await Course.find();   
};

exports.getCourseBySlug = async (slug: string) => {
    return await Course.find({ slug });   
};

exports.addCourses = async (data: Partial<CourseData>) => {
    return await Course.create(data);
};

exports.updateCourse = async (slug: string, data: Partial<CourseData>) => {
    return await Course.updateOne({ slug }, data);
};

exports.deleteCourse = async (slug: string) => {
    return await Course.deleteOne({ slug });
};

//tugas

exports.getAllContents = async (slug: string) => {
    const course = await Course.findOne({ slug }).select('Contents').lean();
    return course?.Contents.filter(content => content.title && content.url) || [];
};

exports.getContentByCode = async (slug: string, code: string) => {
    const course = await Course.findOne({ 
        slug, 'Contents.code': code.toUpperCase() 
    },
        {'Contents.$': 1} 
    );
    return course?.Contents[0];; 
};

exports.addContent = async (slug: string, data: Content) => {
    data.code = data.code.toUpperCase();
    return await Course.findOneAndUpdate(
        { slug },
        { $push: { Contents: data } },
        { new: true, select: 'Contents' }
    );
};

exports.updateContent = async (slug: string, code: string, data: Partial<Content>) => {
    if (data.code) data.code = data.code.toUpperCase();
    return await Course.findOneAndUpdate(
        { slug, 'Contents.code': code },
        { $set: { 'Contents.$': data } },
        { new: true } 
    );
};

exports. deleteContent = async (slug: string, code: string) => {
    return await Course.findOneAndUpdate(
        { slug },
        { $pull: { Contents: { code: code.toUpperCase() } } },
        { new: true }
    );
};