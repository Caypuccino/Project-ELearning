const Model = require('../config/database/orm');

export class Course extends Model {
  static softDelete = true;
  static tableName = 'courses';

  id!: number;
  title!: string;
  slug!: string;
  description!: string;
  image!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
// import mongoose, { Schema, Document } from 'mongoose';

// export interface Content{
//   code: string;
//   title: string;
//   url: string;
// }

// export interface CourseData extends Document {
//   title: string;
//   slug: string;
//   description: string;
//   contents: Content[];
// }

// const CourseSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true },
//     description: { type: String, required: true },
//     contents: {
//       type: [{
//         code: { type: String, required: true, uppercase: true },
//         title: { type: String, required: true },
//         url: { type: String, required: true }
//       }],
//       default: []
//     }
//   }, { timestamps: true }
// );

// CourseSchema.index({ "contents.code": 1 }, { 
//   unique: true, 
//   sparse: true,
//   partialFilterExpression: { "contents.code": { $exists: true } }
// });

// export const Course = mongoose.model<CourseData>('Course', CourseSchema);
