import { Doiq } from '../models/doiq.schema';
import { User, UserDocument } from '../models/user.schema';

class UserService {

  static async createUser(body: UserDocument): Promise<UserDocument> {

    try {
      const user = new User(body)
      const doiq = await Doiq.create({ userId: user._id, userFid: user.fid, doiqValue: body.doiqValue, doiqAnswer: body.doiqAnswer })
      user.doiqs.push(doiq._id)
      user.save()
      // console.log(user)
      // console.log(doiq)
      return user
    } catch (error) {
      console.log(error)
      throw new Error(`Error while creating User: ${error}`);
    }
  }

  static async findAll(): Promise<UserDocument[]> {
    try {
      const users = await User.aggregate([
        {
          $lookup: {
            from: 'doiqs',
            localField: '_id',
            foreignField: 'userId',
            as: 'doiqs'
          }
        },
        {
          $addFields: {
            doiqCount: { $size: "$doiqs" },
            doiqCorrectAnswerCount: {
              $size: {
                $filter: {
                  input: "$doiqs",
                  as: "doiq",
                  cond: { $eq: ["$$doiq.doiqValue", "$$doiq.doiqAnswer"] }
                }
              }
            }
          }
        },
        {
          $sort: { doiqCorrectAnswerCount: -1 }
        },
        // Limit the number of results if necessary to avoid large payloads
        // { $limit: 100 }
      ]).exec(); // Ensure the aggregation executes
      return users as UserDocument[];
    } catch (error) {
      throw new Error(`Error while retrieving users: ${error}`);
    }
  }

  static async fetchUserByFid(fid: string): Promise<UserDocument> {
    try {
      const user = await User.findOne({ fid });
      return user as UserDocument
    } catch (error) {
      throw new Error(`Error while fetching user: ${error}`);
    }
  }

  static async fetchUserById(body: UserDocument): Promise<UserDocument> {
    const { _id } = body
    try {
      return await User.findOne({ _id }) as UserDocument;
    } catch (error) {
      throw new Error(`Error while fetching user: ${error}`);
    }
  }

  static async findByFidAndUpdate(fid: string, body: UserDocument): Promise<UserDocument> {
    const { doiqValue, doiqAnswer } = body
    try {
      const user = await User.findOne({ fid });

      if (!user) {
        throw new Error("User not found")
      }

      const doiq = await Doiq.create({ doiqValue, doiqAnswer, userId: user._id, userFid: user.fid });
      user.doiqs.push(doiq._id);
      await user.save();

      const updatedUser = await User.findById(user._id);
      if (!updatedUser) {
        throw new Error("Updated user not found");
      }

      return updatedUser;
      // return use
    } catch (error) {
      throw new Error(`Error while updating user: ${error}`);
    }
  }

}

export default UserService;