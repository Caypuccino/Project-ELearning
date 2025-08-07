import mongoose, { Schema, Document } from 'mongoose';

export interface Content{
  _id?: string;
  code: string;
  title: string;
  url: string;
}

export interface CourseData extends Document {
  title: string;
  slug: string;
  description: string;
  Contents: Content[];
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String, required: true },
    Contents: [{
      code: { type: String, required: true, unique: true, uppercase: true },
    title: { type: String, required: true },
    url: { type: String, required: true }
    }]
  }, { timestamps: true }
);

export const Course = mongoose.model<CourseData>('Course', CourseSchema);
