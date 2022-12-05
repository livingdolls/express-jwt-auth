import conn from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const { username, email } = req.body;
    const data = {
      username,
      email,
      password,
    };

    await conn.query(`INSERT INTO user SET ?`, [data]);

    res.status(200).json({
      staus: 200,
      code: "success",
      msg: "Berhasil menambah user",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const getUsername = await conn.query(
      `SELECT * FROM user WHERE username = ?`,
      [username]
    );

    if (getUsername[0].length === 0)
      return next(createError(404, "Username tidak ditemukan"));

    const pass = getUsername[0][0]["password"];
    const isPasswordCorrect = await bcrypt.compare(password, pass);

    if (!isPasswordCorrect) return next(createError(400, "Wrong Password!"));

    const user = getUsername[0][0];
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: 200,
        code: "Success",
        msg: "Success Login",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};
