
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './model/log.model';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async createLog(logData: Partial<Log>) {
    const newLog = new this.logModel(logData);
    await newLog.save();
  }
}
