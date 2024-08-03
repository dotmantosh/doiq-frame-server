import { Doiq, DoiqDocument } from '../models/doiq.schema';
import { User, UserDocument } from '../models/user.schema';


class DoiqService {

  static async create(user: UserDocument, body: DoiqDocument): Promise<DoiqDocument> {

    try {
      const doiq = await Doiq.create({ userId: user._id, userFid: user.fid, doiqValue: body.doiqValue, doiqAnswer: body.doiqAnswer })
      user.doiqs.push(doiq._id)
      user.save()
      // console.log(user)
      // console.log(doiq)
      return doiq
    } catch (error) {
      console.log(error)
      throw new Error(`Error while creating doiq: ${error}`);
    }
  }


  static async fetchDoiqFid(fid: string): Promise<DoiqDocument> {
    try {
      const doiq = await Doiq.findOne({ userFid: fid });
      return doiq as DoiqDocument
    } catch (error) {
      throw new Error(`Error while fetching doiq: ${error}`);
    }
  }

  static async fetchDoiqCountAll(): Promise<number> {
    try {
      return await Doiq.countDocuments()
    } catch (error) {
      throw new Error(`Error while fetching doiq: ${error}`);
    }
  }

}

export default DoiqService;