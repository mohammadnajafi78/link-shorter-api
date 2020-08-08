import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ads } from '../../models/ads.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads) private readonly adsModel: ReturnModelType<typeof Ads>) {
  }

  async create(ads: Ads): Promise<{ ads: Ads }> {
    try {
      const newAds = new this.adsModel(ads);
      await newAds.save();
      return { ads: newAds };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(skip: number, limit: number): Promise<{ ads: Ads[], count: number }> {
    try {
      const ads = await this.adsModel.find().skip(Number(skip)).limit(Number(limit));
      const count = await this.adsModel.countDocuments();
      return { ads,count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: Ads): Promise<{ ads: Ads }> {
    try {
      const ads = await this.adsModel.findByIdAndUpdate(id, data, { new: true });
      return { ads };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ ads: Ads }> {
    try {
      const ads = await this.adsModel.findByIdAndRemove(id);
      return { ads };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
