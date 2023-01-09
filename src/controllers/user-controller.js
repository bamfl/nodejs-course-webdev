import UserModel from "../models/user-model.js";
import chalk from 'chalk';

const handleError = (res, error) => {
  console.log(chalk.whiteBright.bgRed(error));
  res.status(500).send(error);
};

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserModel.find();

      res.status(200).send({ message: "success", users });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);

      res.status(200).send({ message: "success", user });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );

      res.status(200).send({ message: "updated", user: updatedUser });
    } catch (error) {
      handleError(res, error);
    }
  }

  async addUser(req, res) {
    try {
      const createdUser = await UserModel.create(req.body);
      res.status(201).send({ message: "added", user: createdUser });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserModel.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(200).send({ message: "deleted", user: deletedUser });
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new UserController();
