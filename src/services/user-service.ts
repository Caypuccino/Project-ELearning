import { UserData } from '../models/user-model';
const userData = require('../data/users');

exports.getUsers = (): UserData  => {
  const data: UserData = userData;
  return data || [];
};

// menambahkan user ke basis data
exports.addUser = (data: UserData) => {
  //kode untuk menambah data
  
  return data;
}
