import { Request, Response, NextFunction, response } from "express";
import UserService from "../services/user.service";
// import { EducationDocument } from "../models/education.schema";
import { UserDocument } from "../models/user.schema";
import { Doiq } from "../models/doiq.schema";
import DoiqService from "../services/doiq.service";


class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {

      // console.log(req.body)
      const user = await UserService.createUser(req.body);
      res.json(user);
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }

  static async fetchAll(req: Request, res: Response, next: NextFunction) {
    try {

      const leaderboard = await UserService.findAll();
      const allDoiqCounts = await DoiqService.fetchDoiqCountAll()
      res.json({ allDoiqCounts, leaderboard });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }

  static async fetchUserByFid(req: Request, res: Response, next: NextFunction) {
    try {
      const { fid } = req.params
      // console.log(fid)
      const userInfo = await UserService.fetchUserByFid(fid);
      if (!userInfo) {

        return res.status(404).json({ message: "user not found" })
      }
      res.json(userInfo);
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { fid } = req.params
      const userInfo = await UserService.findByFidAndUpdate(fid, req.body);
      res.json(userInfo);
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }

}

export default UserController;