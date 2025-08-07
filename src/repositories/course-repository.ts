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
    const courseData = {
        ...data, contents: data.contents || []
    };
    return await Course.create(courseData);
};

exports.updateCourse = async (slug: string, data: Partial<CourseData>) => {
    return await Course.updateOne({ slug }, data);
};

exports.deleteCourse = async (slug: string) => {
    return await Course.deleteOne({ slug });
};

//tugas

exports.getAllContents = async (slug: string) => {
    const course = await Course.findOne({ slug }).select('contents').lean();
    return course?.contents.filter(content => content.title && content.url) || [];
};

exports.getContentByCode = async (slug: string, code: string) => {
    const course = await Course.findOne({ 
        slug, 'contents.code': code.toUpperCase() 
    },
        {'contents.$': 1} 
    );
    return course?.contents[0];; 
};

exports.addContent = async (slug: string, data: Content) => {
    data.code = data.code.toUpperCase();
    return await Course.findOneAndUpdate(
        { slug },
        { $push: { contents: data } },
        { new: true, select: 'contents' }
    );
};

exports.updateContent = async (slug: string, code: string, data: Partial<Content>) => {
    if (data.code) data.code = data.code.toUpperCase();
    return await Course.findOneAndUpdate(
        { slug, 'contents.code': code },
        { $set: { 'contents.$': data } },
        { new: true } 
    );
};

exports. deleteContent = async (slug: string, code: string) => {
    return await Course.findOneAndUpdate(
        { slug },
        { $pull: { contents: { code: code.toUpperCase() } } },
        { new: true }
    );
};