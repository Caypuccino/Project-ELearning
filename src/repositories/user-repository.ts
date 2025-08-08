import { User } from '../models/user-model';

exports.findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await User.query().findOne({ email: email.toLowerCase() });
};

exports.createUser = async (input: Partial<User>): Promise<User> => {
  return await User.query().insert(input);
};

exports.findUserById = async (id: number): Promise<User> => {
  return await User.query().findOne({ id });
};

// dapatkan semua user
exports.getUsers = async (): Promise<User[]> => {
  return await User.query();
};

// ubah data user
exports.updateUserById = async (id: number, input: Partial<User>,) : Promise<User | undefined> => {
  return await User.query().patch(input).where('id', id).returning('*').first();
};

// hapus data user berdasarkan id nya
exports.deleteUserById = async (id: number): Promise<User> => {
  return await User.query().delete().where('id', id);
};
