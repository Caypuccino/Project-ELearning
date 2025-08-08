import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const userService = require('../services/user-service');

// mendapatkan list users
exports.index = async (req: Request, res: Response) => {
  try {
    const userData = await userService.getUsers();

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

exports.findById =  async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data user!',
      data: user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

exports.findByEmail =  async (req: Request, res: Response) => {
  const { email } = req.params;
  
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data user!',
      data: user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// create user
exports.create = async (req: Request, res: Response) => {
  const input = req.body;
  const files: any = req.files;
  input.files = files;

  try {
    const newUser = await userService.createUser(input);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil menambahkan user baru!',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update user
exports.update = async (req: AuthenticatedRequest, res: Response) => {
  // cek apakah role = student
  // alur proses utama untuk update khusus endpoint. mahastudent

  const userId = req.user.id;
  const input = req.body;
  const files: any = req.files;
  input.files = files;
  
  try {
    // cek apakah user ada
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }
    
    // update data user
    const updatedUser = await userService.updateUserById(user, input);

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
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // hapus user
    const deletedUser = await userService.deleteUserById(user);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil menghapus data user!',
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
