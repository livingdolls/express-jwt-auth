import conn from "../config/db.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const data = { username, email, password };

    const id = req.params.id;

    await conn.query(`UPDATE user SET ? WHERE id = ?`, [data, id]);

    res.status(200).json({
      status: 200,
      code: "Success",
      msg: "Berhasil menyimpan perubahan user!",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await conn.query(`SELECT * FROM user`);

    res.status(200).json({
      status: 200,
      code: "Success",
      data: user[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await conn.query(`SELECT * FROM user WHERE id = ?`, [id]);

    res.status(200).json({
      status: 200,
      code: "Success",
      data: user[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    await conn.query(`DELETE FROM user WHERE id = ?`, [id]);
    res.status(200).json({
      status: 200,
      code: "Success",
      msg: "Berhasil menghapus data!",
    });
  } catch (error) {
    next(error);
  }
};
