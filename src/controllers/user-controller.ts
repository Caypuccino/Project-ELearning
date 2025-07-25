import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const userService = require('../services/user-service');

// mendapatkan list users
exports.index = async (req: Request, res: Response) => {
  try {
    const userData = userService.getUsers();

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data user kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: userData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update user
exports.update = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const input = req.body;

  try {
    // cek apakah user ada
    const user = userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // update data user
    const updatedUser = userService.updateUserById(userId, input);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data user!',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus user berdasarkan id nya
exports.deleteById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.params.id;

  try {
    // cek apakah user ada
    const user = userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // hapus user
    const deletedUser = userService.deleteUserById(userId);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus user!',
      data: deletedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

exports.listUsers = async (req: Request, res: Response) => {
  try {
    const userData = userService.getUsers();

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data user kosong!',
      });
    }

    const filteredUsers =  userData.map((user :  any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      tanggalLahir: user.tanggalLahir,
      sudahLulus: user.sudahLulus,
      skorKeseluruhan: user.skorKeseluruhan
    }));

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: filteredUsers,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

exports.adminUpdate = async (req: Request, res: Response) => {
  const { id } =  req.params;
  const input = req.body;
  const requiredFields: string[] = ['sudahLulus', 'skorKeseluruhan'];

  try {
    // cek apakah semua required fields ada di input
    if (!requiredFields.every(prop => prop in input)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Input harus lengkap!',
      });
    }

    const updateData = {
      sudahLulus: input.sudahLulus,
      skorKeseluruhan: input.skorKeseluruhan
    };

    const updatedUser = userService.updateUserById(Number(id), updateData);

    if (!updatedUser) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil login!',
      data: { 
        id: updatedUser.id,
        name: updatedUser.name,
        sudahLulus: updatedUser.sudahLulus,
        skorKeseluruhan: updatedUser.skorKeseluruhan
       },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

exports.currentUser =  async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const userData =  userService.findUserById(userId);

    if(!userData){
      return res.status(404).json({
        statusCode: 404, 
        message: 'User tidak ditemukan!',
      });
    }

    const filteredData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      tanggalLahir: userData.tanggalLahir,
      sudahLulus: userData.sudahLulus,
      skorKeseluruhan: userData.skorKeseluruhan
    };

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan data user!',
      data: filteredData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};