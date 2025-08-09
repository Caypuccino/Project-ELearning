const Model = require('../config/database/orm');

// export interface Content{
//   code: string;    
//   title: string;   
//   source: string;
// }

export class Course extends Model {
  static softDelete = true;
  static tableName = 'courses';

  id!: number;
  title!: string;
  slug!: string;
  description!: string;
  image!: string;
  // contents?: Content[] = [];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}