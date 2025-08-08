import { User } from '../models/user-model';
// const storedUsers = require('../data/user-data');

// // cari user berdasarkan id nya
// const findUserById = (id: number): User | undefined => {
//   return storedUsers.find((user: User) => user.id == id);
// };
// exports.findUserById = findUserById;

// // dapatkan semua user
// exports.getUsers = (): User => {
//   const data: User = storedUsers;

//   return data || [];
// };

// // ubah data user
// exports.updateUserById = (
//   id: number,
//   input: User,
// ): User | undefined => {
//   const user = findUserById(id);
//   if (!user) return undefined;

//   Object.assign(user, input);
//   return user;
// };

// // hapus data user berdasarkan id nya
// exports.deleteUserById = (
//   id: number,
// ): User | undefined => {
//   const user = findUserById(id);
//   if (!user) return undefined;

//   const index = storedUsers.indexOf(user);
//   if (index !== -1) {
//     storedUsers.splice(index, 1);
//     return user;
//   }

//   return undefined;

const userRepository = require('../repositories/user-repository');
const filesystem = require('../utilities/filesystem');


// dapatkan semua user
exports.getUsers = async (): Promise<User[]> => {
  return await userRepository.getUsers();
};

// cari user berdasarkan id nya
exports.findUserById = async (id: number) => {
  const users = await userRepository.findUserById(id);

  // cek 'falsy'
  if (!users || users.length === 0) {
    return null;
  }

  return users;
};

exports.findUserByEmail = async (email: string) => {
  const users = await userRepository.findUserByEmail(email);

  // cek 'falsy'
  if (!users || users.length === 0) {
    return null;
  }

  return users;
};

// buat user baru
exports.createUser = async (input: Partial<User>) => {
  const image = input.files.filter((file: any) => file.fieldname === 'image');

  const imagePath = await filesystem.upload(image[0], 'users');
  input.image = imagePath;
  delete input.files;

  return await userRepository.createUser(input);
}

// ubah data user
exports.updateUserById = async (user: User, input: Partial<User>) => {
  if (input.files && input.files.length > 0) {
    const image = input.files.filter((file: any) => file.fieldname === 'image');
  
    const imagePath = await filesystem.update(user.image, image[0], 'users');
    input.image = imagePath;
  }
  
  delete input.files;

  return await userRepository.updateUserById(user.Id, input);
};

// // hapus data user berdasarkan id nya
exports.deleteUserById = async (user: User) => {
  await filesystem.remove(user.image);

  return await userRepository.deleteUserById(user.id);
};
