import { CourseData } from "models/course-model";
const courseData =  require('../data/courses');

exports.getCourses = (): CourseData => {
    const data: CourseData = courseData;
    return data || [];
};

//menambahkan user ke basis data
exports.addCourse = (data: CourseData) => {
    //kode untuk menambah data

    return data;
}